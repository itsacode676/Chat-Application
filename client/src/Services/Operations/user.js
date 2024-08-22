import { setLoading, setUser } from "../../Slices/AuthSlice";
import { setData } from "../../Slices/DrawerSlice";
import { setSearchLoading } from "../../Slices/LoadingSlice";
import { apiConnector } from "../ApiConnector";
import { apiEndpoints } from "../Apis";
import toast from "react-hot-toast";

const{
    user_update 
} = apiEndpoints

export function searchSender(data, token) {
    return async (dispatch) => {
        dispatch(setSearchLoading(true))
        try {
            console.log(data)
            const response = await apiConnector("GET",
                `http://localhost:8000/api/v1/user/find?search=${data}`, null, {
                Authorization: `Bearer ${token}`
            })
            if (!response?.data?.success) {
                throw new Error(response?.data?.message)
            }
            console.log(response?.data?.data)
           dispatch(setData(response?.data?.data))
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message)
        }
        dispatch(setSearchLoading(false))
    }
}

export function userUpdate(data, user) {
    return async (dispatch) => {
        try {
            const response = await apiConnector("POST",user_update, data, {
                Authorization: `Bearer ${user.token}`
            })
            if (!response?.data?.success) {
                throw new Error(response?.data?.message)
            }
            console.log(response?.data?.data)
            const newData = {
                token:user.token,
                firstName:response?.data?.data.firstName,
                lastName:response?.data?.data.lastName,
                email:user.email,
                pic:response?.data?.data.pic
            }
            dispatch(setUser(newData))
            localStorage.setItem("user",JSON.stringify(newData))
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message)
        }
    }
}