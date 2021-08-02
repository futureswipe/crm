$(document).fsReady(async () => {
    const time = $('.time-control');
    const modalOption = $('#option-modal');

    // time
    async function timeFunc() {
        await timeControl(async (math) => {
            const date = `${math.date}.${math.month}.${math.year}`;
            const times = `${math.hours}.${math.minutes}.${math.seconds}`;
            time.inner(`<span>${date}</span> <span>${times}</span>`)
        })
    }

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
        await $.timeout(async () => {
            $('.animated').addClass('animate');
        }, 500)
        await timeFunc();
        await $.interval(async () => {
            await timeFunc();
        }, 1000)
    })

    // table list
    for (let i = 0; i < options.ajax_data.length; i++) {
        const ajax = options.ajax_data[i];
        const url = ajax['url'];
        const tableHeads = ajax['head'];
        const path = ajax['path'];
        await table(tableHeads, path.select('thead'));
        await create(url, path);
    }

    // navbar menus
    for (let i = 0; i < options.navbar.length; i++) {
        const navbar = options.navbar[i];
        await $('nav').inner(`<div class="item ${navbar['active'] === true ? 'active' : ''}"><a href="${navbar['href']}" class="link">
            <span><i class="fas fa-${navbar['icon']}"></i></span>
            <p>${navbar['title']}</p>
        </a></div>`, true);
    }

    // nav items functions
    const navItems = $('.sidebar nav .item');
    navItems.on('click', async function (e) {
        e.preventDefault();
        await router($(this).select('a').getattr('href'))
    })

    // router
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