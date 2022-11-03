const express = require('express');
const router = express.Router()

const GoalsController = require('../controllers/goalsController.js');

router.get('', GoalsController.Index)
router.post('', GoalsController.Add)
router.delete('', GoalsController.Delete)

module.exports = router