import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat:null,
    chats:[],
    groupMembers:[],
    groupOption:true,
}

const ChatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedChat(state, value) {
            state.selectedChat = value.payload
        },
        setChats(state, value) {
            state.chats = value.payload
        },
        addMember(state, value) {
            if(!state.groupMembers.find(element => element._id === value.payload._id)){
            state.groupMembers.push(value.payload)
            }
        },
        removeMember(state,value) {
            state.groupMembers = state.groupMembers.filter(member => member._id != value.payload)
        }
    }
})

export const { setSelectedChat, setChats , addMember , removeMember} = ChatSlice.actions
export default ChatSlice.reducer