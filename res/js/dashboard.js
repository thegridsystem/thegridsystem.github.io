var ctx = document.getElementById("energyGen");
var energyGen = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(76, 175, 80, 1)',
                'rgba(156, 39, 176, 1)',
                'rgba(255, 235, 59, 1)',
                'rgba(0, 150, 136, 1)',
                'rgba(33, 150, 243, 1)',
                'rgba(57, 73, 171, 1)'
            ]
        }]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var ctx = document.getElementById("energyGenLive");
var energyGenLive = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["-5", "-4", "-3", "-2", "-1", "Now"],
        datasets: [{
            label: 'Gigawatt generation',
            data: [Math.random() + 10.5, Math.random() + 10.5, Math.random() + 10.5, Math.random() + 10.5, Math.random() + 10.5, Math.random() + 10.5],
            borderColor: [
                'rgba(57, 73, 171, 1)'
            ],
            backgroundColor: [
                'rgba(0, 0, 0, 0.0)'
            ]
        }]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Gigawatt output'
                },
                ticks: {
                    min: 5,
                    max: 15
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'minutes'
                }
            }]
        }
    }
});

setInterval(function() {
    energyGenLive.data.datasets[0].data[0] = energyGenLive.data.datasets[0].data[1];
    energyGenLive.data.datasets[0].data[1] = energyGenLive.data.datasets[0].data[2];
    energyGenLive.data.datasets[0].data[2] = energyGenLive.data.datasets[0].data[3];
    energyGenLive.data.datasets[0].data[3] = energyGenLive.data.datasets[0].data[4];
    energyGenLive.data.datasets[0].data[4] = energyGenLive.data.datasets[0].data[5];
    energyGenLive.data.datasets[0].data[5] = Math.random() + 10.5;
    energyGenLive.update();
}, 60000);

$('.grid').masonry({
    // set itemSelector so .grid-sizer is not used in layout
    itemSelector: '.grid-item',
    // use element for option
    columnWidth: '.grid-sizer',
    percentPosition: true
})

$(function() {
    $.material.init();
});
