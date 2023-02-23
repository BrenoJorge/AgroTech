const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res, next) => {
    const motoristas = await prisma.Motorista.create({
        data: req.body
    }).catch(err => {
        if(err.meta.target == "Motorista_cpf_key"){
            return "Cpf já existente"
        } else if(err.meta.target == "Motorista_cnh_key"){
            return "Cnh já exitente"
        } else {
           return err
        }
    })

    res.status(200).json(motoristas).end()
}

const read = async (req, res, next) => {
    const motoristas = await prisma.Motorista.findMany()
    res.status(200).json(motoristas).end()
}

const readId = async (req, res, next) => {
    const motoristas = await prisma.Motorista.findMany({
        where: { id: Number(req.params.id)}
    })
    res.status(200).json(motoristas).end()
}

const update = async (req, res, next) => {
    const motoristas = await prisma.Motorista.update({
        where: { id: Number(req.params.id) },
        data: req.body 
    })
    res.status(200).send(motoristas).end()
}

const remove = async (req, res, next) => {
    const motoristas = await prisma.Motorista.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json(motoristas).end()
}

module.exports = {
    create,
    read,
    readId,
    update,
    remove
}