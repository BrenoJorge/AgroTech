const tabela = document.querySelector('tr')
const form = document.querySelector("form")
const diacriticsexample1 = document.querySelector("#diacriticsexample1")
const diacriticsexample2 = document.querySelector("#diacriticsexample2")
const user = JSON.parse(localStorage.getItem("user"))

var dadosLocal = []
var dadosMotorista = []
var dadosFrota = []
var auxiliar = 0

form.addEventListener('submit', (e) => {
    e.preventDefault()
    redirect()
})

$('#diacriticsexample1')
    .dropdown({
        ignoreDiacritics: true,
        sortSelect: true,
        fullTextSearch: 'exact'
    });

$('#diacriticsexample2')
    .dropdown({
        ignoreDiacritics: true,
        sortSelect: true,
        fullTextSearch: 'exact'
    });

function onLoad() {

    

    document.querySelector("#NomeUser").innerHTML = user.nome
    const options = { method: 'GET' };

    fetch('http://localhost:3000/operacao', options)
        .then(response => response.json())
        .then(response => {
            dadosLocal = response
            response.forEach(element => {

                let tab = tabela.cloneNode(true)

                tab.querySelector('.id').innerHTML = element.id
                tab.querySelector('.nomeMotorista').innerHTML = element.motorista.nome
                tab.querySelector('.frota').innerHTML = element.frota.placa
                tab.querySelector('.dataSaida').innerHTML = formatarData(element.dataSaida)

                if (element.dataRetorno != null) {
                    tab.querySelector('.dataRetorno').innerHTML = formatarData(element.dataRetorno)
                } else {
                    tab.querySelector('.dataRetorno').innerHTML = "em serviço"
                    tab.innerHTML += `<td><button class="submit" onclick="finalizar(${element.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg></button></td>`
                }

                tab.querySelector('.descricao').innerHTML = element.descricao
                tab.innerHTML += `<td><button class="submit" onclick="toggle(${element.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></button></td>`
                document.querySelector('tbody').appendChild(tab)
            });
        }).catch(err => console.error(err));

    fetch('http://localhost:3000/frota', options)
        .then(response => response.json())
        .then(response => {
            dadosFrota = response
            response.forEach(dado => {
                let string = `<div class="item" id="cardFrota${dado.id}">${dado.placa}</div>`
                diacriticsexample1.querySelector(".menu").innerHTML += string
            })
        }).catch(err => console.error(err));

    fetch('http://localhost:3000/motorista', options)
        .then(response => response.json())
        .then(response => {

            dadosMotorista = response
            response.forEach(dado => {

                let string = `<div class="item" id="cardMotorista${dado.id}">${dado.nome}</div>`
                diacriticsexample2.querySelector(".menu").innerHTML += string
            })
        })
        .catch(err => console.error(err));
}

