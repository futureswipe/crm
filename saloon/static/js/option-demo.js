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
        {
            name: 'company',
            url: {
                get: '/company/',
                create: '/company/create/',
                update: '/company/update/',
                delete: '/company/delete/'
            },
            search: 'name',
            path: $('#companies'),
            head: ["#", "title", "narxi"],
            title: "Kompaniya"
        },
        {
            name: 'product',
            url: {
                get: '/product/',
                create: '/product/create/',
                update: '/product/update/',
                delete: '/product/delete/'
            },
            search: 'name',
            path: $('#products'),
            head: ["#", "title", "Narxi", "Umumiy narxi", "O'lchov birligi", "Soni", "Qoldiq", "Kompaniyasi"],
            title: "Tovarlar"
        },
        {
            name: 'order',
            url: {
                get: '/order/',
                create: '/order/create/',
                update: '/order/update/',
                delete: '/order/delete/'
            },
            search: 'name',
            path: $('#order'),
            head: ["#", "Mijozlar", "Kompaniya", "Xizmat", "Ishchi"],
            title: "Buyurtmalar"
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
                append: 'services',
                path: $('#service-modal .card-body'),
                data: [
                    {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                    {type: 'number', placeholder: 'Narxi', id: 'price', icon: 'money-bill-alt'}
                ]
            },
            {
                name: 'worker',
                append: 'workers',
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
                        id: 'position',
                        icon: 'briefcase',
                        setTo: 'workerJob'
                    },
                    {type: 'number', placeholder: 'Telefon Raqami', id: 'tel', icon: 'phone'},
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
                append: 'customers',
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
                append: 'companies',
                path: $('#company-modal .card-body'),
                data: [
                    {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                    {type: 'number', placeholder: 'Narxi', id: 'price', icon: 'money-bill-alt'},
                ]
            },
            {
                name: 'product',
                append: 'products',
                path: $('#product-modal .card-body'),
                data: [
                    {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                    {type: 'number', placeholder: 'Narxi', id: 'price', icon: 'briefcase'},
                    {type: 'number', placeholder: 'Umumiy Narxi', id: 'priceall', icon: 'briefcase'},
                    {
                        type: 'text',
                        get: '/unit/',
                        searchBy: 'title',
                        select: true,
                        placeholder: "O'lchov birligi",
                        id: 'unit',
                        icon: 'briefcase',
                        setTo: 'unit'
                    },
                    {
                        type: 'text',
                        get: '/service/',
                        searchBy: 'title',
                        select: true,
                        placeholder: "Kategoriya",
                        id: 'category',
                        icon: 'briefcase',
                        setTo: 'category',
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
                        setTo: 'company',
                    },
                ],
                post: ''
            },
            {
                name: 'order',
                append: 'order',
                path: $('#order-modal .card-body'),
                data: [
                    {
                        type: 'text',
                        get: '/customer/',
                        searchBy: 'name',
                        select: true,
                        placeholder: "Mijozlar",
                        id: 'customer',
                        icon: 'briefcase',
                        setTo: 'customer',
                    },
                    {
                        type: 'text',
                        get: '/company/',
                        searchBy: 'title',
                        select: true,
                        placeholder: "Kompaniyalar",
                        id: 'company',
                        icon: 'briefcase',
                        setTo: 'company',
                    },
                    {
                        type: 'text',
                        get: '/service/',
                        searchBy: 'title',
                        select: true,
                        placeholder: "Kategoriyalar",
                        id: 'category',
                        icon: 'briefcase',
                        setTo: 'category',
                    },
                    {
                        type: 'text',
                        get: '/worker/',
                        searchBy: 'name',
                        select: true,
                        placeholder: "Xodimlar",
                        id: 'worker',
                        icon: 'briefcase',
                        setTo: 'worker',
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
        {"title": "Todo", "href": "#todo", "active": false, "icon": "fa-list"},
    ]
}