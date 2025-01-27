import ApplicationModel from "../models/application.model.js";
import JobModel from "../models/job.model.js";

// candidate apply to jobs
export const candidateApplyToJob = async (req,res) => {
    try {
        // extracting userId from the middleware
        const userId = req.user?.id;

        // check if userId exists
        if(!userId) return res.status(400).json({
            message: 'Invalid UserId',
            success: false
        });

        // fetching jobId with request parameters
        const jobId = req.params.id

        if(!jobId) return res.status(400).json({
            message: 'JobId is Required',
            success: false
        });

        // check if user already applied to the particular job 
        const exisitingApplication = await ApplicationModel.findOne({
            job: jobId, 
            applicant: userId
        });


        if(exisitingApplication) return res.status(400).json({
            message: 'You Already Applied For the Job',
            success: false
        })

        // check if the job exists
        const job = await JobModel.findById(jobId);

        if(!job) return res.status.json({
            message: 'Job Does Not Exists',
            success: false
        });

        // apply to a new job
        const applyToJob = new ApplicationModel({
            job: jobId,
            applicant: userId
        });

        // add the applications reference to the jobs collections
        job.applications.push(applyToJob._id);
        await job.save();  // save the application to the jobs collections in the db
        await applyToJob.save(); // save the job applied to the applications collection in the db

        return res.status(201).json({
            message: 'Applied To The Job SuccessFully',
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            applyToJob
        });
    }
}

// get all the jobs applied by the user
export const getAllJobsApplied = async (req,res) => {
    try {
        // extract userId from the middleware
        const userId = req.user?.id;

        if(!userId) return res.status(400).json({
            message: 'Invalid UserId'
        });

        // get all the jobs applied by the user in ascending order
        const applications = await ApplicationModel.find({ applicant: userId })
        .sort({ createdAt:-1 })
        .populate({
            path: 'job',
            options:{sort:{createdAt:-1}},  // sort the job in descending order
            populate:{  
                path: 'company',  // retrive the companyinfo 
                options:{sort:{createdAt:-1}},
            }
        })

        if(!applications) return res.status(400).json({
            message: 'User Has Not Applied To Any Job',
            success: false
        });

        res.status(201).json({
            message: 'Here Are the Jobs Applied By The User',
            success: true,
            applications
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}

// fetch no of user and the users Info applied to the job
export const getApplicants = async (req,res) => {
    try {

        // extracting the job with the id to find how many users applied
        const { id } = req.params;

        const job = await JobModel.findById(id).populate({
            path: 'applications',
            options:{sort:{createdAt:-1}},  // sort the job in descending order
            populate:{
                path: 'applicant'
            }
        });

        if(!job) return res.status(404).json({
            message: 'Job Not Found',
            success: false
        });

        res.status(200).json({
            message: 'Job Found',
            success: true,
            job
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}

// update job application status
export const applicationStatus = async (req,res) => {
    try {
        // job application status from the frontend
        const { applicationStatus } = req.body;

        if(!applicationStatus) return res.status(400).json({
            message: 'Status Is Required'
        })

        // extract applications Id 
        const applicationId = req.params.id;

        if(!applicationId) return res.status(400).json({
            message: 'Application Id is Required'
        });

        // find the job application by applicantionId
        const jobApplication = await ApplicationModel.findOne({ 
        _id: applicationId });

        if(!jobApplication) return res.status(400).json({
            message: 'Job Application Not Found',
            success: false
        });

        // update the application status as per requirement 
        jobApplication.applicationStatus = applicationStatus.toLowerCase();
        await jobApplication.save();  // save the updated status to the application collections in the db

        res.status(200).json({
            message: 'Job Application Found',
            success: true,
            jobApplication
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}