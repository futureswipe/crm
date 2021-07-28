$(document).fsReady(() => {
    $(window).on('load', () => {
        $('.animate-this').addClass('animate')
    })
    for (let i = 0; i < webOptions.dashCards.data.length; i++) {
        const json = webOptions.dashCards.data[i];
        const col = $.create('div');
        $(col).className('col-12 animate-this px-0 sm:col-6 lg:col-3');
        $(col).inner(`
                    <div class="card mb-0 relative round-2 shadow-md">
                        <h1></h1>
                        <h3>${json['title']}</h3>
                        <div class="icon"><i class="${webOptions.dashCards.iconType} fa-${json['icon']}"></i></div>
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
    for (let i = 0; i < webOptions.navbar.length; i++) {
        const navbar = webOptions.navbar[i];
        const item = $.create('div');
        $(item).className(`nav-item ${navbar['active'] === true ? "active" : ""}`);
        $(item).inner(`<a href="${navbar['href']}" class="nav-link"><span><i class="fas ${navbar['icon']}"></i></span>
                <p class="t-capitalize">${navbar['title']}</p></a>`);
        $('.sidebar .navbar').append(item, 'child')
        $(item).on('click', async (e) => {
            e.preventDefault();
            await $(item).parent().select('.nav-item.active').removeClass('active')
            await $(item).addClass('active');
            await $('section').not('d-none').addClass('d-none');
            await $(`section${navbar['href']}`).removeClass('d-none')
            await clearCache()
        })
    }
    for (let i = 0; i < webOptions.ajax_data.length; i++) {
        const response = webOptions.ajax_data[i];
        const tr = $.create('tr');
        for (let f = 0; f < response.head.length; f++) {
            const head = response.head[f];
            $(tr).inner(`<th>${head}</th>`, true)
        }
        $(tr).inner(`<th><i class="fas fa-ellipsis-h"></i></th>`, true)
        response.path.select('thead').append(tr, 'child')
        $.get({
            url: response.url.get,
            success: async (res) => {
                for (let j = 0; j < res.length; j++) {
                    const json = res[j];
                    const tr = $.create('tr')
                    $(tr).inner(`<th>${j + 1}</th>`)
                    for (const jsonKey in json) {
                        const th = $.create('th');
                        if (jsonKey !== 'id' && jsonKey !== 'created') {
                            await $(th).inner(json[jsonKey] !== null ? json[jsonKey] : '<i class="fal fa-minus"></i>', true);
                            await $(th).setattr('get', true, jsonKey)
                            await $(th).setattr('type', true, 'text')
                            if (jsonKey === 'price' || jsonKey === 'tel' || jsonKey === 'priceall' || jsonKey === 'residue'
                                || jsonKey === 'phone')
                                await $(th).setattr('type', true, 'number')
                            if (jsonKey === 'position' || jsonKey === 'measurement' || jsonKey === 'company' || jsonKey === 'category')
                                await $(th).setattr('type', true, 'select')
                            switch (jsonKey) {
                                case 'position': {
                                    await $(th).setattr('url', true, '/service/')
                                }
                            }
                            await $(tr).append(th, 'child');
                        }
                    }
                    // await $(tr).inner(`<th class="d-flex ai-center gap-1">
                    //   <button class="btn ripple d-none btn-active bg-main save-btn t-white px-4 py-2 round-1">
                    //   <i class="fas fa-save"></i>
                    //   </button>
                    //   <button class="btn ripple btn-active bg-main-green edit-btn t-white px-4 py-2 round-1">
                    //   <i class="fas fa-edit"></i>
                    //   </button>
                    //   <button class="btn ripple btn-active bg-danger remove-btn t-white px-4 py-2 round-1">
                    //   <i class="fas fa-trash"></i>
                    //   </button>
                    //   </th>`, true)
                    await response.path.select('tbody').append(tr, 'child');
                    await optionBtn({
                        id: json['id'],
                        url: response.url,
                        parent: $(tr),
                    })
                    $('input[name=search]').on('keyup', async function () {
                        for (const jsonKey in json) {
                            if (json[response.search].toUpperCase().indexOf($(this).val().toUpperCase()) >= 0) {
                                await $(tr).style({
                                    display: 'table-row'
                                })
                            } else {
                                await $(tr).style({
                                    display: 'none'
                                })
                            }
                        }
                    })
                }
            }
        })
    }
    for (let i = 0; i < webOptions.modal.ajax_data.length; i++) {
        const listData = {};
        const res = webOptions.modal.ajax_data[i];
        for (let f = 0; f < res.data.length; f++) {
            let ids = {
                unit: 0,
                category: 0,
                company: 0,
                customer: 0,
                worker: 0
            }
            const json = res.data[f];
            const inGroup = $.create('div');
            $(inGroup).className(json.select === true ? 'input-group select-item relative' : json.list === true ? 'list-modal' : 'input-group relative')
            if (json.select === undefined && json.list === undefined) {
                $(inGroup).inner(`<label for="${res.name}-${json['id']}" class="absolute"><i class="${webOptions.modal.iconType} fa-${json['icon']}"></i></label>
                                 <input placeholder="${json['placeholder']}" type="${json['type']}" id="${res.name}-${json['id']}" autocomplete="off" class="form-control t-dark fw-bold w-100"> 
                                 `)
                $(inGroup).select(`#${res.name}-${json['id']}`).on('keyup', function () {
                    listData[json['id']] = $(this).val();
                })
            }
            const getBtn = $.create('button');
            $(getBtn).className('get');
            $(getBtn).inner('<i class="fas fa-angle-down"></i>')
            if (json.select === true) {
                $(inGroup).inner(`<p class="form-control pl-3" style="max-width: 100%; width: 100%;">${json['placeholder']}</p>`, true);
                $(inGroup).append(getBtn, 'child')
                $(inGroup).inner(`<div class="lists"></div>`, true)
            }
            $(inGroup).select('.get').on('click', function () {
                $(inGroup).select('.lists').inner('')
                $.get({
                    url: json.get,
                    success: (res) => {
                        for (let j = 0; j < res.length; j++) {
                            const pItem = $.create('p');
                            $(pItem).className('item');
                            $(pItem).inner(res[j][json.searchBy])
                            $(inGroup).select('.lists').append(pItem, 'child')
                            $(pItem).on('click', () => {
                                ids[json.setTo] = res[j]['id'];
                                console.log(json['id'])
                                if (json['id'] === 'position' || json['id'] === 'measurement' || json['id'] === 'category' || json['id'] === 'company' ||
                                    json['id'] === 'unit' || json['id'] === 'worker' || json['id'] === 'customer')
                                    listData[json['id']] = ids[json.setTo];
                                $(inGroup).select('p.form-control').inner($(pItem).text())
                                $(inGroup).select('.lists').toggleClass('show')
                            })
                        }
                        $(inGroup).select('.lists').property('--h', $(inGroup).select('.lists').h('scroll') + 'px');
                        $(inGroup).select('.lists').toggleClass('show')
                    }
                })
            })
            res.path.append(inGroup, 'child');

        }
        res.path.next().select('.btn').on('click', async () => {
            console.log(listData)
            await fetch(`/${res.name}/create/`, {
                method: "POST", body: JSON.stringify(listData), headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                try {
                    return res.json()
                } catch (error) {

                }
            }).then((resp) => {
                try {
                    switch (res.append) {
                        case "order": {
                            $.get({
                                url: '/product/',
                                success: (res) => {
                                    const modal = $('#order-item-modal');
                                    modal.select('h3').inner(resp['category']);
                                    modal.addClass('show');
                                    let result = res.reduce(function (r, a) {
                                        r[a.category] = r[a.category] || [];
                                        r[a.category].push(a);
                                        return r;
                                    }, {});
                                    for (let j = 0; j < result[resp['category']].length; j++) {
                                        const json = result[resp['category']][i];
                                        const p = $.create('p');
                                        $(p).inner(`${json['title']} <input>`)
                                        modal.select('.list-modal').append(p, 'child')
                                    }
                                }
                            })
                        }
                    }
                    console.log(resp)
                    // const tr = $.create('tr');
                    // for (const listDataKey in listData) {
                    //     const th = $.create('th');
                    //     $(th).inner(listData[listDataKey], true);
                    //     $(tr).append(th)
                    // }
                    // $(`section#${res.append} tbody`).append(tr, 'child');
                } catch (error) {

                }
            })
        })
    }

    async function optionBtn({btn, parent, id, url}) {
        const creates = [
            {type: 'remove', bg: 'danger', btn: $.create('button'), ico: 'trash'},
            {type: 'edit', bg: 'main-green', btn: $.create('button'), ico: 'edit'},
            {type: 'save', bg: 'main', btn: $.create('button'), ico: 'save'},
        ]
        const th = $.create('th');
        $(th).className('d-flex ai-center gap-1');
        const view = $.create('btn');
        $(view).className(`view-btn btn bg-primary ripple btn-active t-white px-4 py-2 round-1`);
        $(view).inner('<i class="fas fa-eye"></i>')
        for (let i = 0; i < creates.length; i++) {
            $(creates[i]['btn']).className(`${creates[i]['type']}-btn btn ${creates[i]['type'] === 'save' ? 'd-none' : ''} bg-${creates[i]['bg']} ripple btn-active t-white px-4 py-2 round-1`);
            $(creates[i]['btn']).inner(`<i class="fas fa-${creates[i]['ico']}"></i>`)
            $(th).append(creates[i]['btn'], 'child');
            if (url.get.search('order') > 0) {
                $(th).append(view, 'child')
            }
            let ids = {
                service: 0,
            }
            switch (creates[i]['type']) {
                case 'save': {
                    $(creates[i]['btn']).on('click', async () => {
                        let list = {};
                        parent.selectAll('[data-type]').each(type => {
                            let attr = $(type).getattr('get', false, true);
                            if (attr === 'position' || attr === 'measurement' || attr === 'category' || attr === 'company') {
                                list[$(type).getattr('get', false, true)] = ids.service;
                                const inp = $(type).select('p.form-control').text();
                                $(type).inner(inp)
                            } else {
                                list[$(type).getattr('get', false, true)] = $(type).select('input').val();
                                const inp = $(type).select('input').val();
                                $(type).inner(inp)
                            }
                        })
                        $.post({
                            url: url.update + id + '/',
                            data: JSON.stringify(list),
                            dataType: {
                                "Content-Type": "application/json"
                            }
                        })
                    })
                    break;
                }
                case 'edit': {
                    $(creates[i]['btn']).on('click', async () => {
                        $(th).select('.save-btn').removeClass('d-none');
                        $(th).select('.edit-btn').addClass('d-none');
                        parent.selectAll('[data-type]').each(type => {
                            const attr = $(type).getattr('type', false, true)
                            if (attr !== 'select') {
                                $(type).inner(`<input placeholder="" type="${attr}" autocomplete="off" value="${$(type).text()}" class="fw-bold t-dark t-center w-100 form-control">`)
                            }
                            switch (attr) {
                                case 'select': {
                                    $(type).addClass('select-item')
                                    $(type).inner(`<p class="form-control">${$(type).text()}</p><button class="get"><i class="fas fa-angle-down"></i></button>
                                            <div class="lists"></div>`);
                                    $(type).select('.get').on('click', function () {
                                        $.get({
                                            url: $(type).getattr('url', false, true),
                                            success: (res) => {

                                                $(type).select('.lists').inner(' ')
                                                for (let i = 0; i < res.length; i++) {
                                                    const json = res[i];
                                                    $(type).select('.lists').inner(`<p class="item">${json['title']}</p>`, true);
                                                    $(type).select('p.item').on('click', async () => {
                                                        ids.service = json['id'];
                                                        $(type).select('p.form-control').inner($(type).select('p.item').text())
                                                        $(type).select('.lists').toggleClass('show')
                                                    })
                                                }
                                                $(type).select('.lists').property('--h', $(type).select('.lists').h('scroll') + 'px')
                                                $(type).select('.lists').toggleClass('show');
                                            }
                                        })
                                    })
                                    break;
                                }
                            }
                        })
                    })
                    break;
                }
                case 'remove': {
                    $(creates[i]['btn']).on('click', async () => {
                        await parent.remove();
                        await $.post({
                            url: url.delete + id + '/',
                            credentials: 'include'
                        })
                    })
                }
            }
            $(view).on('click', async () => {
                $.get({
                    url: '/order/item/' + id + '/',
                    success: async () => {
                        const modal = $('#view-modal');
                        modal.select('h3')
                        await modal.addClass('show');
                    }
                })
            })
        }
        parent.append(th, 'child');
    }

