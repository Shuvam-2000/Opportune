import mongoose from "mongoose";

const JobSchema = mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobRequirements: {
        type: String,
        required: true
    },
    packageOffered: {
        type: Number,
    },
    jobLocation: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    openPositions: {
        type: Number,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,   // the company posting the job
        ref: 'Company',
        required: true
    },
    jobcreated_by: {
        type: mongoose.Schema.Types.ObjectId,   // job posted by the user(HR)
        ref: 'Users',
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,   // reference to the application model
            ref: 'Applications'
        }
    ]
}, {timestamps: true});

const JobModel = mongoose.model('Jobs', JobSchema);

export default JobModel;