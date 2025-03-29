// 购物车数量更新脚本
document.addEventListener('DOMContentLoaded', function() {
    try {
        // 确保CartManager已加载
        if (typeof CartManager !== 'undefined') {
            // 更新购物车数量显示
            CartManager.updateCartCount();
            console.log('购物车数量已更新');
        } else {
            console.error('CartManager未定义，无法更新购物车数量');
        }
    } catch (error) {
        console.error('更新购物车数量失败:', error);
    }
});
