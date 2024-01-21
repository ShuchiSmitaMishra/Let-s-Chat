import React, { useState } from "react";
import Add from "../img/addAvatar.jpg"
import { useNavigate, Link } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;
        console.log(email)
        console.log(password)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (err) {
            console.log(err);
            setErr(true);
        }
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Let's Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="display email"/>
                    <input type="password" placeholder="display password"/>
                    <button>Sign in</button>
                    {err && <span>Something Went Wrong</span>}
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>    
    )
}

export default Login