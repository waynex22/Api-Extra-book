const express = require('express')
const CategoryController = require('../controller/Category.controller')
const router = express.Router()

router.get('/', CategoryController.getAll)
router.get('/:id', CategoryController.getById)
router.post('/add', CategoryController.add)
router.put('/update/:id', CategoryController.update)
router.delete('/delete/:id', CategoryController.delete)
module.exports = router