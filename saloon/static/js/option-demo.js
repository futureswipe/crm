let webOptions = {
    ajax_data: [
        {
            name: 'service',
            url: {
                get: '/service/',
                create: '/service/create/',
                update: '/service/update/',
                delete: '/service/delete/'
            },
            search: 'title',
            path: $('#services'),
            head: ["#", "title", "Narxi"],
            title: "Xizmatlar"
        },
        {
            name: 'workers',
            url: {
                get: '/worker/',
                create: '/worker/create/',
                update: '/worker/update/',
                delete: '/worker/delete/'
            },
            search: 'name',
            path: $('#workers'),
            head: ["#", "Ismi", "Familyasi", "Vazifasi", "Telefon raqami", "Manizli"],
            title: "Xodimlar"
        },
        {
            name: 'unit',
            url: {
                get: '/unit/',
                create: '/unit/create/',
                update: '/unit/update/',
                delete: '/unit/delete/'
            },
            search: 'title',
            path: $('#unit'),
            head: ["#", "title"],
            title: "O'lchov Birligi"
        },
        {
            name: 'customers',
            url: {
                get: '/customer/',
                create: '/customer/create/',
                update: '/customer/update/',
                delete: '/customer/delete/'
            },
            search: 'name',
            path: $('#customers'),
            head: ["#", "Ismi", "Familyasi", "Tug'ilgan kuni", "Telefon raqami"],
            title: "Mijozlar"
        },
    ],
    dashCards: {
        iconType: 'fas',
        data: [
            {icon: 'users', title: 'Xodimlar', bg: 'main', get: '/worker/'},
            {icon: 'people-carry', title: 'Xizmatlar', bg: 'main-green', get: '/service/'},
            {icon: 'shopping-bag', title: 'Tovarlar', bg: 'danger', get: '/product/'},
            {icon: 'user', title: 'Mijozlar', bg: 'warning', get: '/customer/'},
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