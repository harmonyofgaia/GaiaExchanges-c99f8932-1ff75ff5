import React from "react";
import { Link } from "react-router-dom";

const GaiaEngineBlueprintPage = () => {
  return (
    <div style={{ padding: 32 }}>
      <h1>GAIA Engine Blueprint</h1>
      <p>
        Access the full GAIA Engine Blueprint document below. This page provides a detailed,
        actionable plan for the engine's architecture, modules, and development process.
      </p>
      <a
        href="/GAIA_ENGINE_BLUEPRINT.md"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          margin: "16px 0",
          padding: "12px 24px",
          background: "#2ecc40",
          color: "white",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        View Blueprint Document
      </a>
      <div style={{ marginTop: 32 }}>
        <h2>What is the GAIA Engine Blueprint?</h2>
        <ul>
          <li>Vision, architecture, and feature breakdown</li>
          <li>Module checklist and responsibilities</li>
          <li>Example workflows and user stories</li>
          <li>Definition of done for the engine</li>
        </ul>
      </div>
    </div>
  );
};

export default GaiaEngineBlueprintPage;
