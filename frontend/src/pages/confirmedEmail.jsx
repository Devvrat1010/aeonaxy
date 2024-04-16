import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import checkUser from '../functions/checkUser';

export default function ConfirmedEmail() {

    const navigate = useNavigate();
    const getLatestUserData = async (username) => {
        fetch('http://localhost:5000/api/auth/getLoggedInUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("LOGIN_INFO"))
                    .split("=")[1],
            }
        })
            .then(res => res.json())
            .then(data => {
                window.sessionStorage.setItem('user', JSON.stringify(data.user))
                console.log(data, "thisss")
            })
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await checkUser();
            console.log(result, 'user');
            
            if (result.error === true) {
                navigate("/signin");
            } else {
                getLatestUserData(result.user.username);
                console.log("hehe")

                // navigate("/");
                // setCurrUser(result.user);
            }
        };
        fetchData();
    }, [])

    return (
        <div>
            <h1 className='text-xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-bold m-auto w-fit mt-20'>Confirmed Email</h1>
            <a href="/">
                <h1 className='text-xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-bold m-auto w-fit mt-20 cursor-pointer hover:text-[#df4784]'>
                    Go back to home page
                </h1>
            </a>
        </div>
    )
}