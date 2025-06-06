const Router = require('express')
const router = new Router
const userController = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/reg', userController.registration)
router.post('/login', userController.login)
router.post('/check', userController.checkAuth)
router.get('/users', authMiddleware, userController.getAllUsers)

module.exports = router;
