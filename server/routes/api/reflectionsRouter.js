const express = require('express');
const router = express.Router();

const
{
    createReflection,
    deleteReflection,
    commentOnReflection,
    getDepartmentReflections,
    getAllReflections
} = require('../../controllers/reflectionsController.js');


router.post("/createReflection", createReflection);
router.post("/deleteReflection", deleteReflection);
router.post("/commentOnReflection", commentOnReflection);
router.get("/getDepartmentReflections", getDepartmentReflections);
router.get("/getAllReflections", getAllReflections);

module.exports = router;