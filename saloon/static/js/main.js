$(document).fsReady(function () {
    $(window).on('load', function () {
        let loading = $('.loading');
        $.timeout(function () {
            loading.addClass('end');
            $.timeout(function () {
                loading.style('opacity', '0');
                $.timeout(function () {
                    loading.remove()
                }, 500).then(() => true)
            }, 150).then(() => true)
        }, 500).then(() => true)
        $.timeout(function () {
            let animate = $('.animate-this')
            $.timeout(function () {
                animate.each(animate => {
                    $(animate).addClass('animate')
                })
            }, 750).then(() => true)
        }).then(() => true)
        $('main').style('height', `calc(100% - ${$('header').h('scroll')}px)`)
    })
    let main = $('main'),
        mainT1 = main.t('scroll');
    main.on('scroll', function () {
        let mainT2 = main.t('scroll');
        if (mainT1 < mainT2) {
            sidebar(true).then(() => true)
        } else {
            sidebar(false).then(() => true)
        }
        mainT1 = mainT2;
    })

    async function sidebar(smooth) {
        const sidebar = $('.sidebar');
        if (smooth === true) {
            await sidebar.addClass('smooth-hide')
        } else {
            await sidebar.removeClass('smooth-hide')
        }
    }

    $('.btn-bar').on('click', function (e) {
        e.preventDefault()
        const aside = $('aside');
        aside.toggleClass('hide');
        aside.selectAll('p').each(p => {
            $.timeout(function () {
                if (aside.hasClass('hide')) {
                    $(p).addClass('start')
                } else {
                    $(p).removeClass('start')
                }
            }, 150).then(() => true)
        })
    })
    let counts = {
        service: 0,
        worker: 0,
        unit: 0,
        customer: 0,
        company: 0,
        product: 0,
    }
    let optBtn = `<th class="d-flex ai-center gap-1">
                      <button class="btn ripple d-none btn-active bg-main save-btn t-white px-4 py-2 round-1">
                      <i class="fas fa-save"></i> 
                      </button>
                      <button class="btn ripple btn-active bg-main-green edit-btn t-white px-4 py-2 round-1">
                      <i class="fas fa-edit"></i> 
                      </button>
                      <button class="btn ripple btn-active bg-danger remove-btn t-white px-4 py-2 round-1">
                      <i class="fas fa-trash"></i> 
                      </button>
                      </th>`
    for (let i = 0; i < webOpt.navbar.length; i++) {
        let items = webOpt.navbar[i];
        let item = $.create('div');
        $(item).className(`nav-item ${items['active'] === true ? "active" : ""}`)
        $(item).inner(` <a href="${items['href']}" class="nav-link"><span><i class="fas ${items['icon']}"></i></span>
                <p class="t-capitalize">${items['title']}</p></a>`)
        $('.sidebar .navbar').append(item, 'child')
        $(item).on('click', function (e) {
            e.preventDefault();
            $('.nav-item').removeClass('active');
            $(this).addClass('active');
            $('section').addClass('d-none');
            $(`section${items['href']}`).removeClass('d-none');
            $('tbody tr').each(tr => {
                $(tr).style('display', 'table-row');
            })
            $('input[name=search]').each(inp => {
                $(inp).val('')
            })
        })
    }

    async function opt({url, object, from, btn}) {
        btn.edit.on('click', function () {
            object.selectAll('[data-edit]').each(obj => {
                let set = $(obj).attr('data-set'), type = $(obj).attr('data-type');
                if (type !== 'select')
                    $(obj).inner(`<input type="${type}" data-get="${set}" class="t-dark fw-bold form-control w-100 t-center" value="${$(obj).text()}" autocomplete="off" placeholder="${set}">`)
                if (btn) {
                    btn.edit.addClass('d-none')
                    btn.save.removeClass('d-none')
                }
            })
        })
        btn.save.on('click', function () {
            let data;
            switch (from) {
                case 'service': {
                    data = {
                        "title": getVal('title'),
                        "price": getVal('price')
                    }
                    break;
                }
                case 'worker': {
                    data = {
                        "name": getVal('name'),
                        "surename": getVal('surename'),
                        "position": getVal('price'),
                        "address": getVal('address'),
                        "tel": getVal('tel'),
                    }
                    break;
                }
                case 'unit': {
                    data = {
                        "title": getVal('title'),
                    }
                    break;
                }
                case 'customer': {
                    data = {
                        "birthday": getVal('birthday'),
                        "name": getVal('name'),
                        "surname": getVal('surname'),
                        "phone": getVal('phone'),
                    }
                    break;
                }
                case 'company': {
                    data = {
                        "title": getVal('title'),
                        "price": getVal('price'),
                    }
                    break;
                }
                case 'product': {
                    data = {
                        "category": getVal('category'),
                        "company": getVal('company'),
                        "count": getVal('count'),
                        "measurement": getVal('measurement'),
                        "price": getVal('price'),
                        "priceall": getVal('priceall'),
                        "residue": getVal('residue'),
                        "title": getVal('title'),
                    }
                    break;
                }
            }
            $.post({
                dataType: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(data),
                url: url.update
            }).then(() => {
                object.selectAll('[data-edit]').each(obj => {
                    let inp = $(obj).select('input').val()
                    $(obj).inner(inp)
                    if (btn) {
                        btn.edit.removeClass('d-none')
                        btn.save.addClass('d-none')
                    }
                })
            })
        })

        function getVal(val) {
            return object.select(`[data-get=${val}]`).val()
        }

        btn.remove.on('click', function () {
            $.post({
                url: url.remove,
                credentials: 'include'
            }).then(() => {
                object.remove()
            })
        })
    }

    async function dataFilter({url, from, path, searchBy}) {
        $.get({
            url: url.get,
            success: (data) => {
                let search = $('input[name=search]')
                for (let i = 0; i < data.length; i++) {
                    let json = data[i], jsonData;
                    let created = {
                        tr: $.create('tr')
                    }
                    $(created.tr).inner(`<th>${i + 1}</th>`)
                    switch (from) {
                        case 'service': {
                            $(created.tr).inner(`<th data-type="text" data-set="title" data-edit="true">${json['title']}</th>
                                                      <th data-type="number" data-set="price" data-edit="true">${json['price']}</th>`, true)
                            jsonData = {
                                "title": '123',
                                "price": '123'
                            }
                            break;
                        }
                        case 'worker': {
                            $(created.tr).inner(`<th data-type="text" data-set="name" data-edit="true">${json['name']}</th>
                                                      <th data-type="text" data-set="surename" data-edit="true">${json['surename']}</th>
                                                      <th data-type="text" data-set="position" data-edit="true">${json['position']}</th>
                                                      <th data-type="number" data-set="tel" data-edit="true">${json['tel']}</th>
                                                      <th data-type="text" data-set="address" data-edit="true">${json['address']}</th>`, true)
                            break;
                        }
                        case 'unit': {
                            $(created.tr).inner(`<th data-type="text" data-set="title" data-edit="true">${json['title']}</th>`, true)
                            break;
                        }
                        case 'customer': {
                            $(created.tr).inner(`<th data-type="text" data-set="name" data-edit="true">${json['name']}</th>
                                                      <th data-type="number" data-set="surname" data-edit="true">${json['surname']}</th>
                                                      <th data-type="number" data-set="phone" data-edit="true">${json['phone']}</th>
                                                      <th data-type="number" data-set="birthday" data-edit="true">${json['birthday']}</th>`, true)
                            break;
                        }
                        case 'company': {
                            $(created.tr).inner(`<th data-type="text" data-set="title" data-edit="true">${json['title']}</th>
                                                      <th data-type="number" data-set="price" data-edit="true">${json['price']}</th>`, true)
                            break;
                        }
                        case 'product': {
                            $(created.tr).inner(`<th data-type="text" data-set="title" data-edit="true">${json['title']}</th>
                                                      <th data-type="number" data-set="price" data-edit="true">${json['price']}</th>
                                                      <th data-type="number" data-set="priceall" data-edit="true">${json['priceall']}</th>
                                                      <th data-type="text" data-set="measurement" data-edit="true">${json['measurement']}</th>
                                                      <th data-type="number" data-set="count" data-edit="true">${json['count']}</th>
                                                      <th data-type="number" data-set="residue" data-edit="true">${json['residue']}</th>
                                                      <th data-type="number" data-set="company" data-edit="true">${json['company']}</th>`, true)
                            break;
                        }
                    }
                    $(created.tr).inner(optBtn, true)
                    opt({
                        btn: {
                            remove: $(created.tr).select('.remove-btn'),
                            edit: $(created.tr).select('.edit-btn'),
                            save: $(created.tr).select('.save-btn')
                        },
                        url: {
                            remove: `${url.remove}${json['id']}/`,
                            update: `${url.update}${json['id']}/`,
                        },
                        from: from,
                        object: $(created.tr)
                    })
                    path.append(created.tr, 'child')
                    search.on('keyup', function () {
                        if (json[searchBy].toUpperCase().indexOf($(this).val().toUpperCase()) >= 0) {
                            $(created.tr).style('display', 'table-row')
                        } else {
                            $(created.tr).style('display', 'none')
                        }
                    })
                }
            }
        }).then(() => true)
    }

    // service data
    dataFilter({
        url: {
            get: webOpt.service.url.get,
            update: webOpt.service.url.update,
            remove: webOpt.service.url.delete,
        },
        searchBy: 'title',
        from: 'service',
        path: $('section#services tbody'),
    }).then(() => true)
// worker data
    dataFilter({
        url: {
            get: webOpt.worker.url.get,
            update: webOpt.worker.url.update,
            remove: webOpt.worker.url.delete,
        },
        searchBy: 'name',
        from: 'worker',
        path: $('section#workers tbody'),
    }).then(() => true)
    // unit data
    dataFilter({
        url: {
            get: webOpt.unit.url.get,
            update: webOpt.unit.url.update,
            remove: webOpt.unit.url.delete,
        },
        searchBy: 'title',
        from: 'unit',
        path: $('section#unit tbody'),
    }).then(() => true)
    // customer data
    dataFilter({
        url: {
            get: webOpt.customer.url.get,
            update: webOpt.customer.url.update,
            remove: webOpt.customer.url.delete,
        },
        searchBy: 'title',
        from: 'customer',
        path: $('section#customers tbody'),
    }).then(() => true)
    // company data
    dataFilter({
        url: {
            get: webOpt.company.url.get,
            update: webOpt.company.url.update,
            remove: webOpt.company.url.delete,
        },
        searchBy: 'title',
        from: 'company',
        path: $('section#companies tbody'),
    }).then(() => true)
    // product data
    dataFilter({
        url: {
            get: webOpt.product.url.get,
            update: webOpt.product.url.update,
            remove: webOpt.product.url.delete,
        },
        searchBy: 'title',
        from: 'product',
        path: $('section#products tbody'),
    }).then(() => true)

    async function thead(url, title, path) {
        path.select('thead').inner('<tr></tr>')
        for (let i = 0; i < url.length; i++) {
            path.select('thead tr').inner(`<th>${url[i]}</th>`, true)
        }
        path.select('thead tr').inner('<th><i class="fas fa-ellipsis-h"></i></th>', true)
        path.select('h2').inner(title)
    }

    thead(webOpt.service.head, webOpt.service.title, $('section#services')).then(() => true).catch(() => false)
    thead(webOpt.worker.head, webOpt.worker.title, $('section#workers')).then(() => true).catch(() => false)
    thead(webOpt.unit.head, webOpt.unit.title, $('section#unit')).then(() => true).catch(() => false)
    thead(webOpt.customer.head, webOpt.customer.title, $('section#customers')).then(() => true).catch(() => false)
    thead(webOpt.company.head, webOpt.company.title, $('section#companies')).then(() => true).catch(() => false)
    thead(webOpt.product.head, webOpt.product.title, $('section#products')).then(() => true).catch(() => false)
    thead(webOpt.order.head, webOpt.order.title, $('section#order')).then(() => true).catch(() => false)

    async function modalOpt({path, submit, idType, iconType, data}) {
        let selIds = {
            workerJob: 0,
            productCategory: 0,
            productUnit: 0,
            productCompany: 0,
            orderWorker: 0,
            orderService: 0,
            orderCompany: 0,
            orderCustomer: 0
        }
        for (let i = 0; i < data.length; i++) {
            let json = data[i];
            let inGroup = $.create('div');
            let showBar = true;
            $(inGroup).className('input-group relative')
            if (json.select !== true)
                $(inGroup).className('input-group relative')
            $(inGroup).inner(`<input class="form-control t-dark fw-bold w-100" autocomplete="off" type="${json.type}" id="${idType}-${json.id}" placeholder="${json.placeholder}">
                                   <label for="${idType}-${json.id}" class="absolute"><i class="${iconType} fa-${json.icon}"></i></label>`)
            if (json.select === true) {
                $(inGroup).className('relative input-group d-flex search-input-group ai-center jc-center')
                $(inGroup).inner(`<p class="form-control search-p t-dark fw-bold w-100" id="${idType}-${json.id}"><span>${json.placeholder}</span></p>
                                   <button class="search-down-btn"><i class="${iconType} fa-angle-down"></i></button>`)
                $(inGroup).inner(`<div class="search-bar absolute w-100 bg-white shadow-md"></div>`, true)
                $(inGroup).select('.search-bar').inner(`<div class="input-group relative p-2">
                                        <label for="${idType}-search" class="absolute l-4"><i class="fas fa-search"></i></label>
                                        <input type="search" placeholder="Search" id="${idType}-search" class="w-100 form-control t-dark fw-bold">
                                        </div>`)
                $(inGroup).select('.search-down-btn').on('click', function () {
                    $(inGroup).parent().selectAll('.input-group .search-bar.show').each(bar => {
                        barOpt($(bar), false)
                    })
                    $.get({
                        url: json.get,
                        success: (data) => {
                            let searchBar = $(inGroup).select('.search-bar');
                            $(inGroup).selectAll('.search-bar p').remove()
                            for (let j = 0; j < data.length; j++) {
                                let searchJson = data[j];
                                let p = $.create('p');
                                $(p).className('item fw-bold p-2');
                                $(p).inner(searchJson[json.searchBy])
                                $(inGroup).select('.search-bar').append(p, 'child')
                                $(p).on('click', function () {
                                    $(inGroup).select('.search-p').inner(searchJson[json.searchBy]);
                                    selIds[json.setTo] = searchJson['id'];
                                    barOpt(searchBar, false)
                                })
                            }

                            let barH = 0;
                            searchBar.selectAll('p').each(p => {
                                barH += $(p).h()
                            })
                            barOpt(searchBar, true, barH + searchBar.select('input').h() + 16)
                            searchBar.select('input').on('keyup', function () {
                                let p = searchBar.selectAll('p'), _this = $(this), inH = 0;
                                p.each(p => {
                                    if ($(p).text().toUpperCase().indexOf(_this.val().toUpperCase()) >= 0) {
                                        $(p).removeClass('d-none')
                                        inH += $(p).h();
                                    } else {
                                        $(p).addClass('d-none')
                                        inH -= $(p).h();
                                    }
                                })
                                barOpt(searchBar, true, inH + searchBar.select('input').h() + 16)
                            })
                        }
                    })
                })
            }

            async function barOpt(bar, add, h,) {
                switch (add) {
                    case true: {
                        bar.addClass('show')
                        break;
                    }
                    case false: {
                        bar.removeClass('show')
                        break;
                    }
                }
                if (bar.hasClass('show') === true) {
                    bar.style('height', h + 'px')
                } else {
                    bar.style('height', 0)
                }
            }

            path.append(inGroup, 'child')
        }
        submit.on('click', function () {
            let url, data, input, create, path, tr, urls, count;
            tr = $.create('tr');
            switch (idType) {
                case 'service': {
                    path = $('#services tbody');
                    input = {
                        title: $(`#${idType}-title`).val(),
                        price: $(`#${idType}-price`).val()
                    }
                    create = input.title !== '' && input.price !== '';
                    count = counts.service += 1;
                    $(tr).inner(`
                          <th data-edit="true" data-type="text" data-set="title">${input.title}</th>
                          <th data-edit="true" data-type="text" data-set="price">${input.price}</th>
                           `, true)
                    url = webOpt.service.url.create;
                    data = {
                        "price": input.price,
                        "title": input.title
                    }
                    urls = {
                        remove: webOpt.service.url.delete,
                        update: webOpt.service.url.update
                    }
                    break;
                }
                case 'worker': {
                    path = $('#workers tbody');
                    input = {
                        name: $(`#${idType}-name`).val(),
                        sureName: $(`#${idType}-surename`).val(),
                        job: $(`#${idType}-job`).val(),
                        phone: $(`#${idType}-phone`).val(),
                        address: $(`#${idType}-address`).val(),
                    }
                    create = input.name !== '' && input.sureName !== '' && input.job !== '' &&
                        input.phone !== '' && input.address !== '';
                    count = counts.worker += 1;
                    $(tr).inner(`
                          <th data-edit="true" data-type="text" data-set="name">${input.name}</th>
                          <th data-edit="true" data-type="text" data-set="suremame">${input.sureName}</th>
                          <th data-edit="true" data-type="text" data-set="job">${input.job}</th>
                          <th data-edit="true" data-type="text" data-set="phone">${input.phone}</th>
                          <th data-edit="true" data-type="text" data-set="address">${input.address}</th>
                           `, true)
                    url = webOpt.worker.url.create;
                    data = {
                        "name": input.name,
                        "surename": input.sureName,
                        "position": selIds.workerJob,
                        "tel": input.phone,
                        "address": input.address,
                    }
                    urls = {
                        remove: webOpt.worker.url.delete,
                        update: webOpt.worker.url.update
                    }
                    break;
                }
                case 'unit': {
                    path = $('#unit tbody');
                    input = {
                        title: $(`#${idType}-title`).val(),
                    }
                    create = input.title !== '';
                    count = counts.unit += 1;
                    $(tr).inner(`
                          <th data-edit="true" data-type="text" data-set="title">${input.title}</th>
                           `, true)
                    url = webOpt.unit.url.create;
                    data = {
                        "title": input.title
                    }
                    urls = {
                        remove: webOpt.unit.url.delete,
                        update: webOpt.unit.url.update
                    }
                    break;
                }
                case 'company': {
                    path = $('#companies tbody');
                    input = {
                        title: $(`#${idType}-title`).val(),
                        price: $(`#${idType}-price`).val(),
                    }
                    create = input.price !== '' && input.title !== '';
                    count = counts.company += 1;
                    $(tr).inner(`
                          <th data-edit="true" data-type="text" data-set="title">${input.title}</th>
                          <th data-edit="true" data-type="text" data-set="price">${input.price}</th>
                           `, true)
                    url = webOpt.company.url.create;
                    data = {
                        "title": input.title,
                        "price": input.price
                    }
                    urls = {
                        remove: webOpt.company.url.delete,
                        update: webOpt.company.url.update
                    }
                    break;
                }
                case 'product': {
                    path = $('#products tbody');
                    input = {
                        title: $(`#${idType}-title`).val(),
                        company: $(`#${idType}-company`).val(),
                        category: $(`#${idType}-category`).val(),
                        measurement: $(`#${idType}-unit`).val(),
                        count: $(`#${idType}-count`).val(),
                        price: $(`#${idType}-price`).val(),
                        priceAll: $(`#${idType}-all-price`).val(),
                        residue: $(`#${idType}-residue`).val(),
                    }
                    create = input.price !== '' && input.title !== '' && input.priceAll !== ''
                        && input.residue !== '' && input.measurement !== '' && input.count !== ''
                        && input.company !== '' && input.category !== '';
                    count = counts.product += 1;
                    $(tr).inner(`
                          <th data-edit="true" data-type="text" data-set="title">${input.title}</th>
                          <th data-edit="true" data-type="text" data-set="price">${input.price}</th>
                          <th data-edit="true" data-type="text" data-set="price">${input.priceAll}</th>
                          <th data-edit="true" data-type="text" data-set="price">${input.residue}</th>
                          <th data-edit="true" data-type="text" data-set="price">${input.count}</th>
                          <th data-edit="true" data-type="text" data-set="price">${input.category}</th>
                          <th data-edit="true" data-type="text" data-set="price">${input.company}</th>
                           `, true)
                    url = webOpt.product.url.create;
                    data = {
                        "title": input.title,
                        "company": input.company,
                        "category": selIds.productCategory,
                        "measurement": selIds.productUnit,
                        "count": input.count,
                        "price": input.price,
                        "priceall": input.priceAll,
                        "residue": input.residue,
                    }
                    urls = {
                        remove: webOpt.product.url.delete,
                        update: webOpt.product.url.update
                    }
                    break;
                }
                case 'customer': {
                    path = $('#customers tbody');
                    input = {
                        name: $(`#${idType}-name`).val(),
                        sureName: $(`#${idType}-surename`).val(),
                        phone: $(`#${idType}-phone`).val(),
                        birthday: $(`#${idType}-birthday`).val(),
                    }
                    create = input.name !== '' && input.sureName !== '' && input.phone !== ''
                        && input.birthday !== '';
                    count = counts.customer += 1;
                    $(tr).inner(`
                          <th data-edit="true" data-type="text" data-set="title">${input.name}</th>
                          <th data-edit="true" data-type="text" data-set="price">${input.sureName}</th>
                          <th data-edit="true" data-type="text" data-set="price">${input.phone}</th>
                          <th data-edit="true" data-type="text" data-set="price">${input.birthday}</th>
                           `, true)
                    url = webOpt.customer.url.create;
                    data = {
                        "name": input.name,
                        "surname": input.sureName,
                        "phone": input.phone,
                        "birthday": input.birthday,
                    }
                    urls = {
                        remove: webOpt.customer.url.delete,
                        update: webOpt.customer.url.update
                    }
                    break;
                }
            }
            let thCount = $.create('th');
            $(thCount).inner(count)
            $(tr).prepend(thCount)
            $(tr).inner(optBtn, true)
            if (create === true)
                add(url, data, (id) => {
                    opt({
                        btn: {
                            remove: $(tr).select('.remove-btn'),
                            edit: $(tr).select('.edit-btn'),
                            save: $(tr).select('.save-btn')
                        },
                        url: {
                            remove: `${urls.remove}${id}/`,
                            update: `${urls.update}${id}/`,
                        },
                        from: idType,
                        object: $(tr)
                    })
                }).then(() => {
                    clearCache().then(() => true).catch((res) => console.assert(res));
                    path.append(tr, 'child');
                })
        })

        async function add(url, data, id = () => {
        }) {
            fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            }).then(res => res.json())
                .then(res => {
                    id(res['id'])
                })
        }
    }

    $(window).on('click', function (e) {
        $('.modal').each(modal => {
            if (e.target === modal) {
                clearCache().then(() => true).catch((res) => console.assert(res));
            }
        })
    })

    async function clearCache() {
        $('.modal').each(modal => {
            let inputs = $(modal).selectAll('input');
            inputs.each(inp => {
                $(inp).val('')
            })
            $(modal).selectAll('.search-bar').style('height', 0);
            $(modal).selectAll('.search-bar p').removeClass('d-none')
        })
    }

    modalOpt({
        path: $('#order-modal .card-body'),
        data: webOpt.modal.order.data,
        iconType: webOpt.modal.iconType,
        idType: webOpt.modal.order.idType,
        submit: $('#order-modal .card-footer .btn')
    }).then(() => true)
    modalOpt({
        path: $('#order-item-modal .card-body'),
        data: webOpt.modal.orderItem.data,
        iconType: webOpt.modal.iconType,
        idType: webOpt.modal.orderItem.idType,
        submit: $('#order-item-modal .card-footer .btn')
    }).then(() => true)
    modalOpt({
        path: $('#service-modal .card-body'),
        data: webOpt.modal.service.data,
        iconType: webOpt.modal.iconType,
        idType: webOpt.modal.service.idType,
        submit: $('#service-modal .card-footer .btn')
    }).then(() => true)
    modalOpt({
        path: $('#worker-modal .card-body'),
        data: webOpt.modal.worker.data,
        iconType: webOpt.modal.iconType,
        idType: webOpt.modal.worker.idType,
        submit: $('#worker-modal .card-footer .btn')
    }).then(() => true)
    modalOpt({
        path: $('#unit-modal .card-body'),
        data: webOpt.modal.unit.data,
        iconType: webOpt.modal.iconType,
        idType: webOpt.modal.unit.idType,
        submit: $('#unit-modal .card-footer .btn')
    }).then(() => true)
    modalOpt({
        path: $('#customer-modal .card-body'),
        data: webOpt.modal.customer.data,
        iconType: webOpt.modal.iconType,
        idType: webOpt.modal.customer.idType,
        submit: $('#customer-modal .card-footer .btn')
    }).then(() => true)
    modalOpt({
        path: $('#company-modal .card-body'),
        data: webOpt.modal.company.data,
        iconType: webOpt.modal.iconType,
        idType: webOpt.modal.company.idType,
        submit: $('#company-modal .card-footer .btn')
    }).then(() => true)
    modalOpt({
        path: $('#product-modal .card-body'),
        data: webOpt.modal.product.data,
        iconType: webOpt.modal.iconType,
        idType: webOpt.modal.product.idType,
        submit: $('#product-modal .card-footer .btn')
    }).then(() => true)
    for (let i = 0; i < webOpt.dashCards.data.length; i++) {
        let json = webOpt.dashCards.data[i];
        let col = $.create('div');
        $(col).className('col-12 animate-this px-0 sm:col-6 lg:col-3');
        $(col).inner(`
                    <div class="card mb-0 relative round-2 shadow-md">
                        <h1></h1>
                        <h3>${json['title']}</h3>
                        <div class="icon"><i class="${webOpt.dashCards.iconType} fa-${json['icon']}"></i></div>
                    </div>
        `)
        let h1 = $(col).select('h1');
        $.get({
            url: json['get'],
            success: function (c) {
                h1.inner(c.length)
            }
        })
        $("#dashboard .row-dashboard").append(col, 'child')
    }
    const accordingBtn = $('.according-list button');
    accordingBtn.on('click', function (e) {
        e.preventDefault();
        const href = $(this).select('a').attr('href')
        const card = $('.according-card');
        const cardA = $(`.according-card${href}`);
        accordingBtn.removeClass('active');
        $(this).addClass('active');
        card.addClass('d-none');
        cardA.removeClass('d-none');
    })
    const orderData = {
        customer: getForOrder(webOpt.customer.url.get)
    }

    function getForOrder(url) {
        return $.get({
            url: url,
            success: (data) => data
        })
    }
})