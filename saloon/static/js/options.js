const options = {
    ajax_data: [
        {
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
            url: {
                get: '/product/',
                create: '/product/create/',
                update: '/product/update/',
                delete: '/product/delete/'
            },
            search: 'name',
            path: $('#products'),
            head: ["#", "title", "Kompaniyasi", "Kategoriyasi", "O'lchov birligi", "Soni", "Narxi", "Umumiy narxi", "Qoldiq"],
            title: "Tovarlar"
        },
        {
            url: {
                get: '/order/',
                create: '/order/create/',
                update: '/order/update/',
                delete: '/order/delete/'
            },
            search: 'name',
            path: $('#order'),
            head: ["#", "Mijozlar", "Kompaniya", "Xizmat", "Ishchi", "Narxi"],
            title: "Buyurtmalar"
        },
        {
            url: {
                get: '/used/prod/'
            },
            search: 'name',
            path: $('#user-product'),
            head: ["#", "Tovarlar", "Ishlatildi"],
            title: "Ishlatilgan Tovarlar"
        }
    ],
    modal: [
        {
            name: 'service',
            append: 'services',
            path: $('#services-modal'),
            data: [
                {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                {type: 'number', placeholder: 'Narxi', id: 'price', icon: 'money-bill-alt'}
            ]
        },
        {
            name: 'worker',
            append: 'workers',
            path: $('#workers-modal'),
            data: [
                {type: 'text', placeholder: 'Ismi', id: 'name', icon: 'user'},
                {type: 'text', placeholder: 'Familyasi', id: 'surename', icon: 'user'},
                {
                    type: 'select',
                    get: '/service/',
                    searchBy: 'title',
                    placeholder: 'Vazifasi',
                    id: 'position',
                    icon: 'briefcase',
                },
                {type: 'number', placeholder: 'Telefon Raqami', id: 'tel', icon: 'phone'},
                {type: 'text', placeholder: 'Manzili', id: 'address', icon: 'map'},
            ]
        },
        {
            name: 'customer',
            append: 'customers',
            path: $('#customers-modal'),
            data: [
                {type: 'text', placeholder: 'Ismi', id: 'name', icon: 'user'},
                {type: 'text', placeholder: 'Familyasi', id: 'surname', icon: 'user'},
                {type: 'number', placeholder: 'Telefon raqami', id: 'phone', icon: 'phone'},
                {type: 'date', placeholder: '', id: 'birthday', icon: 'calendar'},
            ]
        },
        {
            name: 'company',
            append: 'companies',
            path: $('#companies-modal'),
            data: [
                {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                {type: 'number', placeholder: 'Narxi', id: 'price', icon: 'money-bill-alt'},
            ]
        },
        {
            name: 'product',
            append: 'products',
            path: $('#products-modal'),
            data: [
                {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                {type: 'number', placeholder: 'Narxi', id: 'price', icon: 'briefcase'},
                {type: 'number', placeholder: 'Umumiy Narxi', id: 'priceall', icon: 'briefcase'},
                {
                    type: 'select',
                    get: '/unit/',
                    searchBy: 'title',
                    placeholder: "O'lchov birligi",
                    id: 'measurement',
                    icon: 'briefcase',
                },
                {
                    type: 'select',
                    get: '/service/',
                    searchBy: 'title',
                    placeholder: "Kategoriya",
                    id: 'category',
                    icon: 'briefcase',
                },
                {type: 'number', placeholder: 'Soni', id: 'count', icon: 'briefcase'},
                {type: 'number', placeholder: 'Qoldiq', id: 'residue', icon: 'briefcase'},
                {
                    type: 'select',
                    get: '/company/',
                    searchBy: 'title',
                    placeholder: "Kompaniyasi",
                    id: 'company',
                    icon: 'briefcase',
                },
            ],
        },
        {
            name: 'order',
            append: 'order',
            path: $('#order-modal'),
            data: [
                {
                    type: 'select',
                    get: '/customer/',
                    searchBy: 'name',
                    placeholder: "Mijozlar",
                    id: 'customer',
                    icon: 'briefcase',
                },
                {
                    type: 'select',
                    get: '/company/',
                    searchBy: 'title',
                    placeholder: "Kompaniyalar",
                    id: 'withcompany',
                    icon: 'briefcase',
                },
                {
                    type: 'select',
                    get: '/service/',
                    searchBy: 'title',
                    placeholder: "Kategoriyalar",
                    id: 'category',
                    icon: 'briefcase',
                },
                {
                    type: 'select',
                    get: '/worker/',
                    searchBy: 'name',
                    placeholder: "Xodimlar",
                    id: 'worker',
                    icon: 'briefcase',
                },
            ]
        },
        {
            name: 'unit',
            append: 'unit',
            path: $('#unit-modal'),
            data: [
                {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
            ]
        },
    ],
    navbar: [
        {title: "Dashboard", href: "#dashboard", active: true, icon: "tachometer-alt-slowest"},
        {title: "Xodimlar", href: "#workers", active: false, icon: "users"},
        {title: "Xizmatlar", href: "#services", active: false, icon: "people-carry"},
        {title: "Kompaniyalar", href: "#companies", active: false, icon: "briefcase"},
        {title: "Tovarlar", href: "#products", active: false, icon: "box-open"},
        {title: "Mijozlar", href: "#customers", active: false, icon: "user"},
        {title: "O'lchov birligi", href: "#unit", active: false, icon: "weight-hanging"},
        {title: "Buyurtmalar", href: "#order", active: false, icon: "tag"},
        {title: "Ishlatilgan Tovarlar", href: "#used-product", active: false, icon: "box-open"},
    ]
}