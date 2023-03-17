function carregar() {
  // Cria um array vazio para armazenar os últimos 12 meses e anos
  let ultimos12Meses = [];

  // Obtem a data atual
  let dataAtual = new Date();

  // Itera por cada um dos últimos 12 meses
  for (let i = 0; i < 12; i++) {
    // Subtrai um mês da data atual
    let dataMesAnterior = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - i, 1);

    // Obtém o ano e o mês da data anterior
    let ano = dataMesAnterior.getFullYear();
    let mes = dataMesAnterior.getMonth();

    // Cria uma string com o nome do mês e ano (ex: "Março 2022")
    let nomeMes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(dataMesAnterior);
    let nomeMesAno = `${nomeMes} ${ano}`;

    // Adiciona a string ao array de últimos 12 meses
    ultimos12Meses.push(nomeMesAno);
  }

  // Imprime o array de últimos 12 meses em ordem
  console.log(ultimos12Meses.reverse());

  const user = JSON.parse(localStorage.getItem("user"))

  document.querySelector("#NomeUser").innerHTML = user.nome
  const options = { method: 'GET' };

  fetch('http://localhost:3000/frota', options)
    .then(response => response.json())
    .then(response => {

      let disponivel = 0
      let indisponivel = 0

      response.forEach(element => {
        if (element.disponivel) {
          disponivel++
        } else {
          indisponivel++
        }
      })

      var data = {
        labels: ["Frotas Disponiveis", "Frotas Indisponiveis"],
        datasets: [
          {
            data: [disponivel, indisponivel],
            backgroundColor: ["#FF6384", "#36A2EB"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      };

      var myChart = new Chart(document.getElementById("myChart1"), {
        type: "doughnut",
        data: data,
        options: {
          responsive: true,
          cutout: "50%",
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

      //grafico 2

      let dadosManutencao = {
        labels: ultimos12Meses,
        datasets: [{
          label: "Valores de Manutenção",
          data: [1200, 1500, 900, 1300, 1100, 800, 1000, 900, 950, 1200, 1000, 850],
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1
        }]
      };
      let opcoesGrafico = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function(value, index, values) {
                return 'R$ ' + value;
              }
            }
          }]
        }
      };
      let grafico = new Chart(document.getElementById('myChart2'), {
        type: 'bar',
        data: dadosManutencao,
        options: opcoesGrafico
      });

    }).catch(err => console.error(err));




}


