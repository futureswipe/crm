$(document).fsReady(async () => {
    let c1 = document.getElementById('month-line').getContext('2d');
    let c2 = document.getElementById('day-line').getContext('2d');
    await graph(c1, '/linegraph/month/')
    await graph(c2, '/linegraph/days/')

    async function graph(object, urk) {
        $.get({
            url: urk,
            success: (res) => {
                let dataMonth = [], dataDate = [];
                for (const resKey in res['id']) {
                    dataMonth.push(resKey);
                    dataDate.push(res['id'][resKey]);
                }
                new Chart(object, {
                    type: 'line',
                    data: {
                        labels: dataMonth,
                        datasets: [{
                            label: "Xodimlar",
                            data: dataDate,
                            backgroundColor: [
                                'rgba(0, 202, 128, .5)'
                            ],
                            borderColor: '#00ca80',
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
            }
        })
    }
})