const tabela = document.querySelector('tr')

function onLoad() {

    const options = { method: 'GET' };

    fetch('http://localhost:3000/motorista', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            response.forEach(element => {
                
                let tab = tabela.cloneNode(true)

                tab.querySelector('.id').innerHTML = element.id
                tab.querySelector('.nomeMotorista').innerHTML = element.nome
                tab.querySelector('.cnh').innerHTML = element.cnh
                tab.querySelector('.cpf').innerHTML = element.cpf
                document.querySelector('table').appendChild(tab)
            });
        }).catch(err => console.error(err));
}

