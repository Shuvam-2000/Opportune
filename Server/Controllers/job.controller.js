import JobModel from "../models/job.model.js";
import CompanyModel from "../models/company.model.js";

// creating new job
export const createNewJob = async (req,res) => {
    try {
        const { jobTitle, 
                jobDescription, 
                jobRequirements, 
                packageOffered, 
                jobLocation, 
                jobType, 
                openPositions,
                experience } = req.body;
    
        // check if all the fields provided to create new job
        if(!jobTitle || 
            !jobDescription || 
            !jobRequirements ||  
            !jobLocation || 
            !jobType || 
            !openPositions ||
            !experience ) return res.status(404).json({
                message: 'All Fields Are Required',
                success: false
            }); 

        // extracting userID from the middleware
        const userId = req.user?.id;
        
        // extract the company associated with the userId
        const company = await CompanyModel.findOne({ userId: userId });

        // check if company exists 
        if(!company) return res.status(404).json({
            message: 'Compnay Does Not Exists',
            success: false
        })

        // extract company id from the database
        const companyId = company._id;

        // create new job for the said company
        const createNewJob = await new JobModel({
            jobTitle, 
            jobDescription, 
            jobRequirements, 
            packageOffered, 
            jobLocation, 
            jobType, 
            openPositions,
            experience,
            company: companyId,
            jobcreated_by: userId
        });

        // save the new created job to the database
        createNewJob.save();
        res.status(201).json({
            message: `Job created successfully JobTitle: ${jobTitle}`,
            success: true,
            createNewJob
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}

// get all the created jobs
export const getAllJobs = async (req,res) => {
    try {

        // fetching jobs with keyword
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {jobTitle:{$regex:keyword, $options: 'i'}},
                {jobDescription:{$regex:keyword, $options: 'i'}},
                {jobRequirements:{$regex:keyword, $options: 'i'}}
            ]
        }

        // extract all jobs from the database
        const allJobs = await JobModel.find(query).populate({
            path: 'company'
        });

        // check if jobs avaliable
        if(!allJobs) return res.status(404).json({
            message: 'No Jobs Avaliable Now',
            success: false
        })

        res.status(201).json({
            message: 'Here are the Following Jobs Avaliable Now',
            success: true,
            allJobs
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}

// get jobs by Id
export const getJobsById = async (req,res) => {
    try {
        // fetching the job id from the req object
        const id = req.params.id;

        // check if id is avaliable
        if(!id) return res.status(404).json({
            message: 'Invalid Job Id',
            success: false
        })

        // find the job with its particular id
        const job = await JobModel.findById(id);

        // check if the job is avaliable
        if(!job) return res.status(404).json({
            message: 'Job Not Avaliabe Now',
            success: false
        })

        res.status(201).json({
            message: 'Job Is Avaliable',
            success: true,
            job
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}
