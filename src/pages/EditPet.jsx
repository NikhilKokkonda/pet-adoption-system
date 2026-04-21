import React, {
  useEffect,
  useState
} from "react";

import { petAPI } from "../services/api";
import {
  useNavigate,
  useParams
} from "react-router-dom";
import { toast } from "react-toastify";

import "./EditPet.css";

const EditPet = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] =
    useState({
        name:"",
        breed:"",
        age:"",
        description:""
    });

    useEffect(() => {
        fetchPet();
    }, []);

    const fetchPet = async () => {
        try {

            const res =
            await petAPI.getPetById(id);

            setFormData(res.data);

        } catch (error) {
            toast.error("Error Fetching Pet");
        }
    };

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

            await petAPI.updatePet(
                id,
                formData
            );

            toast.success("Updated Successfully ✅");

            navigate("/pets");

        } catch (error) {
            toast.error("Update Failed");
        }
    };

    return (
        <div className="editpet-page">

            <div className="editpet-box">

                <h2>Edit Pet ✏️</h2>
                <p>
                  Update pet details
                </p>

                <form
                 onSubmit={handleSubmit}
                >

                    <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     required
                    />

                    <input
                     type="text"
                     name="breed"
                     value={formData.breed}
                     onChange={handleChange}
                     required
                    />

                    <input
                     type="number"
                     name="age"
                     value={formData.age}
                     onChange={handleChange}
                     required
                    />

                    <textarea
                     name="description"
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
                        Update Pet
                    </button>

                </form>

            </div>

        </div>
    );
};

export default EditPet;