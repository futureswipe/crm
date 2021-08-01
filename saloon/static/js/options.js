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
            head: ["#", "Mijozlar", "Kompaniya", "Xizmat", "Ishchi"],
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
            path: $('#service-modal'),
            data: [
                {type: 'text', placeholder: 'Title', id: 'title', icon: 'briefcase'},
                {type: 'number', placeholder: 'Narxi', id: 'price', icon: 'money-bill-alt'}
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