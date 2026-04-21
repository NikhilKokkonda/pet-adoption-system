import React, { useState, useEffect } from "react";
import { userAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (user) {
            navigate("/");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res =
            await userAPI.login(formData);

            if (
                !res.data ||
                res.data.message === "Invalid credentials"
            ) {
                toast.error("Invalid Email or Password");
                return;
            }

            localStorage.setItem(
                "user",
                JSON.stringify(res.data)
            );

            toast.success("Login Successful ✅");

            navigate("/");

        } catch (error) {
            console.log(error);
            toast.error("Login Failed");
        }
    };

    return (
        <div className="login-page">

            <div className="login-box">

                <h2>Login</h2>
                <p>Welcome back</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Login;