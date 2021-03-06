var myVar;

function timeout() {
    myVar = setTimeout(showPage, 3000);
}
function showPage() {
  document.getElementById("loadcontainer").style.display = "none";
  document.getElementById("ropage").style.visibility = "visible";
  cube = document.getElementById("cube");
  cube.remove();
}

var ctx = document.getElementById("energyGen");
var energyGen = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Nuclear", "Solar", "Hydro", "Pavement Pressure Generation", "Other"],
        datasets: [{
            label: '% Generation',
            data: [nuclear, solar, hydro, pavegen, other],
            backgroundColor: [
                'rgba(76, 175, 80, 1)',
                'rgba(156, 39, 176, 1)',
                'rgba(255, 235, 59, 1)',
                'rgba(0, 150, 136, 1)',
                'rgba(33, 150, 243, 1)',
            ]
        }]
    }
});
setInterval(function() {
    energyGen.data.datasets[0].data[0] = nuclear;
    energyGen.data.datasets[0].data[1] = solar;
    energyGen.data.datasets[0].data[2] = hydro;
    energyGen.data.datasets[0].data[3] = pavegen;
    energyGen.data.datasets[0].data[4] = other;
    energyGen.update();
}, 2000);

var ctx = document.getElementById("energyGenLive");
var energyGenLive = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["-5", "-4", "-3", "-2", "-1", "Now"],
        datasets: [{
            label: 'Kilowatt Hour generation',
            data: [Math.random()*100 + 19000, Math.random()*100 + 19000, Math.random()*100 + 19000, Math.random()*100 + 19000, Math.random()*100 + 19000, Math.random()*100 + 19000],
            borderColor: [
                'rgba(57, 73, 171, 1)'
            ],
            backgroundColor: [
                'rgba(0, 0, 0, 0)'
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
                    labelString: 'Gigawatt Hour output'
                },
                ticks: {
                    min: 18900,
                    max: 19200
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
    energyGenLive.data.datasets[0].data[5] = Math.random()*100 + 19000;
    energyGenLive.update();
}, 60000);


$('.grid').masonry({
    // set itemSelector so .grid-sizer is not used in layout
    itemSelector: '.grid-item',
    // use element for option
    columnWidth: '.grid-sizer',
    percentPosition: true
})
