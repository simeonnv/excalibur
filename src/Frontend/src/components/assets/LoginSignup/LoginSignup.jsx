import React, { act, useState } from 'react';
import './LoginSignup.css';


const LoginSignup = () => {

    const [action, setAction] = useState("Sign up");

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
                        <input type="text" placeholder='Username'/>
                    </div>}

                    <div className="input">
                        <img src="" alt="" />
                        <input type="email" placeholder='E-Mail Adress'/>
                    </div>
                    <div className="input">
                        <img src="" alt="" />
                        <input type="password" placeholder='Password'/>
                    </div>
                </div>
                {action==="Sign up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click here!</span></div>}
                <div className="submit-container">
                    <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign up")}}>
                        Sign up
                    </div>
                    <div className={action==="Sign up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>
                        Login
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default LoginSignup