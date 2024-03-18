const categoryRouter = require('./category.routes')
const productRouter = require('./product.routes')
const accountRouter = require('./account.routes')
const commentRouter = require('./comment.routes')
const orderRouter = require('./order.routes')
const route = (app) => {
     app.use('/api/category', categoryRouter)   
     app.use('/api/product', productRouter)   
     app.use('/api/account', accountRouter)
     app.use('/api/comment', commentRouter)  
     app.use('/api/order', orderRouter)
}
module.exports = route 