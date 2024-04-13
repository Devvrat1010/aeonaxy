const checkUser = async () => {
    try {
        const token = document.cookie.split("; ").find((row) => row.startsWith("LOGIN_INFO")).split("=")[1]
        const currUser = JSON.parse(sessionStorage.getItem('user'))
        if (!currUser) {
            const currUser = fetch("http://localhost:5000/api/auth/getLoggedInUser", {
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
                    // setCurrUser(data.user);
                    // console.log(data);
                    return data.user
                })
            return { "currUser": currUser, "message": "User found.", "error": false}
        }
        else {
            return { "currUser": currUser, "message": "User found.", "error": false}
        }
    }
    catch (err) {
        return { "error": true, "message": "No user found."}
    }
}
export default checkUser;