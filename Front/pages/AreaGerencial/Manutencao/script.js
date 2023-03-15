const tabela = document.querySelector('tr')
const form = document.querySelector("form")
const diacriticsexample = document.querySelector("#diacriticsexample")

var dadosLocal = []
var auxiliar = 0

form.addEventListener('submit', (e) => {
    e.preventDefault()
    redirect()
})

$('#diacriticsexample')
    .dropdown({
        ignoreDiacritics: true,
        sortSelect: true,
        fullTextSearch: 'exact'
    });


function onLoad() {

    const options = { method: 'GET' };

    fetch('http://localhost:3000/manutencao', options)
        .then(response => response.json())
        .then(response => {
            dadosLocal = response
            response.forEach(element => {

                let tab = tabela.cloneNode(true)

                tab.querySelector('.id').innerHTML = element.id
                tab.querySelector('.dataInicio').innerHTML = formatarData(element.dataInicio)
                if(element.dataFim != null){
                    tab.querySelector('.dataFim').innerHTML = formatarData(element.dataFim)
                } else {
                    tab.querySelector('.dataFim').innerHTML = "em manutenção"
                    tab.innerHTML += `<td><button class="submit" onclick="finalizar(${element.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg></button></td>`
                }
                
                tab.querySelector('.valor').innerHTML = element.valor
                tab.querySelector('.descricao').innerHTML = element.descricao
                tab.querySelector('.frota').innerHTML = element.frota.placa
                tab.innerHTML += `<td><button class="submit" onclick="toggle(${element.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></button></td>`

                document.querySelector('tbody').appendChild(tab)
            });
        }).catch(err => console.error(err));

    fetch('http://localhost:3000/frota', options)
        .then(response => response.json())
        .then(response => {
            response.forEach(dado => {
                let string = `<div class="item" id="card${dado.id}">${dado.placa}</div>`
                diacriticsexample.querySelector(".menu").innerHTML += string
            })
        }).catch(err => console.error(err));


}

function toggle(id) {

    if (id != undefined) {
        dadosLocal.forEach(dado => {
            if (dado.id == id) {
                auxiliar = id
                form.querySelector('.text').innerHTML = dado.frota.placa
                form.querySelector('#frota').value = dado.frota.placa
                form.querySelector('#frota').classList.remove("noselection")
                form.querySelector('.text').classList.remove("default")
                form.querySelector(`#card${dado.frota.id}`).classList.add("active")
                form.querySelector(`#card${dado.frota.id}`).classList.add("selected")
                form.querySelector('#descricao').value = dado.descricao
                form.querySelector('#valor').value = dado.valor
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
                form.querySelector(`#card${dado.frota.id}`).classList.remove("active")
                form.querySelector(`#card${dado.frota.id}`).classList.remove("selected")
                form.querySelector('#frota').classList.add("noselection")
                form.querySelector('.text').classList.add("default")
            }
        })
        form.querySelector('.text').innerHTML = "Selecionar Frota"
        form.querySelector('#frota').value = ""
        form.querySelector('#descricao').value = ""
        form.querySelector('#valor').value = ""
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
    dadosLocal.forEach(dado =>  {
        if(dado.frota.placa == frota){
            frota = dado.frota.id
        }
    })
    let valor = form.querySelector('#valor').value
    let descricao = form.querySelector('#descricao').value

    let info = {
        "valor": parseFloat(valor),
        "descricao": descricao,
        "idFrota": Number(frota)
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkZXZ0ZXN0ZTJAZ21haWwuY29tIiwicm9sZSI6ImRldiIsIm5vbWUiOiJEZXNlbnZvbHZlZG9yIiwic2VuaGEiOiI4MWRjOWJkYjUyZDA0ZGMyMDAzNmRiZDgzMTNlZDA1NSIsImlhdCI6MTY3ODg4NTI2MiwiZXhwIjoxNjc4OTIxMjYyfQ.Nr1-gz5bo4x660PC0kU_kkZd26Doaa4dOsUNLRQGl2Q'
        },
        body: JSON.stringify(info)
      };
      
      fetch('http://localhost:3000/manutencao', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

function update() {
    let frota = form.querySelector('#frota').value
    frota = frota.toUpperCase()
    dadosLocal.forEach(dado =>  {
        if(dado.frota.placa == frota){
            frota = dado.frota.id
        }
    })
    let valor = form.querySelector('#valor').value
    let descricao = form.querySelector('#descricao').value

    form.querySelector('#valor').value = null
    form.querySelector('#descricao').value = null
    form.querySelector('#frota').value = null

    let info = {
        "valor": parseFloat(valor),
        "descricao": descricao,
        "idFrota": Number(frota)
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    };

    fetch(`http://localhost:3000/manutencaoupdate/${auxiliar}`, options)
        .then(response => response.json())
        .then(response => {
            window.location.reload();
        })
        .catch(err => console.error(err));
}

function del() {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: `{"id":${auxiliar}}`
    };

    fetch('http://localhost:3000/manutencao', options)
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

function finalizar(id){
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: '{"dataFim":null}'
      };
      
      fetch(`http://localhost:3000/manutencao/${id}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}