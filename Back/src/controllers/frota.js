const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res, next) => {
    const frotas = await prisma.Frota.create({
        data: req.body
    }).catch(err => {
        if(err.meta.target == "Frota_placa_key"){
            return "Placa já existente"
        }else {
           return err
        }
    })

    res.status(200).json(frotas).end()
}

const read = async (req, res, next) => {
    const frotas = await prisma.Frota.findMany()
    res.status(200).json(frotas).end()
}

const readId = async (req, res, next) => {
    const frotas = await prisma.Frota.findMany({
        where: { id: Number(req.params.id)}
    })
    res.status(200).json(frotas).end()
}

const update = async (req, res, next) => {
    const frotas = await prisma.Frota.update({
        where: { id: Number(req.params.id) },
        data: req.body 
    })
    res.status(200).send(frotas).end()
}

const remove = async (req, res, next) => {
    const frotas = await prisma.Frota.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json(frotas).end()
}

module.exports = {
    create,
    read,
    readId,
    update,
    remove
}