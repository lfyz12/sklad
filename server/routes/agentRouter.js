const Router = require('express')
const router = new Router
const agentController = require('../controllers/AgentController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/create', authMiddleware, agentController.create)
router.post('/delete', authMiddleware,  agentController.delete)

router.get('/getAll', authMiddleware, agentController.getAllAgents)
router.post('/getOne', authMiddleware, agentController.getAgent)
router.get('/getReport', authMiddleware, agentController.getAgentReportSummary)
router.get('/getProductReport', authMiddleware, agentController.getAgentProductReport)

router.put('/update', authMiddleware, agentController.update)

module.exports = router;