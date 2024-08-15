import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false
}

const LoadingSlice = createSlice({
    name:"loading",
    initialState,
    reducers:{
        setLoading(state,value){
            state.loading = value.payload
        }
    }
})

export {setLoading}