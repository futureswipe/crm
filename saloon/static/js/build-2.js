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
    const removeBtn = $.create('button');
    const cog = $.create('button');
    const th = $.create('th');
    await $(removeBtn).className('bg-danger btn');
    await $(cog).className('option btn');
    await $(th).className('d-flex gap-x-2')
    $(cog).inner('<i class="fa fa-cog"></i>')
    $(removeBtn).inner('<i class="fa fa-trash"></i>')
    $(th).append(cog, 'child')
    $(th).append(removeBtn, 'child')
    parent.append(th, 'child')
    $(cog).on('click', async () => {
        const body = modal.select('.card-body');
        body.inner('');
        const array = [];
        const keys = [];
        const lists = {};
        const objs = [];
        const ths = [];
        const listEdit = {};
        for (let i = 0; i < list.length; i++) {
            const json = list[i];
            if (json['type'] === 'select') {
                const select = $.create('select');
                $(select).className('form-control');
                await ajax({
                    method: 'get',
                    url: json['url'],
                    success: async (res) => {
                        console.log(res)
                        for (let j = 0; j < res.length; j++) {
                            const option = $.create('option');
                            $(option).inner(res[j]['title']);
                            $(option).attr({
                                value: res[j]['id']
                            })
                            $(select).append(option, 'child')
                        }
                    }
                })
                lists['value'] = select.options[select.selectedIndex].value
                objs.push(select);
                modal.select('.card-body').append(select, 'child');
            } else {
                const input = $.create('input');
                $(input).attr({
                    type: json['type'],
                    placeholder: json['type'],
                    class: 'form-control',
                    value: $(json['th']).text()
                })
                body.append(input, 'child')
                objs.push(input)
                lists['value'] = $(json['th']).text()
            }
            keys.push(json['key'])
            ths.push(json['th'])
            lists['child'] = objs;
            lists['key'] = keys;
            lists['url'] = json['urls'];
            lists['id'] = json['id'];
        }
        for (let i = 0; i < keys.length; i++) {
            listEdit[keys[i]] = ''
        }
        lists['list'] = listEdit;
        lists['th'] = ths;
        array.push(lists)
        await edit(array);
        await modalControl('add', modal)
    })
    $(removeBtn).on('click', async () => {
        parent.remove();
        await remove(list[0]['urls']['delete'] + list[0]['id'] + '/');
    })
}

let listsAr = {};
let saveEdit = [];

async function edit(array) {
    for (let i = 0; i < array.length; i++) {
        const json = array[i];
        console.log(json)
        listsAr['obj'] = json['th'];
        listsAr['url'] = json['url']['update']
        listsAr['id'] = json['id']
        listsAr['keys'] = json['key']
        for (let j = 0; j < json['key'].length; j++) {
            const keys = json['key'][j];
            json['list'][keys] = $(json['child'][j]).val()
            listsAr['data'] = json['list']
            $(json['child'][j]).on('keyup, change', async () => {
                console.log(json['list'])
                json['list'][json['key'][j]] = $(json['child'][j]).val()
                listsAr['data'] = json['list'];
            })
        }
    }
    saveEdit.push(listsAr)
}

$('#option-modal .btn').on('click', async () => {
    for (let i = 0; i < saveEdit[0]['obj'].length; i++) {
        const obj = saveEdit[0]['obj'][i];
        for (const key in saveEdit[0]['data']) {
            if (saveEdit[0]['keys'][i] === key)
                $(obj).inner(saveEdit[0]['data'][key])
        }
    }
    await save(saveEdit[0]['data'], saveEdit[0]['url'] + saveEdit[0]['id'] + '/')
    await modalControl('remove', $('#option-modal'))
})

async function remove(url) {
    $.post({
        url: url,
        credentials: 'include'
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
                headers: {"Content-Type": "application/json"},
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
    await ajax({
        method: 'post',
        url: url,
        data: data
    })
}