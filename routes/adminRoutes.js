const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/AdminController')
//helper
const checkAuth = require('../helpers/auth').checkAuth


router.get('/admin', checkAuth, AdminController.admin)
router.get('/', AdminController.showAdmin)


router.get('/homeAdmin', checkAuth,AdminController.homeAdmin)
router.get('/homeAdmin',checkAuth, AdminController.showHomeAdmin)
router.get('/menu', checkAuth,AdminController.menu)

router.get('/dashboard', checkAuth,AdminController.dashboard)
router.get('/pedidosAdmin', checkAuth,AdminController.showPedidos)
router.get('/pedidosAdmin', checkAuth, AdminController.pedidosAdmin)


router.post('/editarStatusPost', checkAuth, AdminController.editarStatusPost)
router.post('/remove', checkAuth, AdminController.remove)


module.exports = router