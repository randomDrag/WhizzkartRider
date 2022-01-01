import axiosBaseUrl from "../axiosBaseUrl"
import { ACTIVE_USER } from "./Redux/userSlice"

const getProfile = (dispatch) => {

  
    axiosBaseUrl.get("profile")
    .then((res) => {
        console.log("Profile>> ", res.data.data)
        dispatch(ACTIVE_USER({activeUser: res.data.data}))
    })
    .catch((err) => console.log("ERR while fetching profile ", err))


}

export {getProfile}