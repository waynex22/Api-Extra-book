const CommentRepository = require('../reponsitories/Comment.respository');
const BaseController = require('./Base.controller');
const Comment = require('../models/comment.model')
const Product = require('../models/product.model')
class CommentController extends BaseController {
  constructor() {
    super(CommentRepository);
  }

  async getAlls(req, res) {
    try {
      const data = await Comment.find().populate('account_id')
      if (data) {
        res.status(200).json({ data: data })
      }
      else {
        res.status(404).json({ message: 'Not found ' })
      }
    } catch (error) {
      res.status(500).json({ message: 'server error' })
    }
  }
  async newComment(req, res) {
    const body = req.body
    const comment = new Comment(body)
    try {
      const exitingComment = await Comment.findOne({ product_id: body.product_id, account_id: body.account_id })
          if (exitingComment) {
            res.status(209).json({ message: ' limit ' })
          } else {
            comment.save()
              .then(async () => {
                try {
                  const comments = await Comment.find({ product_id: body.product_id }).exec();
                  const sumOfRatings = comments.reduce((accumulator, comment) => {
                    const rating = parseInt(comment.rating, 10);
                    if (!isNaN(rating)) {
                      return accumulator + rating;
                    }
                    return accumulator;
                  }, 0);
                  const averageScore = (sumOfRatings / comments.length) * 2
                  const updateCount = await Product.findByIdAndUpdate(
                    body.product_id,
                    {
                      $inc: { review_count: 1 },
                      $set: { average_score: Number(averageScore.toFixed(2)) }
                    },
                    { new: true }
                  );
                  if(updateCount) {
                    res.status(201).json({message: 'comment success'})
                  } else {
                    res.status(209).send('not found');
                  }
                } catch (error) {
                  console.error(error);
                  res.status(500).send('error server');
                }
              })
          }
    } catch (error) {
      res.status(500).json({message: 'error server'})
    }
  }
  async detail(req, res){
    const id = req.params.id
    const data = await Comment.find({product_id: id}).populate('account_id')
    if(data){
      res.status(200).json({message: 'ok', data: data})
    }else{
      res.status(404).json({message: 'not found'})
    }
  }
}

module.exports = new CommentController();
