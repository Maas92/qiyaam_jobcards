const mongoose = require('mongoose');

const jobCardSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const JobCard = mongoose.model('JobCard', jobCardSchema);

module.exports =  JobCard;