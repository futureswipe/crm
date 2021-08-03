async function remove(url, data) {
    await ajax('post', url, data)
}

async function edit({objects, data, key, btn, parent}) {
    for (let i = 0; i < objects.length; i++) {
        objects[i].on('keyup, change', async () => {
            data[key[i]] = objects[i].val();
        })
    }
    btn.on('click', async () => {
        for (let i = 0; i < key.length; i++) {
            for (const dataKey in data) {
                if (dataKey === key[i]) {
                    $(parent[i]).inner(data[dataKey]);
                }
            }
        }
        await modalControl(btn.parent().parent());
    })
}

async function alert(info) {
    const alert = $('.alert-info');
    alert.removeClass('show');
    alert.inner(info);
    alert.addClass('show');
}

async function save(data, url) {
    await ajax('post', url, data);
}

async function timeControl(success = async () => {
}) {
    const list = {
        hour: new Date().getHours(),
        minutes: new Date().getMinutes(),
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        seconds: new Date().getSeconds(),
    }
    const math = {
        hours: list.hour < 10 ? Number('0' + list.hour) : list.hour,
        minutes: list.minutes < 10 ? Number('0' + list.minutes) : list.minutes,
        date: list.date < 10 ? Number('0' + list.date) : list.date,
        month: list.month < 10 ? Number('0' + list.month) : list.month,
        year: list.year < 10 ? Number('0' + list.year) : list.year,
        seconds: list.seconds < 10 ? Number('0' + list.seconds) : list.seconds,
    }
    await success(math);
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

async function ajax({
                        method, url, data, success = async () => {
    }
                    }) {
    switch (method) {
        case 'get': {
            await fetch(url, {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            }).then(res => res.json()).then(res => {
                success(res);
            })
            break;
        }
        case 'post': {
            await fetch(url, {
                method: "POST", body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            }).then(res => {
                success(res.json());
            })
        }
    }
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

async function create(url, path) {
    await ajax({
        method: 'get',
        url: url['get'],
        success: async (res) => {
            const response = res.sort((a, b) => b['id'] - a['id']);
            const array = [];
            for (let i = 0; i < response.length; i++) {
                let list = [], child = [];
                const json = response[i];
                const tr = $.create('tr');
                $(tr).inner(`<th>${i + 1}</th>`);
                for (const key in json) {
                    if (key !== 'id' && key !== 'created') {
                        const th = $.create('th');
                        const isNum = (key === 'price' || key === 'priceall' ||
                            key === 'count' || key === 'residue');
                        const isSel = (key === 'measurement' || key === 'position' || key === 'category');
                        const isDate = key === 'birthday';
                        $(th).inner(json[key])
                        child.push(th);
                        $(tr).append(th, 'child');
                        list.push({
                            type: isNum ? 'number' : isDate ? 'date' :
                                isSel ? 'select' : 'text',
                            url: key === 'position' ? '/service/' : key === 'category' ? '/service/' :
                                key === 'measurement' ? '/unit/' : '',
                            key: key,
                        });
                    }
                }
                array.push({
                    path: path,
                    url: url,
                    lists: list,
                    child: child,
                })
                await control(array, tr)
                path.select('tbody').append(tr, 'child');
            }
        }
    })
}

async function control(array, parent) {
    let addArray = [];
    const modal = $('#option-modal');
    const cog = $.create('button');
    const remove = $.create('button');
    const th = $.create('th');
    $(th).className('d-flex gap-x-2');
    $(cog).className('option btn');
    $(remove).className('remove bg-danger btn');
    $(cog).inner('<i class="fas fa-cog"></i>');
    $(remove).inner('<i class="fas fa-trash"></i>');
    $(th).append(cog, 'child');
    $(th).append(remove, 'child');
    $(parent).append(th, 'child');
    for (let i = 0; i < array.length; i++) {
        const json = array[i];
        const objects = [];
        const lists = {};
        const keys = [];
        $(cog).on('click', async () => {
            modal.select('.card-body').inner('');
            for (let j = 0; j < json['lists'].length; j++) {
                const list = json['lists'][j];
                if (list['type'] === 'select') {
                    const select = $.create('select');
                    $(select).className('form-control');
                    await ajax({
                        method: 'get',
                        url: list['url'],
                        success: async (responsive) => {
                            $(select).selectAll('option').remove();
                            for (let j = 0; j < responsive.length; j++) {
                                const option = $.create('option');
                                $(option).attr({
                                    value: responsive[j]['id'],
                                })
                                $(option).inner(responsive[j]['title']);
                                $(select).append(option, 'child')
                            }
                        }
                    })
                    keys.push(list['key']);
                    lists[list['key']] = select.options[select.selectedIndex].value;
                    objects.push($(select));
                    modal.select('.card-body').append(select, 'child');
                } else {
                    const input = $.create('input');
                    $(input).attr({
                        autocomplete: 'off',
                        type: list['type'],
                        value: $(json['child'][j]).text(),
                        class: 'form-control'
                    })
                    keys.push(list['key']);
                    lists[list['key']] = $(input).val()
                    objects.push($(input))
                    modal.select('.card-body').append(input, 'child');
                }
            }
            await edit({
                objects: objects,
                data: lists,
                key: keys,
                btn: modal.select('.card-footer .btn'),
                parent: json['child']
            })
            await modalControl('add', modal)
        })
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