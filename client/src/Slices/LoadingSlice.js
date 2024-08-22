import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchLoading:false,
    profileLoading:true
}

const LoadingSlice = createSlice({
    name:"loading",
    initialState,
    reducers:{
        setSearchLoading(state,value){
            state.searchLoading = value.payload
        },
        setProfilLoading(state,value){
            state.profileLoading = value.payload
        }
    }
});

export const {setSearchLoading , setProfilLoading} = LoadingSlice.actions;
export default LoadingSlice.reducer
