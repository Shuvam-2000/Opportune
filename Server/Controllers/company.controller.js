import CompanyModel from "../models/company.model.js";

// register new company
export const registerCompany = async (req,res) => {
    try {
        const { companyName, description, companyWebsite, companyLocation, companyLogo } = req.body;

        // check if he required fields are given 
        if(!companyName || !description || !companyLocation) return res.status(400).json({
            message: 'Company Name is Required',
            success: false
        });

        // extract the userId from the middleware
        const userId = req.user?.id;

        // Ensure userId is available
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: Missing userId",
                success: false,
            });
        }

        // check if company already registered
        const company = await CompanyModel.findOne({ companyName })
        if(company) return res.status(400).json({
            message: `${companyName} is already registered`,
            success: false
        });

        // register new company with the given fields
        const registerNewCompany = new CompanyModel({
            companyName,
            description,
            companyWebsite,
            companyLocation,
            companyLogo,
            userId
        });

        // save the company details to the database
        await registerNewCompany.save();
        res.status(201).json({
            message: `Welcome to Opportune ${companyName}`,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}

// to fetch only the companies registered by the user with the userid
export const getRegisteredCompany = async (req,res) => {
    try {
        // extract the userId from the middleware
        const userId = req.user?.id;

        if(!userId) return res.status(401).json({
            message: 'UnAuthorized, UserID Not Found',
            success: false
        });

        // find all the companies in the database
        const allCompanies = await CompanyModel.find({ userId });

        // if companies are not found
        if(!allCompanies) return res.status(400).json({
            message: 'Companies Not Found',
            success: 'false'
        });

        res.status(201).json({
            message: 'Companies Found',
            success: true,
            allCompanies
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}

// get all the registred companies 
export const getAllcompanies = async (req,res) => {
    try {
        // extract all the comapnies from the database
        const companies = await CompanyModel.find()
        
        // check if comapnies avaliable in the database
        if(!companies) return res.status(400).json({
            message: 'No Comapnies Found',
            success: false
        })
        
        res.status(201).json({
            message: 'Companies Avaialble',
            success: true,
            companies
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}

// fetching companies by id
export const getcompaniesByID = async (req,res) => {
    try {
        const { id } = req.params;

        // check if the id mathces
        if(!id) return res.status(400).json({
            message: 'UserId Not Matched',
            success: false
        })

        // extract company info by id 
        const company = await CompanyModel.findById(id);
        
        if(!company) return res.status(400).json({
            message: `${id} not found`,
            success: false
        });

        res.status(201).json({
            message: 'Company Found',
            success: true,
            company
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}

// update registered Company Info
export const updateCompanyInfo = async (req,res) => {
    try {
        // fetching the fields to be updated
        const updates = req.body;

        // check if fields are provided
        if(!updates) return res.status(400).json({
            message: 'No fields Provided for update',
            success: false
        })

        // fetching the company details to be updated by id
        const id = req.params.id;

        if(!id) return res.status(400).json({
            message: 'Company Not Found',
            success: false
        })

        // extracting the userid from middleware
        const userId = req.user?.id;

        // updating the company details with the provided fields only 
        const updateCompanyInfo = await CompanyModel.findByIdAndUpdate({ 
            _id: id, userId: userId },  // Filter by company ID and user ID
            updates,   // Apply the updates
            {new: true});

        if(!updateCompanyInfo) return res.status(400).json({
            message: 'Error Updating Company Info. Please Try Again Later',
            success: false
        });

        res.status(201).json({
            message: 'Company Info Updated SuccessFully',
            success: true,
            updateCompanyInfo
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}