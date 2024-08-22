import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    searchData:[]
}

const DrawerSlice = createSlice({
    name:"drawer",
    initialState ,
    reducers : {
        setOpen(state,value){
            state.open = value.payload
        },
        setData(state,value){
            state.searchData = value.payload
        }
    }
}
)

export const {setOpen , setData} = DrawerSlice.actions
export default DrawerSlice.reducer