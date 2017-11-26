import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="pt-navbar pt-dark">
            <div className="pt-navbar-group pt-align-left">
                <div className="pt-navbar-heading">Task Manager</div>
            </div>
            <div className="pt-navbar-group pt-align-right">
                <div className="pt-input-group Search ">
                    <span className="pt-icon pt-icon-search" />
                    <input className="pt-input pt-round" placeholder="Search..." type="text" />
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
