import {jwtDecode} from "jwt-decode";

function UserData() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
        try {
            const decode = jwtDecode(access_token);
            return decode;
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    }
    return null;
}

export default UserData;
