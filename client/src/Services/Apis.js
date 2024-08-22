const auth_point = "http://localhost:8000/api/v1/auth"
const chat_point = "http://localhost:8000/api/v1/chat"
const user_point = "http://localhost:8000/api/v1/user"
export const apiEndpoints = {
    otp_url: `${auth_point}/otpGen`,
    signup_url: `${auth_point}/signup`,
    login_url: `${auth_point}/login`,
    create_chat: `${chat_point}/createChat`,
    fetch_chat: `${chat_point}/getChats`,
    user_update:`${user_point}/updateUser`,
    create_group:`${chat_point}/CreateGroupChat`,
    rename_group:`${chat_point}/renameGroup`,
    remove_member:`${chat_point}/removeFromGroup`,
    add_member:`${chat_point}/addToGroup`
}