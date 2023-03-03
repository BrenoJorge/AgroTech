const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
require('dotenv').config()

const login = async (req, res) => {
    const user = await prisma.Usuario.findMany({
        where: {
            AND: [
                {
                    email: req.body.email
                },
                {
                    senha: req.body.senha
                }
            ]
        }
    }).catch(err => {
        console.log(err);
    })

    if(user.length != 0){
        jwt.sign(user[0], process.env.KEY, { expiresIn: '10h' }, function (err, token) {
            if (err == null) {
                res.status(200).json({"email" : user[0].email, "senha": user[0].senha, "nome" : user[0].nome, "token":token}).end()
            } else {
                res.status(404).json(err).end()
            }
        })
    } else {
        res.status(200).json({"mensagem" : "Usuario não encontrado"}).end()
    }
}

module.exports = {login}