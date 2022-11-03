const express = require('express');
const router = express.Router()

const TasksController = require('../controllers/tasksController.js')

router.get('', TasksController.Index)
router.post('', TasksController.Add)
router.delete('', TasksController.Delete)

module.exports = router