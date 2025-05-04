const Router = require('express')
const router = new Router
const productController = require('../controllers/ProductController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, productController.create)
router.post('/delete', authMiddleware, productController.delete)

router.get('/getAll', authMiddleware, productController.getAllProducts)
router.get('/getOne', authMiddleware, productController.getProduct)
router.get('/getReport', authMiddleware, productController.getProductReportSummary)
router.post('/getAgentReport', authMiddleware, productController.getProductAgentReport)

router.post('/update', authMiddleware, productController.update)

module.exports = router;
