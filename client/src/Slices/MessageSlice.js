import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    option: false,
    messages: [],
    isTyping: false,
    notifications: []
}

const MessageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setOption(state, value) {
            state.option = value.payload
        },
        setMessages(state, value) {
            state.messages = value.payload
        },
        pushMessages(state, value) {
            state.messages.push(value.payload)
        },
        setIsTyping(state, value) {
            state.isTyping = value.payload
        },
        setNotification(state, value) {
            if (!state.notifications.includes(value.payload)) {
                state.notifications.push(value.payload)
            }
        }
    }
})

export const { setOption, setMessages, pushMessages, setIsTyping , setNotification} = MessageSlice.actions
export default MessageSlice.reducer