import mongoose from "mongoose";

const ApplicationSchema = mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',          // refernce to the Job Model
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',   // user applied for the job
        required: true
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
},{timestamps: true});

const ApplicationModel = mongoose.model('Applications', ApplicationSchema);

export default ApplicationModel;