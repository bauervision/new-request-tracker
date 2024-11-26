"use client";

import Link from "next/link";
import "./Navbar.css";

// dynamic style: inactive route
const inactiveHeaderStyle = {
  color: "#000000",
};

function Navbar() {
  return (
    <div className="Header border-b" data-testid="Header">
      <div className="headerSection">
        <div className="headerSection">
          <Link href="/">Leidos</Link>
        </div>
      </div>

      {/* request tracker */}
      <div className="headerItem" data-testid={`Header name`}>
        <div>
          <Link
            className="navLink"
            style={inactiveHeaderStyle}
            data-testid="NavLink"
            href="/request-tracker"
          >
            Request Tracker
          </Link>
        </div>
      </div>

      {/* eCatalog */}
      <div className="headerItem" data-testid={`Header name`}>
        <div>
          <Link
            className="navLink"
            style={inactiveHeaderStyle}
            data-testid="NavLink"
            href="#"
          >
            eCatalog
          </Link>
        </div>
      </div>

      {/* Program management */}
      <div className="headerItem" data-testid={`Header name`}>
        <div>
          <Link
            className="navLink"
            style={inactiveHeaderStyle}
            data-testid="NavLink"
            href="#"
          >
            Program Management
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