// todo
    $.get({
        url: '/zametka/',
        success: async (res) => {
            const resp = res.sort((a, b) => {
                return b['id'] - a['id'];
            })
            for (let i = 0; i < 5; i++) {
                const tr = $.create('tr');
                await $(tr).inner(`<th>${i + 1}</th><th class="t-left">${resp[i]['text']}</th>`);
                await $('.todo-body').append(tr, 'child');
            }
        }
    })
    const todoSection = $('section#todo');
    $.get({
        url: '/zametka/',
        success: async (res) => {
            for (let i = 0; i < res.length; i++) {
                const li = $.create('li');
                await $(li).className(`t-dark fw-s-bold py-3 px-2 ${res[i]['checked'] === true ? 'd-flex jc-between ai-center' : ''}`);
                await $(li).inner(`${res[i]['text']} ${res[i]['checked'] === true ? `<i
                                        class="fas fa-check-square t-green"></i></li>` : ''}`)
                if (res[i]['checked'] !== true) {
                    await todoSection.select('#todo-list').append(li, 'child');
                } else {
                    await todoSection.select('#end-todo-list').append(li, 'child')
                }
                $(li).on('click', async () => {
                    let delCheck = false;
                    await $(li).toggleClass('checked');
                    await $.post({
                        url: '/zametka/update/' + res[i]['id'] + '/',
                        data: JSON.stringify({
                            text: res[i]['text'],
                            checked: true
                        }),
                        dataType: {
                            "Content-Type": "application/json"
                        }
                    })
                    if ($(li).hasClass('checked')) {
                        $(window).on('keydown', async (e) => {
                            switch (e.keyCode) {
                                case 46: {
                                    await $.post({
                                        url: '/zametka/delete/' + res[i]['id'] + '/',
                                        credentials: 'include'
                                    })
                                    await $(li).remove();
                                }
                            }
                        })
                    }
                })
            }
            todoSection.select('.add-todo').on('click', async () => {
                const todoIn = todoSection.select('#todo-text');
                if (todoIn.val() !== '') {
                    await todoSection.select('#todo-list').inner(`<li class="t-dark fw-s-bold py-3 px-2">${todoIn.val()}</li>`, true);
                    await $.post({
                        url: '/zametka/create/',
                        data: JSON.stringify({
                            text: todoIn.val(),
                            checked: false
                        }),
                        dataType: {
                            "Content-Type": "application/json"
                        }
                    })
                    await todoIn.val('');
                }
            })
        }
    })

    async function clearCache() {
        await $('input[name=search]').val('')
    }
})
