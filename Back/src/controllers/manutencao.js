const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res, next) => {

    const options = {
        timeZone: 'America/Sao_Paulo',
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };
    const date = new Intl.DateTimeFormat([], options);


    let data = date.format(new Date())

    let dia = data.split('/')[0]
    let mes = data.split('/')[1]
    let ano = data.split('/')[2].split(' ')[0]

    let string = `${ano}-${mes}-${dia}T${data.split(' ')[1]}Z`
    req.body.dataInicio = new Date(string)



    const manutencoes = await prisma.Manutencao.create({
        data: req.body
    }).catch(err => {
        return err
    })

    res.status(200).json(manutencoes).end()
}

const read = async (req, res, next) => {
    const manutencoes = await prisma.Manutencao.findMany({
        select:{
            id:true,
            dataInicio:true,
            dataFim:true,
            valor:true,
            descricao:true,
            frota:{
                select:{
                    placa:true
                }
            }
        }
    })
    res.status(200).json(manutencoes).end()
}

const readId = async (req, res, next) => {
    const manutencoes = await prisma.Manutencao.findMany({
        where: { id: Number(req.params.id) }
    })
    res.status(200).json(manutencoes).end()
}

const updateDataFim = async (req, res, next) => {

    const options = {
        timeZone: 'America/Sao_Paulo',
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };
    const date = new Intl.DateTimeFormat([], options);

    if (req.body.dataFim == null) {

        let data = date.format(new Date())

        let dia = data.split('/')[0]
        let mes = data.split('/')[1]
        let ano = data.split('/')[2].split(' ')[0]

        let string = `${ano}-${mes}-${dia}T${data.split(' ')[1]}Z`
        req.body.dataFim = new Date(string)

    }

    const manutencoes = await prisma.Manutencao.update({
        where: { id: Number(req.params.id) },
        data: { dataFim: req.body.dataFim }
    })

    res.status(200).send(manutencoes).end()
}

const update = async (req, res, next) => {

    const manutencoes = await prisma.Manutencao.update({
        where: { id: Number(req.params.id) },
        data: req.body
    }).catch(err => {
        return err
    })

    res.status(200).send(manutencoes).end()
}

const remove = async (req, res, next) => {
    const manutencoes = await prisma.Manutencao.delete({
        where: {
            id: Number(req.body.id)
        }
    }).catch(err => {
        return err
    })

    res.status(200).json(manutencoes).end()
}

module.exports = {
    create,
    read,
    readId,
    updateDataFim,
    update,
    remove
}