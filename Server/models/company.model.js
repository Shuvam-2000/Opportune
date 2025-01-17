import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    description: {
       type: String
    },
    companyWebsite: {
        type: String
    },
    companyLocation: {
        type: String
    },
    companyLogo: {
        type: String   // URL of the company
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,   // user registered the company
        ref: 'Users',
        required: true
    }
},{timestamps: true});

const CompanyModel = mongoose.model('Company', CompanySchema);

export default CompanyModel;