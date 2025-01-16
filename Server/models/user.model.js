import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    fullname: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['candidate', 'recruiter'],  // select user role
        required: true
    },
    profile: {
       bio: {type: String},
       skills: [{type: String}],
       resume: {type: String}, // url for candidate resume
       resumeOriginalName: {type: String},  // resume orginal name(candiate.pdf)
       company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'}, // to check canditate applied to which companies
       profilePicture: {
            type: String,  // profile pic url
            default: ""    // if any user doesn't upload profle pic
       }
    }
},{timestamps: true});

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;