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
                    await $(tr).inner(`<th class="d-flex ai-center gap-1">
                      <button class="btn ripple d-none btn-active bg-main save-btn t-white px-4 py-2 round-1">
                      <i class="fas fa-save"></i> 
                      </button>
                      <button class="btn ripple btn-active bg-main-green edit-btn t-white px-4 py-2 round-1">
                      <i class="fas fa-edit"></i> 
                      </button>
                      <button class="btn ripple btn-active bg-danger remove-btn t-white px-4 py-2 round-1">
                      <i class="fas fa-trash"></i> 
                      </button>
                      </th>`, true)
                    await response.path.select('tbody').append(tr, 'child');
                    await optionBtn({
                        btn: {
                            remove: $(tr).select('.remove-btn'),
                            edit: $(tr).select('.edit-btn'),
                            save: $(tr).select('.save-btn'),
                        },
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
        const res = webOptions.modal.ajax_data[i];
        for (let f = 0; f < res.data.length; f++) {
            let ids = {
                unit: 0,
                category: 0,
                company: 0
            }
            const json = res.data[f];
            const inGroup = $.create('div');
            $(inGroup).className(json.select === true ? 'input-group select-item relative' : 'input-group relative')
            if (json.select === undefined) {
                $(inGroup).inner(`<label for="${res.name}-${json['id']}" class="absolute"><i class="${webOptions.modal.iconType} fa-${json['icon']}"></i></label>
                                 <input placeholder="${json['placeholder']}" type="${json['type']}" id="${res.name}-${json['id']}" autocomplete="off" class="form-control t-dark fw-bold w-100"> 
                                 `)
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
                            $(pItem).inner(res[j]['title'])
                            $(inGroup).select('.lists').append(pItem, 'child')
                            $(pItem).on('click', () => {
                                ids[json.setTo] = res[j]['id'];
                                $(inGroup).select('p.form-control').inner($(pItem).text())
                                $(inGroup).select('.lists').toggleClass('show')
                            })
                        }
                        $(inGroup).select('.lists').property('--h', $(inGroup).select('.lists').h('scroll') + 'px');
                        $(inGroup).select('.lists').toggleClass('show')
                    }
                })
            })
            res.path.append(inGroup, 'child')
        }
    }

    async function optionBtn({btn, parent, id, url}) {
        btn.remove.on('click', async () => {
            await parent.remove();
            await $.post({
                url: url.delete + id + '/',
                credentials: 'include'
            })
        })
        let ids = {
            service: 0,
        }
        btn.edit.on('click', async () => {
            btn.save.removeClass('d-none');
            btn.edit.addClass('d-none');
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
        btn.save.on('click', async () => {
            let list = {};
            parent.selectAll('[data-type]').each(type => {
                let attr = $(type).getattr('get', false, true);
                if (attr === 'position' || attr === 'measurement' || attr === 'category' || attr === 'company') {
                    list[$(type).getattr('get', false, true)] = ids.service;
                } else {
                    list[$(type).getattr('get', false, true)] = $(type).select('input').val();
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
    }

    async function clearCache() {
        await $('input[name=search]').val('')
    }
})