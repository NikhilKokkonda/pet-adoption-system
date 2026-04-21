import React, { useState } from 'react';
import { userAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import './Register.css';

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        contactNumber: '',
        role: 'USER'   
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await userAPI.register(formData);
            toast.success("Registered successfully");

            navigate("/login");

        } catch (error) {
            toast.error("Registration failed");
        }
    };

    return (
    <div className="register-container">
        <h2>Register</h2>

        <form className="register-form" onSubmit={handleSubmit}>

            <input type="text" name="name" placeholder="Name"
                onChange={handleChange} required />

            <input type="email" name="email" placeholder="Email"
                onChange={handleChange} required />

            <input type="password" name="password" placeholder="Password"
                onChange={handleChange} required />

            <input type="text" name="address" placeholder="Address"
                onChange={handleChange} />

            <input type="text" name="city" placeholder="City"
                onChange={handleChange} />

            <input type="text" name="state" placeholder="State"
                onChange={handleChange} />

            <input type="text" name="zipCode" placeholder="Zip Code"
                onChange={handleChange} />

            <input type="text" name="contactNumber" placeholder="Contact Number"
                onChange={handleChange} />

            <select name="role" onChange={handleChange}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
            </select>

            <button type="submit">Register</button>

        </form>
    </div>
);
};

export default Register;