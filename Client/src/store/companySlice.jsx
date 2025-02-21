import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,  // set single company to null by default
        allcompanies: []  // set all companies data to empty array by default
    },
    reducers:{
        // actions
        setSingleCompany:(state,action) => {
            state.singleCompany = action.payload  // set single company to data
        },
        setAllCompany:(state,action) => {
            state.allcompanies = action.payload  // set all companies to data
        }
    }
});

export const { setSingleCompany, setAllCompany } = companySlice.actions;
export default companySlice.reducer;