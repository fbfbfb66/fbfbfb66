// 购物车数据管理
const CartManager = {
    KEY_CART_ITEMS: 'cartItems',

    // 获取购物车数据
    getItems() {
        try {
            const items = localStorage.getItem(this.KEY_CART_ITEMS);
            // 调试获取的数据
            console.log('从localStorage获取的购物车数据:', items);
            return items ? JSON.parse(items) : [];
        } catch (error) {
            console.error('获取购物车数据失败:', error);
            return [];
        }
    },

    // 保存购物车数据
    saveItems(items) {
        try {
            // 调试保存的数据
            console.log('保存到localStorage的购物车数据:', items);
            localStorage.setItem(this.KEY_CART_ITEMS, JSON.stringify(items));
            this.updateCartCount();
            return true;
        } catch (error) {
            console.error('保存购物车数据失败:', error);
            return false;
        }
    },

    // 清空购物车
    clearCart() {
        localStorage.removeItem(this.KEY_CART_ITEMS);
        this.updateCartCount();
        console.log('购物车已清空');
        return true;
    },

    // 添加商品到购物车
    addItem(product) {
        try {
            const items = this.getItems();
            const existingItem = items.find(item => 
                item.name === product.name && 
                item.price === product.price
            );

            if (existingItem) {
                // 如果商品已存在，增加数量
                existingItem.quantity += 1;
                console.log('增加商品数量:', existingItem);
            } else {
                // 如果是新商品，添加到购物车
                const newItem = {
                    id: Date.now().toString(), // 使用字符串类型的ID
                    name: product.name,
                    price: product.price,
                    image: product.image || 'placeholder.jpg',
                    quantity: 1,
                    addedAt: new Date().toISOString()
                };
                console.log('添加新商品:', newItem);
                items.push(newItem);
            }

            return this.saveItems(items) ? items : [];
        } catch (error) {
            console.error('添加商品失败:', error);
            return [];
        }
    },

    // 删除商品
    removeItem(itemId) {
        try {
            console.log('删除商品，ID:', itemId, '类型:', typeof itemId);
            const items = this.getItems();
            console.log('当前购物车商品:', items);
            
            // 确保ID为字符串类型进行比较
            const strId = String(itemId);
            const index = items.findIndex(item => String(item.id) === strId);
            
            console.log('查找到的商品索引:', index);
            
            if (index !== -1) {
                const removedItem = items[index];
                console.log('删除的商品:', removedItem);
                items.splice(index, 1);
                return this.saveItems(items);
            } else {
                console.warn('未找到要删除的商品ID:', strId);
                return false;
            }
        } catch (error) {
            console.error('删除商品失败:', error);
            return false;
        }
    },

    // 更新商品数量
    updateItemQuantity(itemId, quantity) {
        try {
            console.log('更新商品数量，ID:', itemId, '数量:', quantity);
            const items = this.getItems();
            
            // 确保ID为字符串类型进行比较
            const strId = String(itemId);
            const item = items.find(item => String(item.id) === strId);
            
            if (item && quantity > 0) {
                item.quantity = quantity;
                console.log('商品数量已更新:', item);
                return this.saveItems(items);
            } else {
                console.warn('商品数量更新失败，未找到商品或数量无效');
                return false;
            }
        } catch (error) {
            console.error('更新商品数量失败:', error);
            return false;
        }
    },

    // 更新购物车图标的数量显示
    updateCartCount() {
        try {
            const items = this.getItems();
            const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
            console.log('更新购物车数量显示:', totalQuantity);
            
            const cartCountElements = document.querySelectorAll('.cart-count');
            cartCountElements.forEach(element => {
                element.textContent = totalQuantity;
            });
        } catch (error) {
            console.error('更新购物车数量显示失败:', error);
        }
    },

    // 计算商品小计
    calculateItemSubtotal(item) {
        return item.price * item.quantity;
    },

    // 格式化价格显示
    formatPrice(price) {
        return `¥${price.toFixed(2)}`;
    },

    // 获取购物车总计信息
    getCartSummary() {
        try {
            const items = this.getItems();
            const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = items.reduce((sum, item) => sum + this.calculateItemSubtotal(item), 0);
            
            const summary = {
                totalQuantity,
                totalPrice,
                formattedTotalPrice: this.formatPrice(totalPrice)
            };
            
            console.log('购物车汇总信息:', summary);
            return summary;
        } catch (error) {
            console.error('计算购物车总计失败:', error);
            return { totalQuantity: 0, totalPrice: 0, formattedTotalPrice: '¥0.00' };
        }
    }
}; 