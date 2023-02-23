const express = require('express');

const router = express.Router();

const Motorista = require('../controllers/motorista');
const Frota = require('../controllers/frota');
const Manutencao = require('../controllers/manutencao');
const Operacao = require('../controllers/operacao');
const Usuario = require('../controllers/usuario');

router.get('/motorista', Motorista.read);
router.post('/motorista', Motorista.create);
router.put('/motorista/:id', Motorista.update);
router.delete('/motorista', Motorista.remove);

router.get('/frota', Frota.read);
router.post('/frota', Frota.create);
router.put('/frota/:id', Frota.update);
router.delete('/frota', Frota.remove);

router.get('/manutencao', Manutencao.read);
router.post('/manutencao', Manutencao.create);
router.put('/manutencao/:id', Manutencao.updateDataFim);
router.put('/manutencaoupdate/:id', Manutencao.update);
router.delete('/manutencao', Manutencao.remove)

router.get('/operacao', Operacao.read);
router.post('/operacao', Operacao.create);
router.put('/operacao/:id', Operacao.updateDataRetorno);
router.put('/operacaoupdate/:id', Operacao.update);
router.delete('/operacao', Operacao.remove)

router.get('/usuario', Usuario.read);
router.post('/usuario', Usuario.create);
router.put('/usuarioupdate/:id', Usuario.update);
router.delete('/usuario', Usuario.remove)

module.exports = router;