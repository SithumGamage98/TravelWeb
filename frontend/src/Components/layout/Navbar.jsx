import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
// import Sidebar from "./Sidebar";
import "./Styles/NavbarStyles.css";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import AuthContext from "../userManagement/authentication/UserContext";
import LogOut from "../userManagement/authentication/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout"; // New import for logout icon

function Navbar() {
  const { userType } = useContext(AuthContext);

  return (
    <>
      <div className="navbar-styles">
        <div className="navbar-items-left">
          <ul className="navbar-items">
            <li>
              <a href="/dashboard" style={{fontSize:"34px"}}>Travel Lanka</a>
            </li>
          </ul>
        </div>
        <div className="navbar-items-right">
          <ul className="navbar-items">
            {userType === null && (
              <>
                <li>
                  <a href="/register">
                    Register <HowToRegIcon /> |{" "}
                  </a>
                </li>
                <li>
                  <a href="/login">
                    Login <LoginIcon />{" "}
                  </a>
                </li>
              </>
            )}
            {userType === "Manager" && (
              <>
                <li>
                  <a href="/clientblogs" style={{fontSize:"24px"}}>Blogs</a>
                </li>
                <li>
                  <a href="/clienthotels" style={{fontSize:"24px"}}>Hotels</a>
                </li>
                <li>
                  <a href="/clientpackages" style={{fontSize:"24px"}}>Packages</a>
                </li>
                <li>
                  <a href="/clientevents" style={{fontSize:"24px"}}>Events</a>
                </li>
                <li>
                <a style={{ color: "white",fontSize:"24px" }}>| Manager</a>
                </li>
                <li>
                  <a href="/logout" style={{fontSize:"24px"}}>
                    <LogOut />
                  </a>
                </li>
              </>
            )}
            {userType === "Blogger" && (
              <>
              <li>
                  <a href="/clientblogs" style={{fontSize:"24px"}}>Blogs</a>
                </li>
                <li>
                  <a href="/blogs" style={{fontSize:"24px"}}>Blogs Management</a>
                </li>
                <li>
                <a style={{ color: "white", fontSize:"24px" }}>| Blogger</a>
                </li>
                <li>
                  <a href="/logout">
                    <LogOut />
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
