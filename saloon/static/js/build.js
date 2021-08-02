async function remove(url, data) {
    await ajax('post', url, data)
}

async function edit(values, objects, data, key) {
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        object.on('keyup, change', async () => {
            data[key[i]] = objects.val();
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

async function router(id, button, section) {
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
                await $(section[0]).addClass('d-none');
                await $(`${section[0]}${router}`).removeClass('d-none');
                if (router === '#dashboard') {
                    await button.addClass('d-none')
                } else {
                    await button.removeClass('d-none')
                }
            } else {
                workWithOut = false;
            }
        }
    })
    if (workWithOut === false) {
        await $(`${section[0]}#dashboard`).addClass('d-none');
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

async function create(url, path) {
    await ajax({
        method: 'get',
        url: url['get'],
        success: async (res) => {
            const response = res.sort((a, b) => b['id'] - a['id']);
            const list = [];
            const array = [];
            for (let i = 0; i < response.length; i++) {
                const json = response[i];
                const tr = $.create('tr');
                for (const key in json) {
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
                        url: key === 'position' ? '/service/' : ''
                    });
                }
                array.push({
                    path: path,
                    url: url,
                    parent: tr,
                })
            }
            await control(array, list)
        }
    })
}

async function control(array, list) {
    const modal = $('option-modal');
    for (let i = 0; i < array.length; i++) {
        const object = array[0];
        const cog = $.create('button');
        $(cog).className('btn option');
        $(cog).inner('<i class="fal fa-cog"></i>');
        object['parent'].append(cog, 'child');
        $(cog).on('click', async () => {
            await modalControl('add', modal);
            for (let f = 0; f < list.length; f++) {
                const listJson = list[i];
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
                        }
                    })
                } else {
                    $(inputGroup).inner(`<input autocomplete="off"
                    value="${$(object['parent'][f]).text()}" type="${listJson['type']}">`)
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