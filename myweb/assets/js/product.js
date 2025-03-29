document.addEventListener('DOMContentLoaded', function() {
    // 获取URL中的产品ID参数
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log('获取到的商品ID:', productId);
    
    // 更新购物车数量
    if (typeof CartManager !== 'undefined') {
        CartManager.updateCartCount();
    }
    
    // 检查用户是否已登录
    const username = localStorage.getItem('username');
    if (username) {
        // 用户已登录，显示用户信息和头像
        document.getElementById('login-link').style.display = 'none';
        document.getElementById('user-avatar-container').style.display = 'block';
        
        // 更新用户名
        const navUsername = document.getElementById('nav-username');
        if (navUsername) {
            navUsername.textContent = username;
        }
        
        // 更新用户头像
        const navUserAvatar = document.getElementById('nav-user-avatar');
        if (navUserAvatar) {
            const savedAvatar = localStorage.getItem(`${username}_avatar`);
            if (savedAvatar) {
                navUserAvatar.src = savedAvatar;
            }
        }
    }
    
    // 根据ID查找商品
    let product = null;
    
    // 从 productsData 中获取商品数据
    if (typeof productsData !== 'undefined') {
        product = productsData.find(p => p.id === parseInt(productId));
        console.log('从productsData中获取的商品:', product);
    }
    
    // 更新商品详情页面
    if (product) {
        console.log('准备更新商品详情，商品数据:', product);
        updateProductPage(product);
        console.log('商品详情更新完成');
        
        // 初始化收藏功能
        initializeFavoriteButton(product);
    } else {
        console.log('未找到商品，显示未找到信息');
        showProductNotFound();
    }
    
    // 数量控制
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const quantityInput = document.getElementById('product-quantity');
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    }
    
    // 加入购物车按钮
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn && product) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(document.getElementById('product-quantity').value);
            
            if (typeof CartManager !== 'undefined') {
                // 使用正确的方法添加到购物车
                CartManager.addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                });
                
                // 更新购物车数量
                CartManager.updateCartCount();
                
                // 显示添加成功信息
                alert(`已将 ${product.name} x ${quantity} 加入购物车！`);
                console.log('商品已添加到购物车', {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                });
            } else {
                console.error('CartManager未定义，无法添加到购物车');
            }
        });
    }
    
    // 收藏功能初始化
    function initializeFavoriteButton(product) {
        const favoriteBtn = document.getElementById('favorite-btn');
        
        if (!favoriteBtn) return;
        
        // 获取本地存储中的收藏列表
        function getFavorites() {
            const favorites = localStorage.getItem('favorites');
            return favorites ? JSON.parse(favorites) : [];
        }
        
        // 保存收藏列表到本地存储
        function saveFavorites(favorites) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        
        // 检查商品是否已收藏
        function isProductFavorited(productId) {
            const favorites = getFavorites();
            return favorites.some(item => item.id === productId);
        }
        
        // 更新收藏按钮样式
        function updateFavoriteButtonStyle(isFavorited) {
            const favoriteIcon = favoriteBtn.querySelector('.favorite-icon');
            if (isFavorited) {
                favoriteIcon.setAttribute('fill', '#ffc107'); // 黄色
            } else {
                favoriteIcon.setAttribute('fill', 'none');
            }
        }
        
        // 初始化按钮状态
        const isFavorited = isProductFavorited(product.id);
        updateFavoriteButtonStyle(isFavorited);
        
        // 添加点击事件
        favoriteBtn.addEventListener('click', function() {
            // 检查用户是否登录
            const username = localStorage.getItem('username');
            if (!username) {
                // 用户未登录，提示登录
                if (confirm('收藏功能需要登录，是否前往登录页面？')) {
                    window.location.href = 'login.html';
                }
                return;
            }
            
            const favorites = getFavorites();
            const isFavorited = isProductFavorited(product.id);
            
            if (isFavorited) {
                // 取消收藏
                const updatedFavorites = favorites.filter(item => item.id !== product.id);
                saveFavorites(updatedFavorites);
                updateFavoriteButtonStyle(false);
                console.log(`已取消收藏: ${product.name}`);
            } else {
                // 添加收藏
                const favoriteItem = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    description: product.description?.substring(0, 100) + '...' || '暂无描述',
                    addedAt: new Date().toISOString()
                };
                favorites.push(favoriteItem);
                saveFavorites(favorites);
                updateFavoriteButtonStyle(true);
                console.log(`已收藏: ${product.name}`);
            }
        });
    }
    
    // 函数：更新商品详情页
    function updateProductPage(product) {
        console.log('开始更新商品详情页');
        console.log('商品数据:', product);
        
        const titleElement = document.getElementById('product-title');
        const priceElement = document.getElementById('product-price');
        const descriptionElement = document.getElementById('product-description');
        const imageElement = document.getElementById('product-image');
        
        console.log('获取到的DOM元素:', {
            titleElement,
            priceElement,
            descriptionElement,
            imageElement
        });
        
        if (titleElement) titleElement.textContent = product.name;
        if (priceElement) priceElement.textContent = `¥${product.price.toFixed(2)}`;
        if (descriptionElement) descriptionElement.textContent = product.description;
        if (imageElement) {
            console.log('设置图片路径:', product.image);
            
            // 使用完整的图片路径
            imageElement.src = product.image;
            imageElement.alt = product.name;
            
            // 添加图片加载事件监听器
            imageElement.onload = function() {
                console.log('图片加载成功');
            };
            
            imageElement.onerror = function() {
                console.log('图片加载失败');
                imageElement.src = 'assets/images/products/default.jpg';
                if (imageElement.src.includes('default.jpg')) {
                    // 如果默认图片也加载失败，显示错误信息
                    imageElement.style.display = 'none';
                    const container = imageElement.parentElement;
                    if (container) {
                        container.innerHTML = '<div style="width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa; color: #6c757d; font-size: 16px; text-align: center; padding: 20px;">图片加载失败</div>';
                    }
                }
            };
        }
        
        // 使用新的方法加载图片
        const customImageContainer = document.getElementById('custom-image-container');
        if (customImageContainer) {
            // 清空容器
            customImageContainer.innerHTML = '';
            
            // 创建仿亚马逊商品详情布局
            const container = document.createElement('div');
            container.style.cssText = 'position: relative; width: 100%; margin-bottom: 20px;';
            
            // 左侧图片容器
            const imgContainer = document.createElement('div');
            imgContainer.style.cssText = 'width: 450px; height: 450px; position: relative; border: 1px solid #e7e7e7; border-radius: 4px; background-color: #fff;';
            
            // 放大区域 - 显示在中间位置
            const zoomContainer = document.createElement('div');
            zoomContainer.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 600px; border: 1px solid #e7e7e7; border-radius: 4px; overflow: hidden; background-color: #fff; display: none; z-index: 1000; box-shadow: 0 0 10px rgba(0,0,0,0.2);';
            
            // 主图片
            const mainImg = document.createElement('img');
            mainImg.src = product.image;
            mainImg.alt = product.name;
            mainImg.style.cssText = 'width: 100%; height: 100%; object-fit: contain; cursor: crosshair;';
            
            // 选择框（镜头）
            const lens = document.createElement('div');
            lens.style.cssText = 'position: absolute; border: 1px solid #ccc; background-color: rgba(255,255,255,0.3); width: 150px; height: 150px; display: none; pointer-events: none; z-index: 10;';
            
            // 在选择框中添加十字线
            const crossH = document.createElement('div');
            crossH.style.cssText = 'position: absolute; width: 100%; height: 1px; background-color: #ccc; top: 50%; left: 0;';
            lens.appendChild(crossH);
            
            const crossV = document.createElement('div');
            crossV.style.cssText = 'position: absolute; width: 1px; height: 100%; background-color: #ccc; left: 50%; top: 0;';
            lens.appendChild(crossV);
            
            // 放大图片
            const zoomedImg = document.createElement('img');
            zoomedImg.src = product.image;
            zoomedImg.alt = product.name + ' (放大版)';
            zoomedImg.style.cssText = 'position: absolute; top: 0; left: 0; max-width: none; max-height: none;';
            
            // 添加到容器
            imgContainer.appendChild(mainImg);
            imgContainer.appendChild(lens);
            zoomContainer.appendChild(zoomedImg);
            
            // 将两个容器添加到主容器
            container.appendChild(imgContainer);
            container.appendChild(zoomContainer);
            
            // 将整个区域添加到页面
            customImageContainer.appendChild(container);
            
            // 图片加载完成后设置放大功能
            mainImg.onload = function() {
                console.log('图片加载成功');
                
                // 获取图片真实尺寸
                const naturalWidth = mainImg.naturalWidth;
                const naturalHeight = mainImg.naturalHeight;
                
                // 获取容器尺寸
                const containerWidth = imgContainer.offsetWidth;
                const containerHeight = imgContainer.offsetHeight;
                
                // 计算缩放比例
                let imgRatio = 1;
                if (naturalWidth > containerWidth || naturalHeight > containerHeight) {
                    // 如果图片大于容器，计算缩放比例
                    imgRatio = Math.min(containerWidth / naturalWidth, containerHeight / naturalHeight);
                }
                
                // 计算图片在容器中的显示尺寸
                const displayWidth = naturalWidth * imgRatio;
                const displayHeight = naturalHeight * imgRatio;
                
                // 计算图片在容器中的位置
                const imgLeft = (containerWidth - displayWidth) / 2;
                const imgTop = (containerHeight - displayHeight) / 2;
                
                // 计算放大倍率
                const zoomFactor = 2.5;
                
                // 设置放大图片尺寸
                zoomedImg.style.width = (displayWidth * zoomFactor) + 'px';
                zoomedImg.style.height = (displayHeight * zoomFactor) + 'px';
                
                // 鼠标进入显示选择框和放大区域
                imgContainer.addEventListener('mouseenter', function() {
                    lens.style.display = 'block';
                    zoomContainer.style.display = 'block';
                });
                
                // 鼠标离开隐藏选择框和放大区域
                imgContainer.addEventListener('mouseleave', function() {
                    lens.style.display = 'none';
                    zoomContainer.style.display = 'none';
                });
                
                // 鼠标移动时更新选择框位置和放大效果
                imgContainer.addEventListener('mousemove', function(e) {
                    // 显示选择框和放大区域
                    lens.style.display = 'block';
                    zoomContainer.style.display = 'block';
                    
                    // 获取容器位置和尺寸
                    const rect = imgContainer.getBoundingClientRect();
                    
                    // 获取图片在容器中的位置（考虑居中）
                    const imgBounds = mainImg.getBoundingClientRect();
                    const imgOffsetLeft = imgBounds.left - rect.left;
                    const imgOffsetTop = imgBounds.top - rect.top;
                    
                    // 计算鼠标在图片上的位置
                    let mouseX = e.clientX - rect.left - imgOffsetLeft;
                    let mouseY = e.clientY - rect.top - imgOffsetTop;
                    
                    // 计算选择框的位置（居中于鼠标）
                    let lensLeft = mouseX - lens.offsetWidth / 2 + imgOffsetLeft;
                    let lensTop = mouseY - lens.offsetHeight / 2 + imgOffsetTop;
                    
                    // 限制选择框在图片范围内
                    const maxLensLeft = imgOffsetLeft + displayWidth - lens.offsetWidth;
                    const maxLensTop = imgOffsetTop + displayHeight - lens.offsetHeight;
                    lensLeft = Math.max(imgOffsetLeft, Math.min(lensLeft, maxLensLeft));
                    lensTop = Math.max(imgOffsetTop, Math.min(lensTop, maxLensTop));
                    
                    // 设置选择框位置
                    lens.style.left = lensLeft + 'px';
                    lens.style.top = lensTop + 'px';
                    
                    // 计算放大图片位置
                    // 考虑图片在容器中的偏移和缩放比例
                    const lensXRatio = (lensLeft - imgOffsetLeft) / displayWidth;
                    const lensYRatio = (lensTop - imgOffsetTop) / displayHeight;
                    
                    const zoomedImgLeft = -lensXRatio * zoomedImg.offsetWidth;
                    const zoomedImgTop = -lensYRatio * zoomedImg.offsetHeight;
                    
                    // 设置放大图片位置
                    zoomedImg.style.left = zoomedImgLeft + 'px';
                    zoomedImg.style.top = zoomedImgTop + 'px';
                });
                
                // 点击图片显示全屏大图
                imgContainer.addEventListener('click', function() {
                    const modal = document.createElement('div');
                    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 1000; display: flex; justify-content: center; align-items: center;';
                    
                    const modalImg = document.createElement('img');
                    modalImg.src = product.image;
                    modalImg.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain;';
                    
                    const closeBtn = document.createElement('span');
                    closeBtn.innerHTML = '&times;';
                    closeBtn.style.cssText = 'position: absolute; top: 20px; right: 30px; color: white; font-size: 40px; cursor: pointer;';
                    
                    closeBtn.onclick = function() {
                        document.body.removeChild(modal);
                    };
                    
                    modal.onclick = function(e) {
                        if (e.target === modal) {
                            document.body.removeChild(modal);
                        }
                    };
                    
                    modal.appendChild(modalImg);
                    modal.appendChild(closeBtn);
                    document.body.appendChild(modal);
                });
            };
            
            // 图片加载失败处理
            mainImg.onerror = function() {
                console.log('图片加载失败');
                customImageContainer.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa; color: #6c757d; text-align: center; padding: 20px;">图片加载失败</div>';
            };
        }
        
        // 更新特性列表
        const featuresList = document.querySelector('.product-features ul');
        if (featuresList) {
            featuresList.innerHTML = '';
            product.features.forEach(feature => {
                const li = document.createElement('li');
                li.className = 'feature-item';
                li.textContent = feature;
                featuresList.appendChild(li);
            });
        }
        
        // 更新页面标题
        document.title = `${product.name} - Goings商城`;
        console.log('商品详情页更新完成');
    }
    
    // 函数：显示商品未找到信息
    function showProductNotFound() {
        const productDetail = document.querySelector('.product-detail');
        if (productDetail) {
            productDetail.innerHTML = `
                <div class="product-not-found">
                    <h2>商品未找到</h2>
                    <p>抱歉，您查找的商品不存在或已下架。</p>
                    <a href="index.html" class="back-link">返回商城首页</a>
                </div>
            `;
        }
    }
}); 