$(document).fsReady(async () => {
    const time = $('.time-control');
    const modalOption = $('#option-modal');
    const navItems = $('.sidebar nav .item');

    // async function timeFunc() {
    //     await timeControl(async (math) => {
    //         const date = `${math.date}.${math.month}.${math.year}`;
    //         const time = `${math.hours}.${math.minutes}.${math.seconds}`;
    //         time.inner(`<span>${date}</span> <span>${time}</span>`)
    //     })
    // }
    //
    // await timeFunc();
    // await $.interval(async () => {
    //     await timeFunc();
    // }, 1000)
    for (let i = 0; i < options.ajax_data.length; i++) {
        const ajax = options.ajax_data[i];
        const url = ajax['url'];
        const tableHeads = ajax['head'];
        const path = ajax['path'];
        await create(url, path);
    }
})