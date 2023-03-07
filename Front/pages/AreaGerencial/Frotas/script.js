const tabela = document.querySelector('tr')
const form = document.querySelector("form")
var id_veic = 0

var dadosLocal

form.addEventListener('submit', (e) => {
    e.preventDefault()
    redirect()
})

function onLoad() {

    const options = { method: 'GET' };

    fetch('http://localhost:3000/frota', options)
        .then(response => response.json())
        .then(response => {
            dadosLocal = response
            response.forEach(element => {

                let tab = tabela.cloneNode(true)

                tab.querySelector('.id').innerHTML = element.id
                tab.querySelector('.modelo').innerHTML = element.modelo
                tab.querySelector('.placa').innerHTML = element.placa
                tab.querySelector('.marca').innerHTML = element.marca
                tab.innerHTML += `<td><button class="submit" onclick="toggle(${element.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></button></td>`

                document.querySelector('tbody').appendChild(tab)
            });
        }).catch(err => console.error(err));
}

function toggle(id) {
    id_veic = id
    form.parentNode.classList.toggle('model')

    if (id != undefined) {
        dadosLocal.forEach(dado => {
            if (dado.id == id) {
                form.querySelector('#modelo').value = dado.modelo
                form.querySelector('#placa').value = dado.placa
                form.querySelector('#marca').value = dado.marca
            }
        })

        form.querySelector('p').innerHTML = "ATUALIZAR"
        form.querySelectorAll('.submit')[0].classList.remove('model')
        form.querySelector('.row-header').style.justifyContent = 'space-between'
    } else {
        form.querySelector('p').innerHTML = "CADASTRAR"
        form.querySelectorAll('.submit')[0].classList.add('model')
        form.querySelector('.row-header').style.justifyContent = 'end'
    }

}

function redirect() {
    if (id_veic > 0) {
        update()
    } else {
        create()
    }
}

function create() {
    let modelo = form.querySelector('#modelo').value
    let placa = form.querySelector('#placa').value
    let marca = form.querySelector('#marca').value

    let info = {
        "modelo": modelo,
        "placa": placa,
        "marca": marca
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0ZXRlc3RlQGdtYWlsLmNvbSIsInJvbGUiOiJkZXYiLCJub21lIjoiRGVzZW52b2x2ZWRvciIsInNlbmhhIjoiMTIzNCIsImlhdCI6MTY3ODE4ODMwNiwiZXhwIjoxNjc4MjI0MzA2fQ.5u6WHQXI2duHrEZKgHro2EtzyX9NOun8c1R-Yh8wuAE'
        },
        body: JSON.stringify(info)
    };

    fetch('http://localhost:3000/frota', options)
        .then(response => response.json())
        .then(response => window.location.reload())
        .catch(err => console.error(err));
}

function update() {
    let modelo = form.querySelector('#modelo').value
    let placa = form.querySelector('#placa').value
    let marca = form.querySelector('#marca').value

    form.querySelector('#modelo').value = null
    form.querySelector('#placa').value = null
    form.querySelector('#marca').value = null

    let info = {
        "modelo": modelo,
        "placa": placa,
        "marca": marca
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0ZXRlc3RlQGdtYWlsLmNvbSIsInJvbGUiOiJkZXYiLCJub21lIjoiRGVzZW52b2x2ZWRvciIsInNlbmhhIjoiMTIzNCIsImlhdCI6MTY3ODE4ODMwNiwiZXhwIjoxNjc4MjI0MzA2fQ.5u6WHQXI2duHrEZKgHro2EtzyX9NOun8c1R-Yh8wuAE'
        },
        body: JSON.stringify(info)
};

fetch(`http://localhost:3000/frota/${id_veic}`, options)
    .then(response => response.json())
    .then(response => {
        window.location.reload();
    })
    .catch(err => console.error(err));
}

function del(){
    const options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: `{"id":${id_veic}}`
      };
      
      fetch('http://localhost:3000/frota', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}