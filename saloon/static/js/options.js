let webOpt = {
    service: {
        url: {
            get: '/service/',
            create: '/service/create/',
            update: '/service/update/',
            delete: '/service/delete/'
        },
        head: ["#", "title", "Narxi"],
        title: "Xizmatlar"
    },
    worker: {
        url: {
            get: '/worker/',
            create: '/worker/create/',
            update: '/worker/update/',
            delete: '/worker/delete/'
        },
        head: ["#", "Ism", "Familya", "Vazifasi", "Telefon raqami", "Manzili"],
        title: "Xodimlar"
    },
    unit: {
        url: {
            get: '/unit/',
            create: '/unit/create/',
            update: '/unit/update/',
            delete: '/unit/delete/'
        },
        head: ["#", "title"],
        title: "O'lchov birligi"
    },
    customer: {
        url: {
            get: '/customer/',
            create: '/customer/create/',
            update: '/customer/update/',
            delete: '/customer/delete/'
        },
        head: ["#", "Ismi", "Familyasi", "Telefon raqami", "Tug'ilgan kuni"],
        title: "Mijozlar"
    },
    company: {
        url: {
            get: '/company/',
            create: '/company/create/',
            update: '/company/update/',
            delete: '/company/delete/'
        },
        head: ["#", "title", "narxi"],
        title: "Kompaniya"
    },
    product: {
        url: {
            get: '/product/',
            create: '/product/create/',
            update: '/product/update/',
            delete: '/product/delete/'
        },
        head: ["#", "title", "Narxi", "Umumiy narxi", "O'lchov birligi", "Soni", "Qoldiq", "Kompaniyasi"],
        title: "Tovarlar"
    },
    order: {
        url: {
            get: '/order/',
            create: '/order/create/',
            update: '/order/update/',
            delete: '/order/delete/'
        },
        head: ["#", "Mijozlar", "Kompaniya", "Xizmat", "Xizmat", "Ishchi", "Sana"],
        title: "Tovarlar"
    },
    modal: {
        iconType: 'fas',
        service: {
            idType: 'service',
            data: [
                {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                {type: 'number', placeholder: 'Narxi', id: 'price', icon: 'money-bill-alt'}
            ]
        },
        worker: {
            idType: 'worker',
            data: [
                {type: 'text', placeholder: 'Ismi', id: 'name', icon: 'user'},
                {type: 'text', placeholder: 'Familyasi', id: 'surename', icon: 'user'},
                {
                    type: 'text',
                    get: '/service/',
                    searchBy: 'title',
                    select: true,
                    placeholder: 'Vazifasi',
                    id: 'job',
                    icon: 'briefcase',
                    setTo: 'workerJob'
                },
                {type: 'number', placeholder: 'Telefon Raqami', id: 'phone', icon: 'phone'},
                {type: 'text', placeholder: 'Manzili', id: 'address', icon: 'map'},
            ]
        },
        unit: {
            idType: 'unit',
            data: [
                {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
            ]
        },
        customer: {
            idType: 'customer',
            data: [
                {type: 'text', placeholder: 'Ismi', id: 'name', icon: 'user'},
                {type: 'text', placeholder: 'Familyasi', id: 'surename', icon: 'user'},
                {type: 'number', placeholder: 'Telefon raqami', id: 'phone', icon: 'phone'},
                {type: 'date', placeholder: '', id: 'birthday', icon: 'calendar'},
            ]
        },
        company: {
            idType: 'company',
            data: [
                {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                {type: 'number', placeholder: 'Narxi', id: 'price', icon: 'money-bill-alt'},
            ]
        },
        product: {
            idType: 'product',
            data: [
                {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                {type: 'number', placeholder: 'Narxi', id: 'price', icon: 'briefcase'},
                {type: 'number', placeholder: 'Umumiy Narxi', id: 'all-price', icon: 'briefcase'},
                {
                    type: 'text',
                    get: '/unit/',
                    searchBy: 'title',
                    select: true,
                    placeholder: "O'lchov birligi",
                    id: 'unit',
                    icon: 'briefcase',
                    setTo: 'productUnit'
                },
                {
                    type: 'text',
                    get: '/service/',
                    searchBy: 'title',
                    select: true,
                    placeholder: "Kategoriya",
                    id: 'category',
                    icon: 'briefcase',
                    setTo: 'productCategory',
                },
                {type: 'number', placeholder: 'Soni', id: 'count', icon: 'briefcase'},
                {type: 'number', placeholder: 'Qoldiq', id: 'residue', icon: 'briefcase'},
                {
                    type: 'text',
                    get: '/company/',
                    searchBy: 'title',
                    select: true,
                    placeholder: "Kompaniyasi",
                    id: 'company',
                    icon: 'briefcase',
                    setTo: 'productCompany',
                },
            ]
        },
    },
    dashCards: {
        iconType: 'fas',
        data: [
            {icon: 'users', title: 'Xodimlar', bg: 'main', get: '/worker/'},
            {icon: 'users', title: 'Xizmatlar', bg: 'main-green', get: '/service/'},
            {icon: 'users', title: 'Tovarlar', bg: 'danger', get: '/product/'},
            {icon: 'users', title: 'Mijozlar', bg: 'warning', get: '/customer/'},
        ]
    },
    navbar: [
        {"title": "Dashboard", "href": "#dashboard", "active": true, "icon": "fa-tachometer-alt-slowest"},
        {"title": "Xodimlar", "href": "#workers", "active": false, "icon": "fa-users"},
        {"title": "Xizmatlar", "href": "#services", "active": false, "icon": "fa-people-carry"},
        {"title": "Kompaniyalar", "href": "#companies", "active": false, "icon": "fa-briefcase"},
        {"title": "Tovarlar", "href": "#products", "active": false, "icon": "fa-box-open"},
        {"title": "Mijozlar", "href": "#customers", "active": false, "icon": "fa-user"},
        {"title": "O'lchov birligi", "href": "#unit", "active": false, "icon": "fa-weight-hanging"},
        {"title": "Buyurtmalar", "href": "#order", "active": false, "icon": "fa-tag"},
    ]
}