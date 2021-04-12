const express = require('express');
const router = express.Router();

const {
    getCards,
    deleteCard,
    editCard,
} = require('../../controllers/trelloController.js');

router.post('/deleteCard', deleteCard);
router.post('/editCard', editCard);
router.post('/getCards', getCards);

module.exports = router;
