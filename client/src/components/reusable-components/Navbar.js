import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import AppNavbar from "./AppNavbar"

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <BrowserRouter>
              <Link
                to="/"
                style={{
                  fontFamily: "tahoma"
                }}
                className="col s5 brand-logo center blue-text"
              >
                <i className="material-icons">campaign</i>
                ESAC
              </Link>
            </BrowserRouter>
          </div>
          <div>
            <AppNavbar />
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;