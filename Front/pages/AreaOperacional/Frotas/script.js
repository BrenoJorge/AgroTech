const tabela = document.querySelector('tr')

function onLoad() {

    const options = { method: 'GET' };

    fetch('http://localhost:3000/frota', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            response.forEach(element => {

                let tab = tabela.cloneNode(true)

                tab.querySelector('.id').innerHTML = element.id
                tab.querySelector('.modelo').innerHTML = element.modelo
                tab.querySelector('.placa').innerHTML = element.placa
                tab.querySelector('.marca').innerHTML = element.marca

                document.querySelector('tbody').appendChild(tab)
            });
        }).catch(err => console.error(err));
}

