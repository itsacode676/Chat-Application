import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "../Slices/AuthSlice";
export const rootReducer = combineReducers(
    {
        auth:AuthSlice
    }
)