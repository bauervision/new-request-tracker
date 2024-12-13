"use client";

import Link from "next/link";
import "./Navbar.css";
import RoleDropdown from "../RoleDropDown"; // Ensure this path is correct
import { useUser } from "@/app/context/UserContext";

// dynamic style: inactive route
const inactiveHeaderStyle = {
  color: "#000000",
};

function Navbar() {
  const { user } = useUser();

  return (
    <div className="Header border-b" data-testid="Header">
      <div className="flex justify-between items-center w-full">
        <div className="flex space-x-4">
          <div className="headerSection">
            <Link href="/">Leidos</Link>
          </div>

          {/* request tracker */}
          <div className="headerItem" data-testid={`Header name`}>
            <Link
              className="navLink"
              style={inactiveHeaderStyle}
              data-testid="NavLink"
              href="/request-tracker"
            >
              Request Tracker
            </Link>
          </div>

          {/* eCatalog */}
          <div className="headerItem" data-testid={`Header name`}>
            <Link
              className="navLink"
              style={inactiveHeaderStyle}
              data-testid="NavLink"
              href="#"
            >
              eCatalog
            </Link>
          </div>

          {/* Program management */}
          <div className="headerItem" data-testid={`Header name`}>
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
        {/* Role Display and Dropdown */}{" "}
        <div
          className="flex items-center space-x-4 headerItem"
          data-testid={`Header role-switch`}
        >
          <span>{user.name}</span>
          <RoleDropdown />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
