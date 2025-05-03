const Router = require('express')
const router = new Router
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const agentRouter = require('./agentRouter')
const documentRouter = require('./documentRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/agent', agentRouter)
router.use('/document', documentRouter)

module.exports = router