import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

/* USER API */
export const userAPI = {
    register: (data) => api.post("/users", data),
    login: (data) => api.post("/users/login", data),
    getAllUsers: () => api.get("/users")
};

/* PET API */
export const petAPI = {
    getAllPets: () => api.get("/pets"),
    getAllPetsAdmin: () => api.get("/pets/all"),
    addPet: (data) => api.post("/pets", data),
    deletePet: (id) => api.delete(`/pets/${id}`),
    getPetById: (id) => api.get(`/pets/${id}`),
    updatePet: (id, data) => api.put(`/pets/${id}`, data)
};

/* ADOPTION API */
export const adoptionAPI = {
    adoptPet: (data) => api.post("/adoptions", data),
    getAllRequests: () => api.get("/adoptions"),

    updateStatus: (id, status) =>
        api.put(`/adoptions/${id}/${status}`),

    getStatus: (userId, petId) =>
        api.get(`/adoptions/status/${userId}/${petId}`),

    revokeRequest: (userId, petId) =>
        api.delete(`/adoptions/${userId}/${petId}`),

    getPetStatus: (petId) =>
        api.get(`/adoptions/pet-status/${petId}`)
};

export default api;