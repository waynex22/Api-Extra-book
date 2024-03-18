const express = require('express')
const AccountController = require('../controller/Account.controller')
const router = express.Router()

router.get('/', AccountController.getAll)
router.get('/:id', AccountController.getById)
router.post('/add', AccountController.register)
router.post('/login', AccountController.login)
router.post('/user', AccountController.user)
router.put('/update/:id', AccountController.update)
router.delete('/delete/:id', AccountController.delete)
module.exports = router 