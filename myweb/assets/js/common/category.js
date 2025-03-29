// 分类过滤功能
document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('.category-link');
    const products = document.querySelectorAll('.product-card');

    // 为每个分类链接添加点击事件
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // 阻止默认的链接行为

            // 移除所有分类的active类
            categoryLinks.forEach(l => l.classList.remove('active'));
            // 为当前点击的分类添加active类
            link.classList.add('active');

            const selectedCategory = link.getAttribute('data-category');

            // 显示或隐藏商品
            products.forEach(product => {
                const productCategory = product.getAttribute('data-category');
                if (selectedCategory === 'all' || selectedCategory === productCategory) {
                    product.style.display = 'block';
                    // 添加淡入动画
                    product.style.opacity = '0';
                    setTimeout(() => {
                        product.style.opacity = '1';
                    }, 10);
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
});
