const express = require('express');

const router = express.Router();

const Middleware = require('../middleware/middleware')

const Motorista = require('../controllers/motorista');
const Frota = require('../controllers/frota');
const Manutencao = require('../controllers/manutencao');
const Operacao = require('../controllers/operacao');
const Usuario = require('../controllers/usuario');
const Login = require('../controllers/login');

router.get('/motorista', Motorista.read);
router.post('/motorista',Middleware.autenticacao, Motorista.create);
router.put('/motorista/:id',Middleware.autenticacao, Motorista.update);
router.delete('/motorista',Middleware.autenticacao, Motorista.remove);

router.get('/frota', Frota.read);
router.post('/frota',Middleware.autenticacao, Frota.create);
router.put('/frota/:id',Middleware.autenticacao, Frota.update);
router.delete('/frota',Middleware.autenticacao, Frota.remove);

router.get('/manutencao', Manutencao.read);
router.post('/manutencao',Middleware.autenticacao, Manutencao.create);
router.put('/manutencao/:id',Middleware.autenticacao, Manutencao.updateDataFim);
router.put('/manutencaoupdate/:id',Middleware.autenticacao, Manutencao.update);
router.delete('/manutencao',Middleware.autenticacao, Manutencao.remove)

router.get('/operacao', Operacao.read);
router.post('/operacao',Middleware.autenticacao, Operacao.create);
router.put('/operacao/:id',Middleware.autenticacao, Operacao.updateDataRetorno);
router.put('/operacaoupdate/:id',Middleware.autenticacao, Operacao.update);
router.delete('/operacao',Middleware.autenticacao, Operacao.remove)

router.get('/usuario', Usuario.read);
router.post('/usuario',Middleware.autenticacao, Usuario.create);
router.put('/usuarioupdate/:id',Middleware.autenticacao, Usuario.update);
router.delete('/usuario',Middleware.autenticacao, Usuario.remove)

router.post('/login', Login.login)

module.exports = router;