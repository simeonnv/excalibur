import React, { act, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import axios from 'axios';

const LoginSignup = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Sign up");
    const [firstname, setFirstname] = useState('');
    const [secondname, setSecondname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
          try {
            const token = await localStorage.getItem('token');
            console.log(token)
            const response = await axios.post('http://localhost:5000/checktoken', {token});
            console.log(response.data.isAuthenticated)
            
            if (response.data.isAuthenticated)
                navigate('/');
            else
                localStorage.clear()

          } catch (error) {
            console.error('There was an error!', error);
          }
        };
    
        checkAuth();
    }, []);




    const handleSubmit = async (type) => {
        if (type === "Sign up")
            try {
                const response = await axios.post('http://localhost:5000/register', {
                    firstname,
                    secondname,
                    email,
                    password,
                });
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    navigate('/');
                }
                console.log(response.data);
                alert(response.data.message);
            } catch (error) {
                console.error('There was an error!', error);
            }
        else
            try {
                const response = await axios.post('http://localhost:5000/login', {
                    email,
                    password,
                });
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    navigate('/');
                }
                console.log(response.data);
                alert(response.data.message);
            } catch (error) {
                console.error('There was an error!', error);
            }
    };

    return (
        <div className='containerr'>
            <div className="headerr">
                <div className="text">
                    {action}
                    <div className="underline"></div>
                </div>
                <div className="inputts">
                    {action==="Login"?<div></div>:
                    <div className="inputt">
                        <input 
                            type="text" 
                            value={firstname}
                            placeholder='First name'
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                    <div className="inputt">
                        <input 
                            type="text" 
                            value={secondname}
                            placeholder='Last name'
                            onChange={(e) => setSecondname(e.target.value)}
                            required
                        />
                            
                    </div>
                    </div>}


                    <div className="inputt">
                        <input 
                            type="email" 
                            placeholder='E-Mail Adress'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="inputt">
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
