const express = require('express');
const JobCardController = require('../controllers/jobCardController');
const router = express.Router();

// Routes
router
  .route('/')
  .get(JobCardController.getAllJobCards)
  .post(JobCardController.createJobCard)

module.exports = router;