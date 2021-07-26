let c1 = document.getElementById('statistic-1').getContext('2d');
let c2 = document.getElementById('statistic-2').getContext('2d');
let c3 = document.getElementById('statistic-3').getContext('2d');
$(document).fsReady(function () {
    $.get({
        url: '/linegraph/month/',
        success: (res) => {
            let monthDate = [], monthValue = [];
            for (let js in res.id) {
                monthValue.push(res.id[js])
                monthDate.push(js)
            }
            new Chart(c1, {
                type: 'line',
                data: {
                    labels: monthDate,
                    datasets: [{
                        label: "Xodimlar",
                        data: monthValue,
                        backgroundColor: [
                            'rgba(0, 202, 128, .5)'
                        ],
                        borderColor: [
                            '#00ca80'
                        ],
                        borderWidth: 2
                    }]
                }
            });
        }
    })
    $(window).on('load', function () {
        $.timeout(function () {
            new Chart(c3, {
                type: 'line',
                data: {
                    labels: ['kiruvchilar', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: "Ma'lumot",
                        data: [20, 19, 50, 50, 20, 150],
                        backgroundColor: [
                            'rgba(0, 202, 128, .5)'
                        ],
                        borderColor: [
                            '#00ca80'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            new Chart(c2, {
                type: 'bar',
                data: {
                    labels: ['kiruvchilar', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: "Ma'lumot",
                        data: [20, 19, 50, 50, 20, 150],
                        backgroundColor: [
                            'rgba(0, 202, 128, .5)'
                        ],
                        borderColor: [
                            '#00ca80'
                        ],
                        borderWidth: 2
                    }]
                }
            });
        }, 600)
    })
})