$(document).fsReady(function () {
    let modal = $('.modal');
    $(window).on('keydown', function (e) {
        if (e.keyCode === 27) {
            modal.each(modal => {
                closeModal(modal);
            })
        }
    })
    $(window).on('click', function (e) {
        modal.each(modal => {
            if (e.target === modal) {
                closeModal(modal);
            }
        })
    })
    modal.each(modal => {
        let close = $(modal).selectAll('.close');
        try {

            close.each(close => {
                $(close).on('click', function () {
                    closeModal(modal);
                })
            })
        } catch (error) {
            return error;
        }
    })
    $('[data-toggle]').each(toggle => {
        $(toggle).on('click', function () {
            let toggleAttr = $(toggle).attr('data-toggle');
            let target = $(toggle).attr('data-target');
            if (toggleAttr === 'modal') {
                openModal(target)
            }
        })
    })

    function closeModal(modal) {
        $(modal).removeClass('show')
        $.timeout(function () {
            $(modal).style('display', 'none')
            $('body').removeClass('hidden')
        }, $(modal).css('transition-duration').get('number') * 10)
    }

    function openModal(modal) {
        $('body').addClass('hidden')
        $(modal).style('display', 'block')
        $.timeout(function () {
            $(modal).addClass('show')
        })
    }

    $('.btn').not('.outline').each(fsBtn => {
        if (!$(fsBtn).hasClass('bg-none')) {
            let bg = $(fsBtn).css('background-color').convertColor('rgb', 'rgba', .5);
            $(fsBtn).property('--shadow', bg);
        }
    })
    $('.btn.outline').each(fsBtn => {
        if (!$(fsBtn).hasClass('bg-none')) {
            let bg = $(fsBtn).css('background-color').convertColor('rgb', 'rgba', .5);
            $(fsBtn).property('--outline', $(fsBtn).css('background-color'));
            $(fsBtn).property('--shadow', bg);
            $(fsBtn).style('background', 'none');
        }
    })
    $('.btn.ripple').each(fsBtn => {
        $(fsBtn).on('click', function (e) {
            let x = $(e).x('layer'), y = $(e).y('layer'),
                span = $.create('span');
            $(span).class('ripple')
            $(span).style('left', x + 'px')
            $(span).style('top', y + 'px')
            $(span).property('--size', $(fsBtn).w('offset') + $(fsBtn).h('offset') + 'px')
            $(fsBtn).append(span, 'child')
            $.timeout(function () {
                $(span).remove()
            }, 500)
        })
    })
})