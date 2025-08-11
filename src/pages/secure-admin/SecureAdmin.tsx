import React from "react";
import { Link } from "react-router-dom";

const SecureAdmin = () => {
  return (
    <div style={{ padding: 32 }}>
      <h1>Secure Admin</h1>
      <div style={{ marginBottom: 24 }}>
        <Link
          to="/secure-admin/gaia-engine-blueprint"
          style={{
            display: "inline-block",
            margin: "0 12px 0 0",
            padding: "10px 20px",
            background: "#2ecc40",
            color: "white",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          GAIA Engine Blueprint
        </Link>
        <Link
          to="/secure-admin/wallets-overview"
          style={{
            display: "inline-block",
            margin: "0 12px 0 0",
            padding: "10px 20px",
            background: "#0074d9",
            color: "white",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Wallets Overview
        </Link>
      </div>
      <div>
        <p>
          Welcome to the Secure Admin dashboard. Use the buttons above to access
          admin tools and documentation.
        </p>
      </div>
    </div>
  );
};

export default SecureAdmin;
