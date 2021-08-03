async function alert(info) {
    const alert = $('.alert-info');
    alert.removeClass('show');
    alert.inner(info);
    alert.addClass('show');
}

async function router(id) {
    await $.storage({
        data: id,
        name: 'router',
        method: 'set'
    })
    let workWithOut = false;
    await $.storage({
        name: 'router',
        method: 'get',
        success: async (router) => {
            if (router) {
                workWithOut = true;
                const navItem = $('.sidebar nav .item');
                navItem.each(item => {
                    const attr = $(item).select('a').getattr('href');
                    if (attr === router) {
                        navItem.removeClass('active')
                        $(item).addClass('active')
                    }
                })
                await $(`section`).addClass('d-none');
                await $(`section${router}`).removeClass('d-none');
                const add = $('.side-main .add');
                add.setattr('data-target', router + '-modal')
                if (router === '#dashboard') {
                    await add.addClass('d-none')
                } else {
                    await add.removeClass('d-none')
                }
            } else {
                workWithOut = false;
            }
        }
    })
    if (workWithOut === false) {
        await $(`section#dashboard`).addClass('d-none');
    }
}

async function create(url, path) {
    await ajax({
        method: 'get',
        url: url['get'],
        success: async (res) => {
            const filter = res.sort((a, b) => b['id'] - a['id']);
            for (let i = 0; i < filter.length; i++) {
                const json = filter[i];
                const list = [];
                const tr = $.create('tr');
                $(tr).inner(`<th>${i + 1}</th>`)
                for (const key in json) {
                    if (key !== 'id' && key !== 'created') {
                        const th = $.create('th');
                        const isNum = (key === 'price' || key === 'priceall' ||
                            key === 'count' || key === 'residue');
                        const isSel = (key === 'measurement' || key === 'position' || key === 'category');
                        const isDate = key === 'birthday';
                        $(th).inner(json[key]);
                        $(tr).append(th, 'child');
                        list.push({
                            type: isNum ? 'number' : isDate ? 'date' :
                                isSel ? 'select' : 'text',
                            url: key === 'position' ? '/service/' : key === 'category' ? '/service/' :
                                key === 'measurement' ? '/unit/' : '',
                            key: key,
                            urls: url,
                            id: json['id'],
                            th: th
                        })
                    }
                }
                await control(list, $(tr));
                path.select('tbody').append(tr, 'child');
            }
        }
    })
}

async function table(array, path) {
    const tr = $.create('tr');
    for (let i = 0; i < array.length; i++) {
        const jsonList = array[i];
        const th = $.create('th');
        $(th).inner(jsonList);
        $(th).className(i === 0 ? 'min' : '')
        $(tr).append(th, 'child');
    }
    $(tr).inner('<th class="min"><i class="fas fa-ellipsis-h"></i></th>', true)
    path.append(tr, 'child');
}

async function control(list, parent) {
    const modal = $('#option-modal');
    const remove = $.create('button');
    const cog = $.create('button');
    const th = $.create('th');
    await $(remove).className('bg-danger btn');
    await $(cog).className('option btn');
    await $(th).className('d-flex gap-x-2')
    $(cog).inner('<i class="fa fa-cog"></i>')
    $(remove).inner('<i class="fa fa-trash"></i>')
    $(th).append(cog, 'child')
    $(th).append(remove, 'child')
    parent.append(th, 'child')
    $(cog).on('click', async () => {
        const body = modal.select('.card-body');
        body.inner('');
        const array = [];
        const keys = [];
        const lists = {};
        const objs = [];
        for (let i = 0; i < list.length; i++) {
            const json = list[i];
            if (json['type'] === 'select') {
                const select = $.create('select');
                $(select).inner('');
                $(select).className('form-control');
                body.append(select, 'child')
                lists['value'] = select.options[select.selectedIndex].value;
                objs.push(select)
            } else {
                const input = $.create('input');
                $(input).attr({
                    type: json['type'],
                    placeholder: json['type'],
                    id: json['id'],
                    class: 'form-control',
                    value: $(json['th']).text()
                })
                body.append(input, 'child')
                objs.push(input)
                lists['value'] = $(json['th']).text()
            }
            lists['child'] = objs;
            keys.push(json['key'])
            lists['key'] = keys;
            lists['url'] = json['urls'];
            lists['id'] = json['id'];
        }
        array.push(lists)
        await edit(array, modal.select('.btn'));
        await modalControl('add', modal)
    })
}

async function edit(array, btn) {
    const list = {};
    for (let i = 0; i < array.length; i++) {
        const json = array[i];
        for (let j = 0; j < json['key'].length; j++) {
            const keys = json['key'][j];
            list[keys] = $(json['child'][j]).val()
        }
        for (let j = 0; j < json['child'].length; j++) {
            $(json['child'][j]).on('keyup', async () => {
                list[json['key'][j]] = $(json['child'][j]).val()
            })
        }
        btn.on('click', async () => {
            console.log(array)
            await save(list, json['url']['update'] + json['id'] + '/');
        })
    }
}

async function remove(url) {
    await ajax({
        url: url,
        method: 'post',
    })
}

async function ajax({
                        url, method, data, success = async () => {
    }
                    }) {
    switch (method) {
        case 'post': {
            await fetch(url, {
                method: "POST", body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            })
            break;
        }
        case 'get': {
            await fetch(url, {method: "GET"}).then(res => res.json())
                .then(res => {
                    success(res)
                })
            break;
        }
    }
}

async function modalControl(mod, modal) {
    switch (mod) {
        case 'add': {
            modal.style({
                display: 'flex'
            })
            await $.timeout(async () => {
                modal.addClass('show')
            }, 250)
            break;
        }
        case 'remove': {
            modal.removeClass('show')
            await $.timeout(async () => {
                modal.style({
                    display: 'none'
                })
            }, 250)
            break;
        }
    }
}

async function save(data, url) {
    console.log(data, url);
    await ajax({
        method: 'post',
        url: url,
        data: data
    })
}