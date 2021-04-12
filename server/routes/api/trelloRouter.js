const express = require('express')
const router = express.Router()

const { getCards } = require('../../controllers/trelloController.js')

router.post('/deleteCard')
router.post('/editCard')
router.post('/getCards', getCards)

module.exports = router
