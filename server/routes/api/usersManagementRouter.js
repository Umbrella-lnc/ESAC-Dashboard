const express = require("express");
const router = express.Router();

const {
    toggleVerifiedStatus,
    deleteUser,
    listUsers,
    getAllNamesWithID,
} = require("../../controllers/usersManagementController.js");

router.post("/toggleVerifiedStatus", toggleVerifiedStatus);
router.post("/deleteUser", deleteUser);
router.get("/listUsers", listUsers);
router.get("/getAllNamesWithID", getAllNamesWithID);

module.exports = router;
