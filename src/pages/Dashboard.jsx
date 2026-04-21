import React, { useEffect, useState } from "react";
import { petAPI, adoptionAPI } from "../services/api";
import { toast } from "react-toastify";
import "./Dashboard.css";

const Dashboard = () => {

    const [pets, setPets] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {

            const petRes =
            await petAPI.getAllPetsAdmin();

            setPets(petRes.data);

            const reqRes =
            await adoptionAPI.getAllRequests();

            setRequests(reqRes.data);

        } catch (error) {
            toast.error("Failed to Load Dashboard");
        }
    };

    const updateStatus = async (id, status) => {
        try {

            await adoptionAPI.updateStatus(
                id,
                status
            );

            if (status === "APPROVED") {
                toast.success(
                  "Request Approved ✅"
                );
            } else {
                toast.warning(
                  "Request Rejected ❌"
                );
            }

            loadData();

        } catch (error) {
            toast.error("Action Failed");
        }
    };

    const getPetName = (petId) => {

        const pet = pets.find(
            (p) =>
            Number(p.id) === Number(petId)
        );

        return pet ? pet.name : "Unknown";
    };

    return (
        <div className="dashboard-container">

            <h1>Admin Dashboard</h1>

            <div className="dashboard-cards">

                <div className="card">
                    <h2>{pets.length}</h2>
                    <p>Total Pets</p>
                </div>

                <div className="card">
                    <h2>{requests.length}</h2>
                    <p>Total Requests</p>
                </div>

                <div className="card">
                    <h2>
                        {
                          requests.filter(
                            r =>
                            r.status ===
                            "PENDING"
                          ).length
                        }
                    </h2>
                    <p>Pending</p>
                </div>

            </div>

            <h2 className="req-head">
                Adoption Requests
            </h2>

            <div className="req-grid">

                {requests.map((r) => (

                    <div
                     key={r.id}
                     className="req-card"
                    >

                        <p>
                          <b>User ID:</b>
                          {" "}
                          {r.userId}
                        </p>

                        <p>
                          <b>Pet:</b>
                          {" "}
                          {getPetName(r.petId)}
                        </p>

                        <p>
                          <b>Status:</b>

                          <span
                           className={
                            r.status ===
                            "APPROVED"
                            ? "green"
                            : r.status ===
                            "REJECTED"
                            ? "red"
                            : "orange"
                           }
                          >
                           {" "}
                           {r.status}
                          </span>
                        </p>

                        {r.status ===
                         "PENDING" && (

                            <div
                             className="btn-row"
                            >

                                <button
                                 className=
                                 "approve-btn"

                                 onClick={() =>
                                  updateStatus(
                                   r.id,
                                   "APPROVED"
                                  )
                                 }
                                >
                                    Approve
                                </button>

                                <button
                                 className=
                                 "reject-btn"

                                 onClick={() =>
                                  updateStatus(
                                   r.id,
                                   "REJECTED"
                                  )
                                 }
                                >
                                    Reject
                                </button>

                            </div>
                        )}

                    </div>
                ))}

            </div>

        </div>
    );
};

export default Dashboard;