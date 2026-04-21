import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { petAPI, adoptionAPI } from "../services/api";
import { toast } from "react-toastify";
import "./PetDetails.css";

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

const PetDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    const [pet, setPet] = useState(null);

    const [status, setStatus] =
    useState("NONE");

    const [globalStatus,
    setGlobalStatus] =
    useState("NONE");

    useEffect(() => {
        fetchPet();
    }, []);

    const fetchPet = async () => {

        try {

            let res;

            if (
                user &&
                user.role === "ADMIN"
            ) {
                res =
                await petAPI.getAllPetsAdmin();
            } else {
                res =
                await petAPI.getAllPets();
            }

            const found =
            res.data.find(
              p =>
              Number(p.id) ===
              Number(id)
            );

            setPet(found);

            if(found){
                checkGlobalStatus(found.id);
            }

            if (
                found &&
                user &&
                user.role !== "ADMIN"
            ) {
                checkStatus(found.id);
            }

        } catch (error) {
            toast.error(
             "Error Loading Pet"
            );
        }
    };

    const checkStatus =
    async (petId) => {

        if (!user) return;

        try {

            const res =
            await adoptionAPI.getStatus(
                user.id,
                petId
            );

            setStatus(res.data);

        } catch (error) {
            setStatus("NONE");
        }
    };

    const checkGlobalStatus =
    async (petId) => {

        try {

            const res =
            await adoptionAPI.getPetStatus(
                petId
            );

            setGlobalStatus(
                res.data
            );

        } catch (error) {
            setGlobalStatus(
             "NONE"
            );
        }
    };

    const handleAdopt =
    async () => {

        try {

            await adoptionAPI.adoptPet({
                userId: user.id,
                petId: pet.id
            });

            setStatus("PENDING");
            setGlobalStatus(
             "PENDING"
            );

            toast.success(
             "Request Sent ❤️"
            );

        } catch (error) {
            toast.error(
             "Request Failed"
            );
        }
    };

    const handleRevoke =
    async () => {

        try {

            await adoptionAPI.revokeRequest(
                user.id,
                pet.id
            );

            setStatus("NONE");
            setGlobalStatus(
             "NONE"
            );

            toast.info(
             "Request Revoked"
            );

        } catch (error) {
            toast.error("Failed");
        }
    };

    const getImage = (breed) => {

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

    if (!pet)
        return <h2>Loading...</h2>;

    return (
        <div className="details-page">

            <button
             className="back-btn"
             onClick={() =>
              navigate(-1)
             }>
                Back
            </button>

            <div className="details-card">

                <div className="details-image-box">

                    <img
                     src={
                      getImage(
                       pet.breed
                      )
                     }
                     alt={pet.name}
                     className="details-image"
                    />

                </div>

                <div className="details-info">

                    <h1>{pet.name}</h1>

                    <p><b>Breed:</b> {pet.breed}</p>
                    <p><b>Age:</b> {pet.age}</p>
                    <p><b>Description:</b> {pet.description}</p>

{/* USER BUTTONS */}

{user &&
user.role !== "ADMIN" &&
status === "NONE" &&
(
globalStatus === "NONE" || globalStatus === "REJECTED")&&(

<button
className="adopt-btn"
onClick={handleAdopt}>
Adopt ❤️
</button>

)}

{status === "PENDING" && (

<button
className="revoke-btn"
onClick={handleRevoke}>
Pending ⏳ / Revoke ❌
</button>

)}

{status === "APPROVED" && (

<button className="approved-btn">
Approved ✅
</button>

)}

{status === "REJECTED" && (

<button
className="revoke-btn"
onClick={handleAdopt}>
Rejected ❌ / Adopt Again
</button>

)}

{status === "NONE" &&
globalStatus === "PENDING" && (

<button className="approved-btn">
Requested By Another User ⏳
</button>

)}

{status === "NONE" &&
globalStatus === "APPROVED" && (

<button className="approved-btn">
Already Adopted 🏠
</button>

)}

                </div>

            </div>

        </div>
    );
};

export default PetDetails;