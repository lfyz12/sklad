const Router = require('express')
const router = new Router
const documentController = require('../controllers/DocumentController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, documentController.create)
router.post('/delete', authMiddleware, documentController.delete)
router.post('/activate', authMiddleware, documentController.activate)

router.get('/getAll', authMiddleware, documentController.getAll)
router.get('/getOne', authMiddleware, documentController.getOne)

module.exports = router;