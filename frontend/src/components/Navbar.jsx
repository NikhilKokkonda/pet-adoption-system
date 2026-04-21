import React from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import { toast } from "react-toastify";

import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();

    const userData =
    localStorage.getItem("user");

    const user =
    userData
    ? JSON.parse(userData)
    : null;

    const handleLogout = () => {
        localStorage.removeItem("user");
        toast.info("Logged Out");
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="nav-container">

                <Link
                 to="/"
                 className="nav-logo"
                >
                    Care4Pets 🐾
                </Link>

                <div className="nav-menu">

                    <Link
                     to="/"
                     className="nav-link"
                    >
                        Home
                    </Link>

                    <Link
                     to="/pets"
                     className="nav-link"
                    >
                        Pets
                    </Link>

                    {!user && (
                        <>
                          <Link
                           to="/login"
                           className="nav-link"
                          >
                            Login
                          </Link>

                          <Link
                           to="/register"
                           className="nav-link"
                          >
                            Register
                          </Link>
                        </>
                    )}

                    {user &&
                     user.role === "ADMIN" && (
                        <>
                          <Link
                           to="/add-pet"
                           className="nav-link"
                          >
                            Add Pet
                          </Link>

                          <Link
                           to="/dashboard"
                           className="nav-link"
                          >
                            Dashboard
                          </Link>
                        </>
                    )}

                    {user && (
                        <button
                         className=
                         "logout-btn"

                         onClick={
                          handleLogout
                         }
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>

        </nav>
    );
};

export default Navbar;