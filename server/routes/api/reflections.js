const express = require('express');
const router = express.Router();

const
{
    createReflectionForm,
    respondToReflectionForm,
    getReflectionForms
} = require('../../controllers/reflections.js');

// Reflections Routes
router.post("/createReflectionForm", createReflectionForm);
router.post("/respondToReflectionForm", respondToReflectionForm);
router.get("/getReflectionForms", getReflectionForms)

module.exports = router;