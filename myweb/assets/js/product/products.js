// 商品数据
const productsData = [
    {
        id: 1,
        name: "Nike Pegasus 39",
        price: 299.00,
        category: "clothing",
        image: "assets/images/products/Nike Pegasus 39.jpeg",
        description: "这款Nike Air Zoom Pegasus 39运动鞋采用轻量化设计，鞋底具有出色的缓震性能，适合日常穿着和轻度运动。鞋面采用透气网布材质，让您的双脚保持干爽舒适。多种颜色可选，搭配各种休闲装都很合适。",
        features: ["轻量化设计", "透气网布材质", "缓震鞋底", "防滑耐磨"]
    },
    {
        id: 2,
        name: "优衣库AIRism棉质T恤",
        price: 89.00,
        category: "clothing",
        image: "assets/images/products/优衣库AIRism棉质T恤.jpeg",
        description: "这款优衣库AIRism棉质T恤采用100%优质棉料制作，手感柔软，穿着舒适。简洁的设计风格适合各种场合，可以轻松搭配不同风格的裤子和外套。衣物经过防缩水处理，洗涤后不易变形。",
        features: ["100%优质棉料", "防缩水处理", "多色可选", "四季百搭"]
    },
    {
        id: 3,
        name: "iPhone 15 Pro",
        price: 2999.00,
        category: "electronics",
        image: "assets/images/products/Iphone 15 pro max.jpeg",
        description: "这款iPhone 15 Pro配备高清大屏幕和强劲的A17 Pro处理器，运行流畅，多任务处理能力出色。后置三摄像头，可以拍摄高质量的照片和视频。大容量电池支持快充技术，一次充电可以使用整天。",
        features: ["高清大屏幕", "强劲处理器", "三摄像头", "大容量电池", "快充技术"]
    },
    {
        id: 4,
        name: "德国哈瑞宝糖果大礼包",
        price: 99.00,
        category: "food",
        image: "placeholder.jpg",
        description: "这款德国哈瑞宝糖果大礼包包含多种精选进口零食，满足您的味蕾享受。包含小熊软糖、草莓软糖、可乐糖等多种类型，适合与家人朋友分享。所有零食都经过严格的质量检测，保证新鲜美味。",
        features: ["多种零食组合", "精选进口品牌", "适合分享", "独立小包装"]
    },
    {
        id: 5,
        name: "宜家FORSÅ工作灯",
        price: 159.00,
        category: "home",
        image: "placeholder.jpg",
        description: "这款宜家FORSÅ工作灯设计简约现代，采用优质钢材和铝材质，做工精细。灯光柔和不刺眼，可调节亮度和角度，适合卧室、书房等多种场景使用。节能LED光源，使用寿命长，省电环保。",
        features: ["北欧简约风格", "可调节亮度", "LED光源", "环保节能"]
    },
    {
        id: 6,
        name: "薇诺娜舒敏保湿面膜",
        price: 129.00,
        category: "beauty",
        image: "placeholder.jpg",
        description: "这款薇诺娜舒敏保湿面膜富含透明质酸和天然植物精华，能够深层补水，改善肌肤干燥问题。温和不刺激，适合各种肤质使用。每盒含有10片独立包装的面膜，方便携带和使用。",
        features: ["深层补水", "富含透明质酸", "温和不刺激", "独立包装"]
    },
    {
        id: 7,
        name: "宜家KIVIK三人沙发",
        price: 2999.00,
        category: "home",
        image: "placeholder.jpg",
        description: "这款宜家KIVIK三人沙发采用优质实木框架和高弹性海绵，坐感舒适，承重能力强。面料采用耐磨耐脏的亚麻布，易于清洁和保养。简约的设计风格适合现代家居装饰，为您的客厅增添时尚感。",
        features: ["实木框架", "高弹性海绵", "耐磨亚麻布", "简约设计"]
    },
    {
        id: 8,
        name: "宜家HEMNES床头柜",
        price: 499.00,
        category: "home",
        image: "placeholder.jpg",
        description: "这款宜家HEMNES床头柜采用环保实木制作，表面经过防水处理，易于清洁。设计简约现代，带有一个抽屉和一个开放式储物格，满足您的收纳需求。适合放置在床边，方便存放常用物品。",
        features: ["环保板材", "防水表面", "抽屉设计", "开放式储物格"]
    },
    {
        id: 9,
        name: "无印良品PP收纳盒",
        price: 89.00,
        category: "home",
        image: "placeholder.jpg",
        description: "这款无印良品PP收纳盒采用优质PP材质，环保耐用。内部设有多个隔断，可以根据需要调整大小。适合收纳化妆品、文具、首饰等小物品，帮助您整理桌面，保持空间整洁。",
        features: ["优质PP材质", "可调节隔断", "多种用途", "易于清洁"]
    },
    {
        id: 10,
        name: "雅诗兰黛特润修护精华露",
        price: 259.00,
        category: "beauty",
        image: "placeholder.jpg",
        description: "这款雅诗兰黛特润修护精华露富含多种保湿因子和抗氧化成分，能够深层滋润肌肤，改善干纹和细纹。质地轻盈易吸收，不油腻，适合各种肤质使用。每天使用，帮助肌肤保持水润状态。",
        features: ["深层保湿", "抗氧化", "轻盈质地", "适合各种肤质"]
    },
    {
        id: 11,
        name: "安耐晒金瓶防晒霜",
        price: 159.00,
        category: "beauty",
        image: "placeholder.jpg",
        description: "这款安耐晒金瓶防晒霜SPF50+，能够有效阻挡UVA和UVB，预防晒伤和光老化。同时具有隔离和提亮肤色的效果，可以作为底妆使用。防水配方，适合日常和户外活动使用。",
        features: ["SPF50+防晒", "隔离提亮", "防水配方", "温和不刺激"]
    },
    {
        id: 12,
        name: "MAC子弹头口红套装",
        price: 299.00,
        category: "beauty",
        image: "placeholder.jpg",
        description: "这款MAC子弹头口红套装包含5支不同色号的口红，从日常裸色到派对红色，满足您不同场合的需求。采用滋润配方，不易干燥，持久显色。精美包装，也非常适合作为礼物送给亲友。",
        features: ["5色套装", "滋润配方", "持久显色", "精美包装"]
    },
    {
        id: 13,
        name: "Apple Watch Series 9",
        price: 899.00,
        category: "electronics",
        image: "assets/images/products/Apple Watch Series 9.jpeg",
        description: "这款Apple Watch Series 9配备高清彩色触摸屏，支持心率监测、血氧检测和睡眠分析等多种健康功能。内置GPS定位系统，可以准确记录运动轨迹。防水设计，可以在日常生活中随时佩戴。续航能力强，一次充电可使用18小时以上。",
        features: ["高清触摸屏", "心率血氧监测", "GPS定位", "防水设计", "长续航"]
    },
    {
        id: 14,
        name: "雪花秀滋盈生人参套装",
        price: 699.00,
        category: "beauty",
        image: "placeholder.jpg",
        description: "这款雪花秀滋盈生人参套装包含洁面乳、爽肤水、精华液和面霜四件套，采用天然人参提取成分，不含有害化学物质。针对不同肌肤问题提供全面护理，帮助改善肤质，恢复肌肤健康状态。适合各种肤质使用，尤其适合干燥和敏感肌肤。",
        features: ["四件套全面护理", "天然植物成分", "改善肤质", "适合敏感肌肤", "精美礼盒包装"]
    },
    {
        id: 15,
        name: "索尼WH-1000XM5耳机",
        price: 399.00,
        category: "electronics",
        image: "assets/images/products/索尼WH-1000XM5耳机.jpeg",
        description: "这款索尼WH-1000XM5耳机采用最新蓝牙5.2技术，传输稳定，连接迅速。内置高品质喇叭，音质清晰，低音浑厚。主动降噪功能，可以有效隔绝外界噪音。人体工学设计，佩戴舒适不易掉落。充电盒可以提供额外30小时的续航时间。",
        features: ["蓝牙5.2技术", "主动降噪", "高品质音效", "舒适佩戴", "长续航时间"]
    },
    {
        id: 16,
        name: "Coach Tabby单肩包",
        price: 359.00,
        category: "clothing",
        image: "placeholder.jpg",
        description: "这款Coach Tabby单肩包采用优质真皮材质，手感柔软，质感出众。内部空间宽敞，设有多个隔层和口袋，方便物品分类存放。可调节肩带，适合不同身高的人使用。简约现代的设计风格，适合日常通勤和休闲场合使用，是时尚达人的必备单品。",
        features: ["优质真皮", "宽敞多隔层", "可调节肩带", "简约时尚设计", "多色可选"]
    }
];

// 根据ID获取商品信息
function getProductById(productId) {
    return productsData.find(product => product.id === parseInt(productId)) || null;
}

// 根据分类获取商品
function getProductsByCategory(category) {
    return category === 'all' ? 
        productsData : 
        productsData.filter(product => product.category === category);
}
