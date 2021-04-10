const express = require('express');
const router = express.Router();

const
{
    createAnnouncement,
    deleteAnnouncement,
    getAnnouncements
} = require('../../controllers/announcementsController.js');


router.post("/createAnnouncement", createAnnouncement);
router.post("/deleteAnnouncement", deleteAnnouncement);
router.get("/getAnnouncements", getAnnouncements);

module.exports = router;