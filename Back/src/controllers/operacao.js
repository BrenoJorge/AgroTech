const { PrismaClient } = require('@prisma/client')
const Motorista = require('../controllers/motorista');
const Frota = require('../controllers/frota');

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
    req.body.dataSaida = new Date(string)


    req.body.idMotorista = Number(req.body.idMotorista)
    req.body.idFrota = Number(req.body.idFrota)
    
    const frota = await prisma.frota.findUnique({
        where:{
            id: req.body.idFrota
        }
    })
    
    if(frota.disponivel == false){
        return res.status(200).json({"mnsagem":"frota indisponivel"})
    }

    const motorista = await prisma.motorista.findUnique({
        where:{
            id: req.body.idMotorista
        }
    })

    if(motorista.disponivel == false){
        return res.status(200).json({"mnsagem":"motorista indisponivel"})
    }

    const operacoes = await prisma.Operacao.create({
        data: req.body
    }).catch(err => {
        if(err.meta.field_name == "idMotorista"){
            return "Motorista inexistente"
        } else if(err.meta.field_name == "idFrota"){
            return "Frota inexistente"
        } else {
            return err
        }
        
    })
    
    Motorista.updateIndisponivel(req.body.idMotorista)
    Frota.updateIndisponivel(req.body.idFrota)
    res.status(200).json(operacoes).end()
}

const read = async (req, res, next) => {
    const operacoes = await prisma.Operacao.findMany({
        select:{
            id:true,
            dataSaida:true,
            dataRetorno:true,
            descricao:true,
            frota:{
                select:{
                    placa:true,
                    id:true
                }
            },
            motorista:{
                select:{
                    nome:true,
                    id:true
                }
            }
        }
    })
    res.status(200).json(operacoes).end()
}

const readId = async (req, res, next) => {
    const operacoes = await prisma.Operacao.findMany({
        where: { id: Number(req.params.id) }
    })
    res.status(200).json(operacoes).end()
}

const updateDataRetorno = async (req, res, next) => {
    console.log(req.body)
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

    if (req.body.dataRetorno == null) {

        let data = date.format(new Date())

        let dia = data.split('/')[0]
        let mes = data.split('/')[1]
        let ano = data.split('/')[2].split(' ')[0]

        let string = `${ano}-${mes}-${dia}T${data.split(' ')[1]}Z`
        req.body.dataRetorno = new Date(string)

    } else {
        req.body.dataRetorno = new Date(req.body.dataRetorno)
    }

    const operacoes = await prisma.Operacao.update({
        where: { id: Number(req.params.id) },
        data: { dataRetorno: req.body.dataRetorno }
    })
    Motorista.updateDisponivel(operacoes.idMotorista)
    Frota.updateDisponivel(operacoes.idFrota)
    res.status(200).send(operacoes).end()
}

const update = async (req, res, next) => {

    const operacoes = await prisma.Operacao.update({
        where: { id: Number(req.params.id) },
        data: req.body
    }).catch(err => {
        return err
    })

    res.status(200).send(operacoes).end()
}

const remove = async (req, res, next) => {
    const operacoes = await prisma.Operacao.delete({
        where: {
            id: Number(req.body.id)
        }
    }).catch(err => {
        return err
    })

    res.status(200).json(operacoes).end()
}

module.exports = {
    create,
    read,
    readId,
    updateDataRetorno,
    update,
    remove
}