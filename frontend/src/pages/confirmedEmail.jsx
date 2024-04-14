import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import checkUser from '../functions/checkUser';

export default function ConfirmedEmail() {

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await checkUser();
            console.log(result, 'user');

            if (result.error === true) {
                navigate("/signin");
            } else {
                console.log("hehe")
                // navigate("/");
                // setCurrUser(result.user);
            }
        };
        fetchData();
    }, [])

    return (
        <div>
            <h1>Confirmed Email</h1>
        </div>
    )
}