const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    resumeUrl:{
        type:String,
        required:true
    },
});

const Resume = mongoose.model('resume',resumeSchema);

module.exports = Resume;