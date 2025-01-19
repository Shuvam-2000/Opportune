// verify the user role is recruiter
export const isUserRecruiter = async (req,res, next) => {
    try {
        if(req.user?.role !== 'recruiter') return res.status(403).json({
            message: 'Access Denied: Only recruiters can perform this action',
            success: false
        })
        next(); // if user is recruiter proceed to the next function
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}