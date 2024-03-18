const express = require('express')
const OrderController = require('../controller/Order.controller')
const router = express.Router()

router.get('/', OrderController.getOrder)
router.get('/:id', OrderController.getById)
router.post('/add', OrderController.add)
router.put('/update/:id', OrderController.update)
router.delete('/delete/:id', OrderController.delete)
module.exports = router