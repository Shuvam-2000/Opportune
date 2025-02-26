import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: null // Set applicants to null
    },
    reducers: {
        // actions
        setApplicants: (state, action) => {
            state.applicants = action.payload; // Set applicants to data
        },
        resetApplicants: (state) => {
            state.applicants = null; // Reset data to null when changing jobs
        },
        updateStatus: (state, action) => {  // update status of job application
            const { id, status } = action.payload;
            state.applicants.applications = state.applicants.applications.map((applicant) =>  
                applicant._id === id ? { ...applicant, applicationStatus: status } : applicant
            );
        }
    }
});

export const { setApplicants, resetApplicants, updateStatus  } = applicationSlice.actions;
export default applicationSlice.reducer;