function toggle(id) {

    if (id != undefined) {
        dadosLocal.forEach(dado => {
            if (dado.id == id) {
                auxiliar = id
                form.querySelector('.frota').innerHTML = dado.frota.placa
                form.querySelector('.motorista').innerHTML = dado.motorista.nome
                form.querySelector('#frota').value = dado.frota.placa
                form.querySelector('#motorista').value = dado.motorista.nome
                form.querySelector('#frota').classList.remove("noselection")
                form.querySelector('#motorista').classList.remove("noselection")
                form.querySelector('.frota').classList.remove("default")
                form.querySelector('.motorista').classList.remove("default")
                form.querySelector(`#cardFrota${dado.frota.id}`).classList.add("active")
                form.querySelector(`#cardMotorista${dado.frota.id}`).classList.add("active")
                form.querySelector(`#cardFrota${dado.frota.id}`).classList.add("selected")
                form.querySelector(`#cardMotorista${dado.motorista.id}`).classList.add("selected")
                form.querySelector('#descricao').value = dado.descricao
            }
        })

        form.querySelector('p').innerHTML = "ATUALIZAR"
        form.querySelectorAll('.submit')[0].classList.remove('model')
        form.querySelector('.row-header').style.justifyContent = 'space-between'
        form.parentNode.classList.toggle('model')
    } else {
        dadosLocal.forEach(dado => {
            if (dado.id == auxiliar) {
                auxiliar = 0
                form.querySelector(`#cardFrota${dado.frota.id}`).classList.remove("active")
                form.querySelector(`#cardMotorista${dado.motorista.id}`).classList.remove("active")
                form.querySelector(`#cardFrota${dado.frota.id}`).classList.remove("selected")
                form.querySelector(`#cardMotorista${dado.motorista.id}`).classList.remove("selected")
                form.querySelector('#frota').classList.add("noselection")
                form.querySelector('#motorista').classList.add("noselection")
                form.querySelector('.frota').classList.add("default")
                form.querySelector('.motorista').classList.add("default")
            }
        })
        form.querySelector('.frota').innerHTML = "Selecionar Frota"
        form.querySelector('.motorista').innerHTML = "Selecionar Motorista"
        form.querySelector('#frota').value = ""
        form.querySelector('#descricao').value = ""
        form.querySelector('p').innerHTML = "CADASTRAR"
        form.querySelectorAll('.submit')[0].classList.add('model')
        form.querySelector('.row-header').style.justifyContent = 'end'
        form.parentNode.classList.toggle('model')
    }

}

function redirect() {
    if (auxiliar > 0) {
        update()
    } else {
        create()
    }
}

function create() {

    let frota = form.querySelector('#frota').value
    frota = frota.toUpperCase()

    let motorista = form.querySelector("#motorista").value
    motorista = motorista.toUpperCase()

    let descricao = form.querySelector("#descricao").value

    dadosFrota.forEach(dado => {
        if (dado.placa == frota) {
            frota = dado.id
        }

    })

    dadosMotorista.forEach(dado => {

        dado.nome = dado.nome.toUpperCase()
        if (dado.nome == motorista) {
            motorista = dado.id
        }
    })

    let info = {
        "idMotorista": Number(motorista),
        "idFrota": Number(frota),
        "descricao": descricao
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: user.token
        },
        body: JSON.stringify(info)
    };

    fetch('http://localhost:3000/operacao', options)
        .then(response => response.json())
        .then(response => Window.location.reload())
        .catch(err => console.error(err));
}

function update() {

    let frota = form.querySelector('#frota').value
    frota = frota.toUpperCase()

    let motorista = form.querySelector("#motorista").value
    motorista = motorista.toUpperCase()

    let descricao = form.querySelector("#descricao").value

    dadosFrota.forEach(dado => {
        if (dado.placa == frota) {
            frota = dado.id
        }

    })

    dadosMotorista.forEach(dado => {

        dado.nome = dado.nome.toUpperCase()
        if (dado.nome == motorista) {
            motorista = dado.id
        }
    })

    let info = {
        "idMotorista": Number(motorista),
        "idFrota": Number(frota),
        "descricao": descricao
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: user.token
        },
        body: JSON.stringify(info)
    };

    fetch(`http://localhost:3000/operacaoupdate/${auxiliar}`, options)
        .then(response => response.json())
        .then(response => {
            window.location.reload();
        })
        .catch(err => console.error(err));
}

function del() {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: user.token
        },
        body: `{"id":${auxiliar}}`
    };

    if (confirm('Tem certeza que deseja excluir a operação? id :' + auxiliar))
        fetch('http://localhost:3000/operacao', options)
            .then(response => response.json())
            .then(response => window.location.reload())
            .catch(err => console.error(err));
}

function formatarData(data) {
    const partes = data.split('T');
    const dataPartes = partes[0].split('-');
    const dataFormatada = `${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}`;
    return dataFormatada;
}

function finalizar(id) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: user.token
        },
        body: '{"dataRetorno":null}'
    };

    fetch(`http://localhost:3000/operacao/${id}`, options)
        .then(response => response.json())
        .then(response => window.location.reload())
        .catch(err => console.error(err));
}