import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pets from "./pages/Pets";
import AddPet from "./pages/AddPet";
import EditPet from "./pages/EditPet";
import PetDetails from "./pages/PetDetails";
import AdminRequests from "./pages/AdminRequests";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/edit-pet/:id" element={<EditPet />} />
        <Route path="/pet-details/:id" element={<PetDetails />} />
        <Route path="/admin-requests" element={<AdminRequests />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    <ToastContainer
 position="top-right"
 autoClose={2500}
 />
    </Router>
  );
}

export default App;