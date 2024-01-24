const express = require('express');
const feedbackCltr = require('../controllers/feedbackCltr');
const feedBackRoutes=express.Router()

feedBackRoutes.route("/create/feedback")
    .post(feedbackCltr.create)
// feedBackRoutes.route("/getFeedBacks")
//     .get(feedbackCltr.get)
module.exports = feedBackRoutes