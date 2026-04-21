import React, { useEffect, useState } from "react";
import { adoptionAPI } from "../services/api";

const AdminRequests = () => {

    const [requests,setRequests] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await adoptionAPI.getAllRequests();
        setRequests(res.data);
    };

    const update = async (id,status) => {
        await adoptionAPI.updateStatus(id,status);
        loadData();
    };

    return (
        <div style={{padding:"30px"}}>

            <h2>All Adoption Requests</h2>

            {requests.map((r) => (

                <div key={r.id}
                     style={{
                        border:"1px solid gray",
                        margin:"10px",
                        padding:"15px"
                     }}>

                    <p>User ID: {r.user_id}</p>
                    <p>Pet ID: {r.pet_id}</p>
                    <p>Status: {r.status}</p>

                    <button
                     onClick={() => update(r.id,"APPROVED")}>
                        Approve
                    </button>

                    <button
                     onClick={() => update(r.id,"REJECTED")}
                     style={{marginLeft:"10px"}}>
                        Reject
                    </button>

                </div>

            ))}

        </div>
    );
};

export default AdminRequests;