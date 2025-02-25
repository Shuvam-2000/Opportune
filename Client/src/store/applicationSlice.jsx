import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: [] // Set applicants to empty array
    },
    reducers: {
        // actions
        setApplicants: (state, action) => {
            state.applicants = action.payload; // Set applicants to dta
        }
    }
});

export const { setApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
