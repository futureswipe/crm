let c1 = document.getElementById('statistic-1').getContext('2d');
$(document).fsReady(function () {
    $.get({
        url: '/linegraph/days/',
        success: (res) => {
            console.log(res)
            new Chart(c1, {
                type: 'line',
                data: [{
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
                }],
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Chart.js Line Chart - Cubic interpolation mode'
                        },
                    },
                    interaction: {
                        intersect: false,
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Value'
                            },
                            suggestedMin: -10,
                            suggestedMax: 200
                        }
                    }
                }
            })
        }
    })
})