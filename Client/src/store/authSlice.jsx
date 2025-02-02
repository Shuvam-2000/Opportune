import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false
    },
    reducers:{
        // actions
        setlodaing:(state, action) => {
            state.loading = action.payload  // set loading to true
        }
    }
})

export const { setlodaing } = authSlice.actions;
export default authSlice.reducer;