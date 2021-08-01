$(document).fsReady(async () => {
    $('[data-toggle]').each(toggle => {
        $(toggle).on('click', async () => {
            const attrToggle = $(toggle).getattr('data-toggle');
            const attrTarget = $(toggle).getattr('data-target');
            switch (attrToggle) {
                case 'modal': {
                    await $(attrTarget).style({
                        display: 'flex',
                    })
                    await $.timeout(async () => {
                        await $(attrTarget).addClass('show')
                    }, 250)
                }
            }
        })
    })
    $(window).on('click', async (e) => {
        const modal = $('.modal.show');
        if (e.target === modal[0]) {
            await modal.removeClass('show')
            await $.timeout(async () => {
                await modal.style({
                    display: 'none',
                })
            }, 250)
        }
    })
})