import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState:{
        alljobs: [],   // store the job data in array
        singlejob: null,  // store single job information
        searchJobQuery: ""  // searched job query set to empty string
    },
    reducers:{
        // actions
        setallJobs:(state,action) => {
            state.alljobs = action.payload   // get all jobs data from backend
        },
        setSingleJob:(state, action) => {
            state.singlejob = action.payload  // get single job from backend
        },
        setSearchJobQuery:(state, action) => {
            state.searchJobQuery = action.payload  // get search job to query
        }
    }
})

export const { setallJobs, setSingleJob, setSearchJobQuery } = jobSlice.actions;
export default jobSlice.reducer;