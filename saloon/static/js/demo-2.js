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