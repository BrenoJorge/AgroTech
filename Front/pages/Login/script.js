const form = document.querySelector("form")
const email = document.querySelector("#email")
const senha = document.querySelector("#senha")
const mensagem = document.querySelector(".mensagem")

function fazerLogin() {

    let dados = {
        "email": email.value,
        "senha": senha.value
    }

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dados)
      };
      
      fetch('http://localhost:3000/login', options)
        .then(response => response.json())
        .then(response => {
            if(response.mensagem == "Usuario não encontrado"){
                mensagem.classList.remove("model")
                mensagem.querySelector("h3").innerHTML = response.mensagem
            } else if(response.role == "dev"){
                localStorage.setItem('user', JSON.stringify({"nome" : response.nome, "token":response.token}))
            } else {
                localStorage.setItem('user', JSON.stringify({"nome" : response.nome, "token":response.token}))
            }

        })
        .catch(err => console.error(err));
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    fazerLogin()
})