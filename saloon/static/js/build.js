async function remove(url, data) {
    await ajax('post', url, data)
}

async function edit({objects, data, key}) {
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        object.on('keyup, change', async () => {
            data[key[i]] = objects.val();
            console.log(data)
        })
    }
}

async function alert(info) {
    alert.removeClass('show');
    const alert = $('.alert-info');
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
                    if (key !== 'id') {
                        const th = $.create('th');
                        const isNum = (key === 'price' || key === 'priceall' ||
                            key === 'count' || key === 'residue');
                        const isSel = (key === 'measurement' || key === 'position');
                        const isDate = key === 'birthday';
                        $(th).inner(json[key])
                        $(tr).append(th, 'child');
                        list.push({
                            type: isNum ? 'number' : isDate ? 'date' :
                                isSel ? 'select' : 'text',
                            url: key === 'position' ? '/service/' : '',
                            key: key,
                        });
                        child.push(th);
                    }
                }
                array.push({
                    path: path,
                    url: url,
                    parent: tr,
                    lists: list,
                    child: child,
                })
                path.select('tbody').append(tr, 'child');
            }
            await control(array)
        }
    })
}

async function control(array) {
    const modal = $('option-modal');
    for (let i = 0; i < array.length; i++) {
        const object = array[i];
        const cog = $.create('button');
        const remove = $.create('button');
        const th = $.create('th');
        $(th).className('d-flex gap-x-2')
        $(cog).className('btn option');
        $(remove).className('btn remove bg-danger');
        $(cog).inner('<i class="fas fa-cog"></i>');
        $(remove).inner('<i class="fas fa-trash"></i>');
        $(th).append(cog, 'child');
        $(th).append(remove, 'child');
        $(object['parent']).append(th, 'child');
        $(cog).on('click', async () => {
            await modalControl('add', modal);
            console.log(object)
            for (let f = 0; f < object['lists'].length; f++) {
                const listJson = object['lists'][f];
                const inputGroup = $.create('div');
                $(inputGroup).className('input-group');
                if (listJson['url']) {
                    const select = $.create('select');
                    $(inputGroup).append(select, 'child');
                    await ajax({
                        method: 'get',
                        url: listJson['url'],
                        success: async (res) => {
                            $(select).selectAll('option').remove()
                            for (let d = 0; d < res.length; d++) {
                                const resJson = res[d];
                                const option = $.create('option');
                                $(option).inner(resJson['title']);
                                option.id = resJson['id'];
                                $(select).append(option, 'child');
                            }
                            // await edit({
                            //     data: list,
                            //     key: listJson['key'],
                            //     objects: $(inputGroup).select('select')
                            // })
                        }
                    })
                } else {
                    // $(inputGroup).inner(`<input autocomplete="off"
                    // value="${$(listJson['child'][f]).text()}" type="${listJson['type']}">`)
                    // await edit({
                    //     data: list,
                    //     key: listJson['key'],
                    //     objects: $(inputGroup).select('input')
                    // })
                }
            }
        })
    }
}

async function modalControl(mod, modal) {
    switch (mod) {
        case 'add': {
            modal.style({
                display: 'fixed'
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