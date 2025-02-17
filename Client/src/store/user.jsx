import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice.jsx';
import jobSlice from './jobSlice.jsx'

export const store = configureStore({
    reducer:{
        auth: authSlice,
        job: jobSlice
    }
});
