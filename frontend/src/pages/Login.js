import {useEffect, useState} from 'react';
import httpClient from '../httpClient'
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

     useEffect(() => {
         fetch('/current_user')
             .then(res => res.json())
             .then(data => {
                 if (data.success) {
                     navigate('/');
                 }
             })
     }, []);

    const login = async (event) => {
        event.preventDefault();

        const response = await httpClient.post('/login', {
            username,
            password,
        });

        if (response.data.success) {
            navigate('/');
        } else {
            toast.error(response.data.message, {
                position: "top-right",
                autoClose: 3000,
            })
        }
    };

    return (
        <div>
            <div className="container">
                <h1>Login</h1>
                <form>
                    <div>
                        <label>Username: </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                               id="username"/>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                               id="password"/>
                    </div>
                    <button type="button" onClick={login}>Submit</button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}