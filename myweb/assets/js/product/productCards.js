// 商品卡片处理脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有商品卡片
    const productCards = document.querySelectorAll('.product-card');
    
    // 为每个商品卡片添加点击事件和链接
    productCards.forEach((card, index) => {
        // 获取商品标题和价格
        const titleElement = card.querySelector('.product-title');
        const priceElement = card.querySelector('.product-price');
        
        if (titleElement && priceElement) {
            const title = titleElement.textContent;
            // 从价格文本中提取数字（去掉¥符号）
            const priceText = priceElement.textContent;
            const price = parseFloat(priceText.replace('¥', ''));
            
            // 根据标题和价格在productsData中查找对应的商品
            const product = productsData.find(p => 
                p.name === title && 
                p.price === price
            );
            
            if (product) {
                // 创建包裹整个卡片的链接元素
                const cardContent = card.innerHTML;
                card.innerHTML = '';
                
                const linkWrapper = document.createElement('a');
                linkWrapper.href = `product.html?id=${product.id}`;
                linkWrapper.className = 'product-link';
                linkWrapper.style.textDecoration = 'none';
                linkWrapper.style.color = 'inherit';
                linkWrapper.style.display = 'block';
                linkWrapper.innerHTML = cardContent;
                
                card.appendChild(linkWrapper);
                
                // 重新获取加入购物车按钮并添加事件
                const addToCartBtn = card.querySelector('.add-to-cart-btn');
                if (addToCartBtn) {
                    // 阻止按钮点击事件冒泡到卡片链接
                    addToCartBtn.addEventListener('click', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        
                        // 添加商品到购物车
                        CartManager.addItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: 1,
                            image: product.image
                        });
                        
                        // 更新购物车数量
                        CartManager.updateCartCount();
                        
                        // 显示添加成功提示
                        alert(`已成功将 ${product.name} 加入购物车！`);
                    });
                }
            }
        }
    });
});
