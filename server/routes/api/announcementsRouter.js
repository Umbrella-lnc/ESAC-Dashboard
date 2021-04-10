const express = require('express');
const router = express.Router();

const announcementRoutes = require('../../controllers/announcementsController.js');


router.post("/createAnnouncement", announcementRoutes.createAnnouncement);
router.post("/deleteAnnouncement", announcementRoutes.deleteAnnouncement);
router.get("/getAnnouncements", announcementRoutes.getAnnouncements);

module.exports = router;