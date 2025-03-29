// 当 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 更新购物车数量显示
    CartManager.updateCartCount();
    
    // 检查用户登录状态并显示头像
    initUserAvatar();

    // 获取所有添加到购物车按钮
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // 为每个按钮添加点击事件
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            try {
                // 获取商品信息
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('.product-title').textContent;
                const productPrice = productCard.querySelector('.product-price').textContent;
                const productImage = productCard.querySelector('.product-img')?.src || 'placeholder.jpg';
                
                // 将价格字符串转换为数字（去除 ¥ 符号）
                const price = parseFloat(productPrice.replace('¥', ''));

                if (isNaN(price)) {
                    throw new Error('商品价格格式不正确');
                }

                // 添加到购物车
                CartManager.addItem({
                    name: productName,
                    price: price,
                    image: productImage
                });

                // 添加成功提示
                alert('已将 ' + productName + ' 加入购物车！');
            } catch (error) {
                console.error('添加商品到购物车失败:', error);
                alert('添加商品失败，请重试！');
            }
        });
    });
});

// 初始化用户头像和登录状态显示
function initUserAvatar() {
    const username = localStorage.getItem('username');
    const loginLink = document.getElementById('login-link');
    const userAvatarContainer = document.getElementById('user-avatar-container');
    
    if (username) {
        // 用户已登录，显示头像
        if (loginLink) loginLink.style.display = 'none';
        if (userAvatarContainer) userAvatarContainer.style.display = 'block';
        
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
    } else {
        // 用户未登录，显示登录链接
        if (loginLink) loginLink.style.display = 'inline-block';
        if (userAvatarContainer) userAvatarContainer.style.display = 'none';
    }
} 