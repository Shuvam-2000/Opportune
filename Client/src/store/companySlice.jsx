import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null  // set single company to null by default
    },
    reducers:{
        // actions
        setSingleCompany:(state,action) => {
            state.singleCompany = action.payload  // set single company to data
        }
    }
});

export const { setSingleCompany } = companySlice.actions;
export default companySlice.reducer;