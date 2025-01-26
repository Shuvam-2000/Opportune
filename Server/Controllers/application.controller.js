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
        const applications = await ApplicationModel.find({ applicant: userId }).sort({ createdAt:-1 }).populate({
            path: 'job',
            options:{sort:{createdAt:-1}},  // sort the job in ascending order
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
        res.status.json({
            message: 'Internal Server Error',
            success: false
        });
    }
}