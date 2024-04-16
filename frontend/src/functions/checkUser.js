const checkUser = async () => {
    try {
        const token = document.cookie.split("; ").find((row) => row.startsWith("LOGIN_INFO")).split("=")[1]
        const currUser = JSON.parse(sessionStorage.getItem('user'))
        if (!currUser) {
            // const currUser = await fetch("http://localhost:5000/api/auth/getLoggedInUser", {
            const currUser = fetch("https://aeonaxy-8u8e.onrender.com/api/auth/getLoggedInUser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: document.cookie
                        .split("; ")
                        .find((row) => row.startsWith("LOGIN_INFO"))
                        .split("=")[1],
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    // console.log(data.user, "user this is its")
                    window.sessionStorage.setItem('user', JSON.stringify(data.user))
                    return data.user
                })
            console.log(currUser, "curru")
            if (currUser == null){
                return { "message": "Invalid Token", "error": true }
            }
            else{
                return { "user": currUser, "message": "User found.", "error": false}
            }
        }
        else {
            return { "user": currUser, "message": "User found.", "error": false}
        }
    }
    catch (err) {
        return { "error": true, "message": "No user found."}
    }
}
export default checkUser;