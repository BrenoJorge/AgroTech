var data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  var myChart = new Chart(document.getElementById("myChart"), {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      cutoutPercentage: 50,
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
  