import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    signupData:null,
    token:localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null,
    user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('token')):null,
    loading:false,
    otp:0
}

const AuthSlice = createSlice({
    name:"auth",
    initialState ,
    reducers : {
        setToken(state,value){
            state.token = value.payload
        },
        setSignupData(state,value){
            state.signupData = value.payload
        },
        setUser(state,value){
            state.user = value.payload
        },
        setLoading(state,value){
            state.loading = value.payload
        },
        setOtp(state,value){
            state.otp = value.payload
        },
    }
})

export const {setToken , setSignupData , setUser , setLoading , setOtp} = AuthSlice.actions
export default AuthSlice.reducer