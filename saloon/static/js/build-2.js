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
                for (const key in json) {
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
                        id: json['id']
                    })
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
    // $(cog).on('click', async () => {
    //     const body = modal.select('.card-body');
    //     body.inner('');
    //     for (let i = 0; i < list.length; i++) {
    //         const json = list[i];
    //         if (json['type'] === 'select') {
    //             console.log(true)
    //         } else {
    //             console.log(false)
    //         }
    //     }
    // })
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
        case 'get': {
            await fetch(url, {method: method}).then(res => res.json())
                .then(res => {
                    success(res)
                })
        }
    }
}