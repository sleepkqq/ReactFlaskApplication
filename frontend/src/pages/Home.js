import React, {useEffect, useState} from "react";
import httpClient from '../httpClient'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";

export function Home() {

    const [user, setUser] = useState(null);
    useNavigate();
    useEffect(() => {
        document.title = "Home page"
    }, []);

    useEffect(() => {
         fetch('/current_user')
             .then(res => res.json())
             .then(data => {
                 if (data.success) {
                     setUser(data);
                 }
             })
     }, []);

    const logout = async (event) => {
        event.preventDefault();

        const response = await httpClient.post('/logout');
        if (response.data.success) {
            window.location.reload();
        } else {
            toast.error(response.data.message, {
                position: "top-right",
                autoClose: 3000
            })
        }
    }

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome {user.username}</h1>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h1>Welcome Guest</h1>
                    <a href="/login">
                        <button>Login</button>
                    </a>
                    <a href="/register">
                        <button>register</button>
                    </a>
                    <ToastContainer/>
                </div>
            )}
        </div>
    )
}