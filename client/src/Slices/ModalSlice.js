import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: false,
    logout: false,
    group: false
}

const ModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setProfileModal(state, value) {
            state.profile = value.payload
        },
        setLogoutModal(state, value) {
            state.logout = value.payload
        },
        setGroupModal(state, value) {
            state.group = value.payload
        },
    }
})

export const { setProfileModal, setLogoutModal, setGroupModal } = ModalSlice.actions
export default ModalSlice.reducer