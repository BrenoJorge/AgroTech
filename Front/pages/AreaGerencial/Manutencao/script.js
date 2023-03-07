const tabela = document.querySelector('tr')

function onLoad() {

    const options = { method: 'GET' };

    fetch('http://localhost:3000/manutencao', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            response.forEach(element => {

                let tab = tabela.cloneNode(true)

                tab.querySelector('.id').innerHTML = element.id
                tab.querySelector('.dataInicio').innerHTML = element.dataInicio
                tab.querySelector('.dataFim').innerHTML = element.dataFim
                tab.querySelector('.valor').innerHTML = element.valor
                tab.querySelector('.descricao').innerHTML = element.descricao
                tab.querySelector('.frota').innerHTML = element.frota.placa

                document.querySelector('tbody').appendChild(tab)
            });
        }).catch(err => console.error(err));
}

