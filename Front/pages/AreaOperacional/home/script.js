function carregar() {

  const options = { method: 'GET' };

  fetch('http://localhost:3000/frota', options)
    .then(response => response.json())
    .then(response => {

      let disponivel = 0
      let indisponivel = 0

      response.forEach(element => {
        if(element.operacao != 0){
          indisponivel++
        } else {
          disponivel++
        }
      })

      var data = {
        labels: ["Disponivel", "Indisponivel"],
        datasets: [
          {
            data: [disponivel, indisponivel],
            backgroundColor: ["#FF6384", "#36A2EB"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      };

      var myChart = new Chart(document.getElementById("myChart"), {
        type: "doughnut",
        data: data,
        options: {
          responsive: true,
          cutout: "80%",
          animation: {
            animateScale: true,
          },
          legend: {
            position: "bottom",
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var index = tooltipItem.index;
                return dataset.labels[index] + ": " + dataset.data[index];
              },
            },
          },
        },
      });

    }).catch(err => console.error(err));

 

  
}


