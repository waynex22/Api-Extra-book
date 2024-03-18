const express = require('express')
const CommentController = require('../controller/Comment.controller')
const router = express.Router()

router.get('/', CommentController.getAlls)
router.get('/:id', CommentController.detail)
router.post('/add', CommentController.newComment)
router.put('/update/:id', CommentController.update)
router.delete('/delete/:id', CommentController.delete)
module.exports = router 