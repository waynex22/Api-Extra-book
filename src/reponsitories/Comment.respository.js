const BaseRepository = require('./Base.repository')
const comment = require('../models/comment.model')

class CommentRepository extends BaseRepository {
    constructor(){
        super(comment)
    }
}

module.exports = CommentRepository