const express = require('express')
const ProductController = require('../controller/Product.controller')
const router = express.Router()

router.get('/', ProductController.getAll)
router.get('/search', ProductController.search)
router.get('/:id', ProductController.getById)
router.post('/add', ProductController.add)
router.put('/update/:id', ProductController.updateProduct)
router.delete('/delete/:id', ProductController.delete)
module.exports = router