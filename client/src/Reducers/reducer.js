import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "../Slices/AuthSlice";
import DrawerSlice from "../Slices/DrawerSlice";
import ModalSlice from "../Slices/ModalSlice";
import ChatSlice from "../Slices/ChatSlice";
import LoadingSlice from "../Slices/LoadingSlice";
import MessageSlice from "../Slices/MessageSlice";

export const rootReducer = combineReducers(
    {
        auth:AuthSlice,
        drawer:DrawerSlice,
        modal:ModalSlice,
        chat:ChatSlice,
        loading:LoadingSlice,
        message:MessageSlice
    }
)