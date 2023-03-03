const { PrismaClient } = require('@prisma/client')
const  md5  = require('md5')

const prisma = new PrismaClient()

const create = async (req, res, next) => {
    req.body.senha = md5(req.body.senha)
    const usuarios = await prisma.Usuario.create({
        data: req.body
    }).catch(err => {
        return err
    })

    res.status(200).json(usuarios).end()
}

const read = async (req, res, next) => {
    const usuarios = await prisma.Usuario.findMany()
    res.status(200).json(usuarios).end()
}

const readId = async (req, res, next) => {
    const usuarios = await prisma.Usuario.findMany({
        where: { id: Number(req.params.id)}
    })
    res.status(200).json(usuarios).end()
}

const update = async (req, res, next) => {
    const usuarios = await prisma.Usuario.update({
        where: { id: Number(req.params.id) },
        data: req.body 
    })
    res.status(200).send(usuarios).end()
}

const remove = async (req, res, next) => {
    const usuarios = await prisma.Usuario.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json(usuarios).end()
}

module.exports = {
    create,
    read,
    readId,
    update,
    remove
}