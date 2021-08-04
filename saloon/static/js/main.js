$(document).fsReady(async () => {
    for (let i = 0; i < options.navbar.length; i++) {
        const navbar = options.navbar[i];
        await $('nav').inner(`<div class="item ${navbar['active'] === true ? 'active' : ''}"><a href="${navbar['href']}" class="link">
            <span><i class="fas fa-${navbar['icon']}"></i></span>
            <p>${navbar['title']}</p>
        </a></div>`, true);
    }
    const navItems = $('.sidebar nav .item');
    await $.storage({
        method: 'get',
        name: 'router',
        success: async (res) => {
            if (res !== '') {
                await router(res);
                navItems.each(item => {
                    const attr = $(item).select('a').getattr('href');
                    if (attr === res) {
                        navItems.removeClass('active')
                        $(item).addClass('active')
                    }
                })
            }
        }
    })
    $(window).on('load', async () => {
        // loading
        const loading = $('.loading')
        await $.timeout(async () => {
            await loading.style({
                opacity: 0
            })
            await $.timeout(async () => {
                await loading.remove();
            }, 500)
        }, 500)
        await timeControl()
    })
    await $.interval(async () => {
        await timeControl()
        let map = ['/product/', '/service/', '/customer/'];
        for (let i = 0; i < map.length; i++) {
            $.get({
                url: map[i],
                success: async (res) => {
                    $('.dashboard .col-4').nth(i).select('h3').inner(res.length)
                }
            })
        }
    }, 1000)

    async function timeControl() {
        await timeManager(res => {
            $('.time-control').inner(`<span>${res.date}.${res.month}.${res.year}</span> <span>${res.hours}:${res.minutes}:${res.seconds}</span>`)
        })
    }

    for (let i = 0; i < options.ajax_data.length; i++) {
        const ajax = options.ajax_data[i];
        await create(ajax['url'], ajax['path'])
        await table(ajax['head'], ajax['path'].select('thead'))
    }
    for (let i = 0; i < options.modal.length; i++) {
        const jsonData = options.modal[i];
        let list = {};
        for (let j = 0; j < jsonData.data.length; j++) {
            const json = jsonData.data[j];
            const id = `${jsonData['name']}-${json['id']}`;
            if (json['type'] !== 'select') {
                const inG = $.create('div');
                $(inG).className('input-group')
                $(inG).inner(`<input autocomplete="off" id="${id}" type="${json['type']}" class="form-control" placeholder="${json['placeholder']}"><label for="${id}"></label>`);
                jsonData['path'].select('.card-body').append(inG, 'child')
                $(inG).select('input').on('keyup, change', () => {
                    list[json['id']] = (json['id'] === 'residue' || json['id'] === 'price'
                        || json['id'] === 'priceall' || json['id'] === 'count')
                        ? Number($(inG).select('input').val())
                        : $(inG).select('input').val();
                })
            } else {
                const select = $.create('select');
                $(select).attr({
                    name: 'select',
                    id: id
                })
                $(select).className('form-control')
                await $.get({
                    url: json['get'],
                    success: async (res) => {
                        for (let k = 0; k < res.length; k++) {
                            const resJ = res[k];
                            $(select).inner(`<option value="${resJ['id']}">${resJ[json['searchBy']]}</option>`, true)
                            list[json['id']] = Number(select.options[select.selectedIndex].value)
                        }
                    }
                })
                jsonData['path'].select('.card-body').append(select, 'child')
                $(select).on('change', async () => {
                    list[json['id']] = Number($(select).val());
                })
            }
        }
        jsonData['path'].select('.btn').on('click', async () => {
            if (jsonData['path'].selectAll('input').find(a => a.value !== '')
                || jsonData['path'].selectAll('select').find(a => a.options[a.selectedIndex].value)) {
                // window.onbeforeunload = function() {
                //     return "Did you save your stuff?"
                // }
                const url = {
                    get: `/${jsonData['name']}/`,
                    update: `/${jsonData['name']}/update/`,
                    delete: `/${jsonData['name']}/delete/`,
                }
                console.log({
                    data: list,
                    url: `/${jsonData['name']}/create/`
                })
                await ajax({
                    method: 'post',
                    data: list,
                    url: `/${jsonData['name']}/create/`,
                    success: async (res) => {
                        if (jsonData['name'] === 'order') {
                            $('#order-item-modal').select('h3').inner(res['category'])
                            await ajax({
                                method: "get",
                                url: "/product/",
                                success: async (resp) => {
                                    const result = resp.reduce(function (r, a) {
                                        r[a['category']] = r[a['category']] || [];
                                        r[a['category']].push(a);
                                        return r;
                                    }, Object.create(null));
                                    let lists = [];
                                    $('#order-item-modal .card-body').inner('')
                                    for (let j = 0; j < result[res['category']].length; j++) {
                                        const jsons = result[res['category']][j];
                                        const group = $.create('div');
                                        $(group).className('group');
                                        lists.push(false)
                                        $(group).inner(`<div class="item ai-center d-flex gap-x-2">
                                                         <p>${jsons['title']}</p>
                                                         <input type="text" class="form-control" placeholder="count" autocomplete="off">
                                                         </div>`)
                                        $('#order-item-modal .card-body').append(group, 'child');
                                        $(group).select('.item').on('click', async function (e) {
                                            console.log(e.target)
                                            if (e.target !== $(this).select('input')[0]) {
                                                $(this).toggleClass('select');
                                                lists[j] = !!$(this).hasClass('select');
                                            }
                                        })
                                        $('#order-item-modal .btn').on('click', async () => {
                                            if (lists[j] === true) {
                                                await ajax({
                                                    url: '/order/item/create/',
                                                    method: 'post',
                                                    data: {
                                                        orderid: res['id'],
                                                        product: resp[j]['id'],
                                                        used: Number($(group).select('input').val())
                                                    }
                                                })
                                                await modalControl('remove', $('#order-item-modal'))
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
                await create(url, $(`section#${jsonData['append']}`))
                if (jsonData['name'] === 'order') {
                    await modalControl('add', $('#order-item-modal'));
                }
                await modalControl('remove', jsonData['path'])
            } else {
                jsonData['path'].addClass('not');
                await alertInfo("<i class='far fa-exclamation-triangle'></i> Barchasi To'ldirilmadi!", 'bg-danger')
                await $.timeout(async () => {
                    jsonData['path'].removeClass('not')
                }, 500)
            }
        })
    }
    $('.btn.bar').on('click', async function () {
        $('.sidebar').toggleClass('min');
        if ($('.sidebar').hasClass('min')) {
            $(this).select('svg').style({
                transform: 'rotate(180deg)'
            })
        } else {
            $(this).select('svg').style({
                transform: 'rotate(0)'
            })
        }
    })
    $('.notification-btn').on('click', async function () {
        await ajax({
            method: 'get',
            url: '/birthday/',
            success: async (res) => {
                const notification = $('.notification-list')
                if (!res.length) {
                    await alertInfo("<i class='fal fa-info-circle'></i> Xabarlar mavjud emas")
                } else {
                    $(this).toggleClass('active')
                    notification.inner('');
                    for (let i = 0; i < res.length; i++) {
                        const json = res[i];
                        notification.inner(`
                    <p>Bugun ${json['fullname']}ning tug'ilgan kun</p>
                    <small class="mt-1">${json['phone']}</small>
                    `, true)
                    }
                    notification.toggleClass('show')
                }
            }
        })
    })
    navItems.on('click', async function (e) {
        e.preventDefault();
        await router($(this).select('a').getattr('href'))
    })
})