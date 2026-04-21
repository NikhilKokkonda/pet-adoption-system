import React, {
  useEffect,
  useState
} from "react";

import { petAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Pets.css";

import labrador from "../assets/images/labrador.jpg";
import husky from "../assets/images/husky.jpg";
import golden from "../assets/images/golden.jpg";
import german from "../assets/images/german.jpg";
import dog from "../assets/images/default-dog.jpg";
import pluto from "../assets/images/pluto.jpeg";
import beagle from "../assets/images/beagle.jpg";
import pug from "../assets/images/pug.jpg";
import persian from "../assets/images/persian.jpg";
import siamese from "../assets/images/siamese.jpg";
import mainecoon from "../assets/images/mainecoon.jpg";

const Pets = () => {

    const [pets, setPets] =
    useState([]);

    const navigate =
    useNavigate();

    const userData =
    localStorage.getItem("user");

    const user =
    userData
    ? JSON.parse(userData)
    : null;

    useEffect(() => {

        if (!user) {
            toast.info(
             "Please Login First"
            );
            navigate("/login");
            return;
        }

        fetchPets();

    }, []);

    const fetchPets =
    async () => {

        try {

            let res;

            if (
                user &&
                user.role === "ADMIN"
            ) {
                res =
                await petAPI
                .getAllPetsAdmin();
            } else {
                res =
                await petAPI
                .getAllPets();
            }

            setPets(res.data);

        } catch (error) {
            toast.error(
             "Error Fetching Pets"
            );
        }
    };

    const handleDelete =
    async (id) => {

        try {

            await petAPI
            .deletePet(id);

            toast.success(
             "Pet Deleted"
            );

            fetchPets();

        } catch (error) {
            toast.error(
             "Delete Failed"
            );
        }
    };

    const handleEdit =
    (id) => {
        navigate(
         `/edit-pet/${id}`
        );
    };

    const openDetails =
    (id) => {
        navigate(
         `/pet-details/${id}`
        );
    };

    const getImage =
    (breed) => {

        if (!breed) return dog;

        breed =
        breed.toLowerCase();

        if (breed.includes("lab"))
            return labrador;

        if (breed.includes("husky"))
            return husky;

        if (breed.includes("golden"))
            return golden;

        if (breed.includes("german"))
            return german;

        if (breed.includes("shih"))
            return pluto;

        if (breed.includes("beagle"))
            return beagle;

        if (breed.includes("pug"))
            return pug;

        if (breed.includes("persian"))
            return persian;

        if (breed.includes("siamese"))
            return siamese;

        if (breed.includes("maine"))
            return mainecoon;

        return dog;
    };

    return (
        <div className="pets-container">

            <h2 className="pets-title">
                🐾 All Pets
            </h2>

            <div className="pets-grid">

                {pets.map((pet) => (

                    <div
                     key={pet.id}
                     className="pet-card"
                     onClick={() =>
                      openDetails(
                       pet.id
                      )
                     }
                    >

                        <img
                         src={
                          getImage(
                           pet.breed
                          )
                         }
                         alt={pet.name}
                         className=
                         "pet-real-image"
                        />

                        <div className="pet-content">

                            <h3>{pet.name}</h3>

                            <p>
                             <b>Breed:</b>
                             {" "}
                             {pet.breed}
                            </p>

                            <p>
                             <b>Age:</b>
                             {" "}
                             {pet.age}
                            </p>

                            <p>
                             <b>Description:</b>
                             {" "}
                             {pet.description}
                            </p>

                            {pet.status ===
                             "ADOPTED" && (

                                <p
                                 style={{
                                  color:"green",
                                  fontWeight:"bold"
                                 }}
                                >
                                  Adopted ✅
                                </p>
                            )}

{/* ADMIN BUTTONS */}

{user &&
user.role === "ADMIN" && (

<div className="pet-buttons">

{pet.status !==
 "ADOPTED" && (

<button
onClick={(e)=>{
e.stopPropagation();
handleEdit(
pet.id
);
}}>
Edit
</button>

)}

<button
className="delete-btn"
onClick={(e)=>{
e.stopPropagation();
handleDelete(
pet.id
);
}}>
Delete
</button>

</div>

)}

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default Pets;