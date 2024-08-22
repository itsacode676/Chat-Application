import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    option:false
}

const MessageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setOption(state,value){
            state.option = value.payload
        }
    }
})

export const { setOption} = MessageSlice.actions
export default MessageSlice.reducer