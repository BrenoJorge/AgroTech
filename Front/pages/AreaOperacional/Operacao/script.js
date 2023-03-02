const tabela = document.querySelector('tr')

function onLoad() {

    const options = { method: 'GET' };

    fetch('http://localhost:3000/operacao', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            response.forEach(element => {

                let tab = tabela.cloneNode(true)

                tab.querySelector('.id').innerHTML = element.id
                tab.querySelector('.nomeMotorista').innerHTML = element.motorista.nome
                tab.querySelector('.frota').innerHTML = element.frota.placa
                tab.querySelector('.dataSaida').innerHTML = element.dataSaida
                tab.querySelector('.dataRetorno').innerHTML = element.dataRetorno
                tab.querySelector('.descricao').innerHTML = element.descricao

                document.querySelector('table').appendChild(tab)
            });
        }).catch(err => console.error(err));
}

