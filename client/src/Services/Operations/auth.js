import { setLoading, setOtp, setToken , setUser} from "../../Slices/AuthSlice";
import { apiConnector } from "../ApiConnector";
import { apiEndpoints } from "../Apis";
import toast from "react-hot-toast";

const {
    signup_url,
    otp_url,
    login_url
} = apiEndpoints

export function otp(data) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", otp_url, data)
            console.log(response?.data)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success(response?.data?.message)
            dispatch(setOtp(response?.data?.data?.otp))
            dispatch(setLoading(false))
        } catch (err) {
            toast(err?.response?.data?.message)
            console.log(err)
        }
        dispatch(setLoading(false))
    }
}

export function signup(data) {
    return async (dispatch) => {
        console.log(data)
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", signup_url, data)
            console.log(response?.data)
            if (!response?.data?.success) {
                throw new Error(response?.data?.message)
            }
            toast.success(response?.data?.message)
            dispatch(setLoading(false))
        } catch (err) {
            toast(err?.response?.data?.message)
        }
        dispatch(setLoading(false))
    }
}

export function login(data) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", login_url, data);
            console.log(response?.data);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            const userData = response?.data?.data;
            dispatch(setUser(userData));
            dispatch(setToken(userData?.token));
            localStorage.setItem("token", JSON.stringify(userData?.token));
            toast.success(response?.data?.message);
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        } finally {
            dispatch(setLoading(false));
        }
    };
}
