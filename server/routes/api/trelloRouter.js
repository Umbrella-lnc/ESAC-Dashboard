const express = require('express')
const router = express.Router()

const {
    getCards,
    deleteCard,
    editCard,
    addCard,
    getLists,
} = require('../../controllers/trelloController.js')

router.post('/deleteCard', deleteCard)
router.post('/editCard', editCard)
router.post('/getCards', getCards)
router.post('/addCard', addCard)
router.get('/getLists', getLists)

module.exports = router
