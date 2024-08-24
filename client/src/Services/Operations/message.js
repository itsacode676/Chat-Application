import { pushMessages } from "../../Slices/MessageSlice";
import { apiConnector } from "../ApiConnector";
import { apiEndpoints } from "../Apis";
import { setMessages} from "../../Slices/MessageSlice"


import toast from "react-hot-toast";

const {
    create_message,
    fetch_message
} = apiEndpoints

export function createMessage(data, token, socket) {
    return async (dispatch) => {
        try {
            console.log(socket)
            console.log(data)
            const response = await apiConnector("POST",
                create_message, data, {
                Authorization: `Bearer ${token}`
            })
            if (!response?.data?.success) {
                throw new Error(response?.data?.message)
            }
            console.log(response?.data?.data)
            socket.emit("new message",response?.data?.data)
            dispatch(pushMessages(response?.data?.data))

        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message);
        }

    }
}

export function fetchMessages(data, token, socket) {
    return async (dispatch) => {
        try {
            console.log(data);
            console.log(socket);

            const response = await apiConnector(
                "GET",
                `${fetch_message}${data}`,
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            console.log("DATA", response?.data?.data);
            dispatch(setMessages(response?.data?.data));

            if (socket) {
                socket.emit("join chat", data);
            } else {
                console.error("Socket is not initialized");
            }
        } catch (err) {
            console.log(err);
            toast.error(
                err?.response?.data?.message || "An unexpected error occurred."
            );
        }
    }
}