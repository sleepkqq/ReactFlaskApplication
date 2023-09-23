import {useState} from "react";
import httpClient from "../httpClient";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";

export function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const register = async (event) => {
        event.preventDefault();

        const response = await httpClient.post('/register', {
            username,
            email,
            password,
        });

        if (response.data.success) {
            navigate('/login')
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
                <h1>Register</h1>
                <form>
                    <div>
                        <label>Username: </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                               id="username"/>
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                               id="email"/>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                               id="password"/>
                    </div>
                    <button type="button" onClick={register}>Submit</button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}