const JobCard = require('./../models/jobCardModel')
const factory = require('./handlerFactory')

exports.getAllJobCards = factory.getAll(JobCard)
exports.getJobCard = factory.getOne(JobCard)
exports.createJobCard = factory.createOne(JobCard)
// exports.updateReview = factory.updateOne(Review)
// exports.deleteReview = factory.deleteOne(Review)