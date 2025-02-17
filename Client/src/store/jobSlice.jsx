import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState:{
        alljobs: [],   // store the job data in array
        singlejob: null  // store single job information
    },
    reducers:{
        // actions
        setallJobs:(state,action) => {
            state.alljobs = action.payload   // get all jobs data from backend
        },
        setSingleJob:(state, action) => {
            state.singlejob = action.payload  // get single job from backend
        }
    }
})

export const { setallJobs, setSingleJob } = jobSlice.actions;
export default jobSlice.reducer;