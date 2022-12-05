const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

const checkAuth = require('../helpers/auth').checkAuth

router.get('/login', AuthController.login)
router.post('/login', AuthController.loginPost)
router.get('/cadastro', checkAuth, AuthController.cadastro)
router.post('/cadastro', checkAuth,AuthController.cadastroPost)
router.get('/logout', checkAuth,AuthController.logout)



module.exports = router