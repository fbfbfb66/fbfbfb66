// 渲染购物车商品列表
function renderCartItems() {
    try {
        const items = CartManager.getItems();
        const cartList = document.querySelector('.cart-list');
        const cartEmpty = document.querySelector('.cart-empty');

        // 如果购物车为空
        if (!items || items.length === 0) {
            cartList.style.display = 'none';
            cartEmpty.style.display = 'block';
            return;
        }

        cartList.style.display = 'block';
        cartEmpty.style.display = 'none';

        // 保留表头
        const cartHeader = cartList.querySelector('.cart-header');
        cartList.innerHTML = '';
        cartList.appendChild(cartHeader);

        // 渲染每个商品
        items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.dataset.itemId = item.id; // 添加商品ID到DOM元素
            
            // 确保商品数据完整
            console.log('渲染商品:', item);
            
            cartItem.innerHTML = `
                <div class="col-product">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h3 class="cart-item-title">${item.name}</h3>
                    </div>
                </div>
                <div class="col-price">${CartManager.formatPrice(item.price)}</div>
                <div class="col-quantity">
                    <div class="quantity-control">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
                <div class="col-total">${CartManager.formatPrice(CartManager.calculateItemSubtotal(item))}</div>
                <div class="col-action">
                    <button class="remove-btn">删除</button>
                </div>
            `;

            // 绑定数量控制事件
            const quantityInput = cartItem.querySelector('.quantity-input');
            const minusBtn = cartItem.querySelector('.minus');
            const plusBtn = cartItem.querySelector('.plus');
            const removeBtn = cartItem.querySelector('.remove-btn');

            minusBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    updateQuantity(item.id, item.quantity - 1);
                }
            });

            plusBtn.addEventListener('click', () => {
                updateQuantity(item.id, item.quantity + 1);
            });

            quantityInput.addEventListener('change', () => {
                const value = parseInt(quantityInput.value);
                if (value > 0) {
                    updateQuantity(item.id, value);
                } else {
                    quantityInput.value = item.quantity;
                }
            });

            // 删除按钮点击事件
            removeBtn.addEventListener('click', function() {
                const confirmDelete = window.confirm('确定要删除这个商品吗？');
                if (confirmDelete) {
                    console.log('尝试删除商品ID:', item.id);
                    const success = CartManager.removeItem(item.id);
                    console.log('删除结果:', success);
                    if (success) {
                        renderCartItems();
                        updateCartSummary();
                    } else {
                        alert('删除商品失败，请重试！');
                    }
                }
            });

            cartList.appendChild(cartItem);
        });
    } catch (error) {
        console.error('渲染购物车失败:', error);
        alert('加载购物车数据失败，请刷新页面重试！');
    }
}

// 更新商品数量
function updateQuantity(itemId, newQuantity) {
    try {
        console.log('更新商品数量:', itemId, newQuantity);
        if (CartManager.updateItemQuantity(itemId, newQuantity)) {
            renderCartItems();
            updateCartSummary();
        }
    } catch (error) {
        console.error('更新商品数量失败:', error);
    }
}

// 更新购物车总计
function updateCartSummary() {
    try {
        const summary = CartManager.getCartSummary();
        document.getElementById('total-quantity').textContent = summary.totalQuantity;
        document.getElementById('total-price').textContent = summary.formattedTotalPrice;
    } catch (error) {
        console.error('更新购物车总计失败:', error);
    }
}

// 清空购物车
function clearCart() {
    try {
        if (window.confirm('确定要清空购物车吗？所有商品将被删除。')) {
            if (CartManager.clearCart()) {
                renderCartItems();
                updateCartSummary();
                alert('购物车已清空');
            } else {
                alert('清空购物车失败，请重试！');
            }
        }
    } catch (error) {
        console.error('清空购物车失败:', error);
    }
}

// 初始化购物车页面
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('购物车页面已加载');
        // 首先显示购物车内容
        renderCartItems();
        updateCartSummary();
        // 确保购物车数量显示正确
        CartManager.updateCartCount();

        // 绑定结算按钮事件
        const checkoutBtn = document.querySelector('.checkout-btn');
        checkoutBtn.addEventListener('click', () => {
            const items = CartManager.getItems();
            if (!items || items.length === 0) {
                alert('购物车是空的，请先添加商品！');
                return;
            }
            // 跳转到结算页面
            window.location.href = 'checkout.html';
        });

        // 绑定清空购物车按钮事件
        const clearCartBtn = document.querySelector('.clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', clearCart);
        }
    } catch (error) {
        console.error('初始化购物车页面失败:', error);
    }
}); 