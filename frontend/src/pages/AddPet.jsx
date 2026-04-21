import React, {
  useState,
  useEffect
} from "react";

import { petAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./AddPet.css";

const AddPet = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        breed: "",
        age: "",
        description: ""
    });

    useEffect(() => {

        const userData =
        localStorage.getItem("user");

        const user =
        userData
        ? JSON.parse(userData)
        : null;

        if (!user) {
            toast.info("Please Login First");
            navigate("/login");
            return;
        }

        if (user.role !== "ADMIN") {
            toast.warning("Only Admin Allowed");
            navigate("/");
        }

    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
            e.target.value
        });
    };

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            await petAPI.addPet(formData);

            toast.success("Pet Added ✅");

            navigate("/pets");

        } catch (error) {
            toast.error("Failed To Add Pet");
        }
    };

    return (
        <div className="addpet-page">

            <div className="addpet-box">

                <h2>Add New Pet 🐾</h2>
                <p>
                  Fill pet details below
                </p>

                <form
                 onSubmit={handleSubmit}
                >

                    <input
                     type="text"
                     name="name"
                     placeholder="Pet Name"
                     value={formData.name}
                     onChange={handleChange}
                     required
                    />

                    <input
                     type="text"
                     name="breed"
                     placeholder="Breed"
                     value={formData.breed}
                     onChange={handleChange}
                     required
                    />

                    <input
                     type="number"
                     name="age"
                     placeholder="Age"
                     value={formData.age}
                     onChange={handleChange}
                     required
                    />

                    <textarea
                     name="description"
                     placeholder="Description"
                     rows="4"
                     value={
                      formData.description
                     }
                     onChange={handleChange}
                     required
                    />

                    <button
                     type="submit"
                    >
                        Add Pet
                    </button>

                </form>

            </div>

        </div>
    );
};

export default AddPet;