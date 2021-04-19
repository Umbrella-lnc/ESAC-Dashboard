import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import { useLocation } from "react-router-dom";

const Navbar = (props) => {
    const [showNav, setShowNav] = React.useState(false);
    let browser_location = useLocation();

    React.useEffect(() => {
        const noShowLocs = ["/", "/login", "/register"];
        if (!noShowLocs.includes(window.location.pathname)) {
            setShowNav(true);
        } else {
            setShowNav(false);
        }
    }, [browser_location]);

    return (
        <div className="navbar-fixed">
            <nav className="z-depth-0">
                <div className="nav-wrapper white">
                    <BrowserRouter>
                        <Link
                            to="/"
                            style={{
                                fontFamily: "tahoma",
                            }}
                            className="col s5 brand-logo center blue-text"
                        >
                            <i className="material-icons">campaign</i>
                            ESAC
                        </Link>
                    </BrowserRouter>
                </div>
                {showNav && <AppNavbar />}
            </nav>
        </div>
    );
};
export default Navbar;
