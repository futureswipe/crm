$(document).fsReady(async () => {
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
    })
    for (let i = 0; i < options.ajax_data.length; i++) {
        const ajax = options.ajax_data[i];
        await create(ajax['url'], ajax['path'])
        await table(ajax['head'], ajax['path'].select('thead'))
    }
    for (let i = 0; i < options.navbar.length; i++) {
        const navbar = options.navbar[i];
        await $('nav').inner(`<div class="item ${navbar['active'] === true ? 'active' : ''}"><a href="${navbar['href']}" class="link">
            <span><i class="fas fa-${navbar['icon']}"></i></span>
            <p>${navbar['title']}</p>
        </a></div>`, true);
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
                    console.log(list)
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
            console.log(jsonData);
            await ajax({
                method: 'post',
                data: list,
                url: `/${jsonData['name']}/create/`
            })
            const url = {get: `/${jsonData['name']}/`}
            await create(url, $(`section#${jsonData['append']}`))
            modalControl('remove', jsonData['path'])
        })
    }
    const navItems = $('.sidebar nav .item');
    navItems.on('click', async function (e) {
        e.preventDefault();
        await router($(this).select('a').getattr('href'))
    })
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
})