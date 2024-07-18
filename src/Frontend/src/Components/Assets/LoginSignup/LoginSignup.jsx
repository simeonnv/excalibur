import React, { act, useState } from 'react';
import './LoginSignup.css';
import axios from 'axios';


const LoginSignup = () => {

    const [action, setAction] = useState("Sign up");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (type) => {
        if (type === "Sign up")
            try {
                const response = await axios.post('http://localhost:5000/register', {
                    email,
                    username,
                    password,
                });
                console.log(response.data);
                alert(response.data.message);
            } catch (error) {
                console.error('There was an error!', error);
            }
        else
            try {
                const response = await axios.post('http://localhost:5000/login', {
                    username,
                    password,
                });
                console.log(response.data);
                alert(response.data.message);
            } catch (error) {
                console.error('There was an error!', error);
            }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">
                    {action}
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {action==="Login"?<div></div>:<div className="input">
                        <img src="" alt="" />
                        <input 
                            type="text" 
                            value={username}
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                            
                    </div>}

                    <div className="input">
                        <img src="" alt="" />
                        <input 
                            type="email" 
                            placeholder='E-Mail Adress'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input">
                        <img src="" alt="" />
                        <input 
                            type="password"
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                {action==="Sign up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click here!</span></div>}
                <div className="submit-container">
                    <div className={action==="Login"?"submit gray":"submit"} onClick={ () =>
                        {
                            if (action === "Sign up")
                                handleSubmit(action)
                            setAction("Sign up")
                        }}>
                        Sign up
                    </div>
                    <div className={action==="Sign up"?"submit gray":"submit"} onClick={ () => {

                            if (action === "Login")
                                handleSubmit(action)
                            setAction("Login")
                            
                        }}>
                        Login
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default LoginSignup