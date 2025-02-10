import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null
    },
    reducers:{
        // actions
        setlodaing:(state, action) => {
            state.loading = action.payload  // set loading to true
        },
        setUser:(state, action) => {
            state.user = action.payload  // set user to data
        }
    }
})

export const { setlodaing, setUser } = authSlice.actions;
export default authSlice.reducer;