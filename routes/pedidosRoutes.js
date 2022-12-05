const express = require('express')
const router = express.Router()
const PedidoController = require("../controllers/PedidoController")


router.get('/', PedidoController.showPedidos)

router.post('/pedido', PedidoController.pedido)



router.get('/notaFiscal', PedidoController.notaFiscal)

module.exports = router