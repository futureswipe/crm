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
    modal: {
        iconType: 'fas',
        ajax_data: [
            {
                name: 'service',
                path: $('#service-modal .card-body'),
                data: [
                    {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                    {type: 'number', placeholder: 'Narxi', id: 'price', icon: 'money-bill-alt'}
                ]
            },
            {
                name: 'worker',
                path: $('#worker-modal .card-body'),
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
            {
                name: 'unit',
                path: $('#unit-modal .card-body'),
                data: [
                    {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                ]
            },
            {
                name: 'customer',
                path: $('#customer-modal .card-body'),
                data: [
                    {type: 'text', placeholder: 'Ismi', id: 'name', icon: 'user'},
                    {type: 'text', placeholder: 'Familyasi', id: 'surename', icon: 'user'},
                    {type: 'number', placeholder: 'Telefon raqami', id: 'phone', icon: 'phone'},
                    {type: 'date', placeholder: '', id: 'birthday', icon: 'calendar'},
                ]
            },
            {
                name: 'company',
                path: $('#company-modal .card-body'),
                data: [
                    {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                    {type: 'number', placeholder: 'Narxi', id: 'price', icon: 'money-bill-alt'},
                ]
            },
            {
                name: 'product',
                path: $('#product-modal .card-body'),
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
            {
                name: 'order',
                path: $('#order-modal .card-body'),
                data:  [
                    {
                        type: 'text',
                        get: '/customer/',
                        searchBy: 'name',
                        select: true,
                        placeholder: "Mijozlar",
                        id: 'customer',
                        icon: 'briefcase',
                        setTo: 'orderCustomer',
                    },
                    {
                        type: 'text',
                        get: '/company/',
                        searchBy: 'title',
                        select: true,
                        placeholder: "Kompaniyalar",
                        id: 'company',
                        icon: 'briefcase',
                        setTo: 'orderCompany',
                    },
                    {
                        type: 'text',
                        get: '/service/',
                        searchBy: 'title',
                        select: true,
                        placeholder: "Kategoriyalar",
                        id: 'category',
                        icon: 'briefcase',
                        setTo: 'orderCategory',
                    },
                    {
                        type: 'text',
                        get: '/worker/',
                        searchBy: 'name',
                        select: true,
                        placeholder: "Xodimlar",
                        id: 'worker',
                        icon: 'briefcase',
                        setTo: 'orderWorker',
                    },
                ]
            },
            {
                name: 'order-item',
                path: $('#order-item-modal .card-body'),
                data: [
                    {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                ]
            },
        ],
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