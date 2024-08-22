import { setChats, setSelectedChat } from "../../Slices/ChatSlice";
import { apiConnector } from "../ApiConnector";
import { apiEndpoints } from "../Apis";
import toast from "react-hot-toast";

const {
    create_chat,
    fetch_chat,
    create_group,
    rename_group,
    remove_member,
    add_member
} = apiEndpoints


export function getChats(token) {
    return async (dispatch) => {
        try {
            const response = await apiConnector("GET", fetch_chat, null, {
                Authorization: `Bearer ${token}`
            })
            if (!response?.data?.success) {
                throw new Error(response?.data?.message)
            }
            console.log(response?.data?.data);
            dispatch(setChats(response?.data?.data))
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message)
        }
    }
}

export function createChat(data, token) {
    return async (dispatch) => {
        try {
            console.log("CHAT DATA", data)

            const response = await apiConnector("POST", create_chat, data, {
                Authorization: `Bearer ${token}`
            })
            if (!response?.data?.success) {
                throw new Error(response?.data?.message)
            }
            console.log(response?.data?.data)
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message)
        }
    }
}

export function createGroup(data, token) {
    return async (dispatch) => {
        try {
            console.log("GROUP DATA", data)

            const response = await apiConnector("POST", create_group, data, {
                Authorization: `Bearer ${token}`
            })
            if (!response?.data?.success) {
                throw new Error(response?.data?.message)
            }
            console.log(response?.data?.data)
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message)
        }
    }
}

export function renameGroup(data, token) {
    return async (dispatch) => {
        try {
            console.log("GROUP UPDATES", data)

            const response = await apiConnector("PUT", rename_group, data, {
                Authorization: `Bearer ${token}`
            })
            if (!response?.data?.success) {
                throw new Error(response?.data?.message)
            }
            dispatch(setSelectedChat(response?.data?.data))
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message)
        }
    }
}

export function removeFromGroup(data, token) {
    return async (dispatch) => {
        try {
            console.log("GROUP UPDATES", data)

            const response = await apiConnector("PUT", remove_member, data, {
                Authorization: `Bearer ${token}`
            })
            if (!response?.data?.success) {
                throw new Error(response?.data?.message)
            }
            dispatch(setSelectedChat(response?.data?.data))
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message)
        }
    }
}

export function addGroup(data, token) {
    return async (dispatch) => {
        try {
            console.log("GROUP UPDATES", data)

            const response = await apiConnector("PUT", add_member, data, {
                Authorization: `Bearer ${token}`
            })
            if (!response?.data?.success) {
                throw new Error(response?.data?.message)
            }
            dispatch(setSelectedChat(response?.data?.data))
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message)
        }
    }
}
