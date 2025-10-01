"use client";

import React, { useState } from "react";
import Link from "next/link";

const DropdownNavbar: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const navLinkStyle: React.CSSProperties = {
    color: "#333",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(255, 255, 255, 0.4)", // transparent with blur
        backdropFilter: "blur(12px)", // glass effect
        border: "1px solid rgba(228, 224, 215, 0.6)",
        borderRadius: "12px",
        padding: "12px 30px",
        display: "flex",
        alignItems: "center",
        gap: "28px",
        zIndex: 1000,
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ ...navLinkStyle, fontWeight: "600" }}>
        Flow
      </Link>

      {/* Technology Dropdown */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setHovered("technology")}
        onMouseLeave={() => setHovered(null)}
      >
        <span style={navLinkStyle}>Technology ▾</span>
        {hovered === "technology" && (
          <div style={dropdownStyle}>
            <Link href="/tech/ai" style={dropdownItemStyle}>
              🤖 Artificial Intelligence
            </Link>
            <Link href="/tech/blockchain" style={dropdownItemStyle}>
              ⛓ Blockchain
            </Link>
            <Link href="/tech/quantum" style={dropdownItemStyle}>
              ⚛ Quantum Computing
            </Link>
          </div>
        )}
      </div>

      {/* About Us Dropdown */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setHovered("about")}
        onMouseLeave={() => setHovered(null)}
      >
        <span style={navLinkStyle}>About Us ▾</span>
        {hovered === "about" && (
          <div style={dropdownStyle}>
            <Link href="/about/company" style={dropdownItemStyle}>
              🏢 Company
            </Link>
            <Link href="/about/team" style={dropdownItemStyle}>
              👥 Team
            </Link>
            <Link href="/about/careers" style={dropdownItemStyle}>
              💼 Careers
            </Link>
          </div>
        )}
      </div>

      {/* Thoughts Dropdown */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setHovered("thoughts")}
        onMouseLeave={() => setHovered(null)}
      >
        <span style={navLinkStyle}>Our Thoughts ▾</span>
        {hovered === "thoughts" && (
          <div style={dropdownStyle}>
            <Link href="/thoughts/blog" style={dropdownItemStyle}>
              ✍️ Blog
            </Link>
            <Link href="/thoughts/research" style={dropdownItemStyle}>
              📊 Research
            </Link>
            <Link href="/thoughts/events" style={dropdownItemStyle}>
              🎤 Events
            </Link>
          </div>
        )}
      </div>

      {/* Contact Button */}
      <Link
        href="/contact"
        style={{
          ...navLinkStyle,
          background: "#7c3aed", // purple CTA button
          color: "white",
          padding: "8px 18px",
          borderRadius: "8px",
        }}
      >
        Contact
      </Link>
    </nav>
  );
};

/* Dropdown floating panel */
const dropdownStyle: React.CSSProperties = {
  position: "absolute",
  top: "40px",
  left: 0,
  background: "#fffaf3", // creamy tone
  border: "1px solid #e4e0d7",
  borderRadius: "12px",
  padding: "15px 20px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  minWidth: "220px",
  zIndex: 2000,
};

/* Dropdown item */
const dropdownItemStyle: React.CSSProperties = {
  color: "#333",
  textDecoration: "none",
  fontSize: "14px",
  padding: "8px 10px",
  borderRadius: "6px",
  transition: "all 0.2s ease",
};

export default DropdownNavbar;
