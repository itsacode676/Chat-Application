const auth_point = "http://localhost:8000/api/v1/auth"
export const apiEndpoints = {
    otp_url : `${auth_point}/otpGen`,
    signup_url : `${auth_point}/signup`,
    login_url:`${auth_point}/login`
}