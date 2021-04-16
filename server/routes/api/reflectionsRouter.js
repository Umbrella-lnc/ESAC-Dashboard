const express = require("express");
const router = express.Router();

const {
    createReflection,
    deleteReflection,
    commentOnReflection,
    deleteComment,
    getDepartmentReflections,
    getAllReflections,
    toggleStatus,
} = require("../../controllers/reflectionsController.js");

router.post("/createReflection", createReflection);
router.post("/deleteReflection", deleteReflection);
router.post("/commentOnReflection", commentOnReflection);
router.post("/deleteComment", deleteComment);
router.post("/toggleStatus", toggleStatus);
router.get("/getDepartmentReflections", getDepartmentReflections);
router.get("/getAllReflections", getAllReflections);

module.exports = router;
