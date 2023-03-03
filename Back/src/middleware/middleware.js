const jwt = require('jsonwebtoken')
require('dotenv').config()

const autenticacao = (req, res,next) => {

    const token = req.headers.authorization

    jwt.verify(token,process.env.KEY, (err,data)=> {

        if(err != null) res.status(404).json(err).end()
        else{
            if(data.role === "dev"){
                next()       
            }else {
                res.status(401).json({"mensagem":"acesso negado"}).end()
            }
        }
    })
    
} 

module.exports = {
    autenticacao
}