"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const FloatingNavbar: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle: React.CSSProperties = {
    color: "#222",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "15px",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: "15px",
        left: "50%",
        transform: "translateX(-50%)",
        background: scrolled
          ? "rgba(255, 255, 255, 0.9)" // solid after scroll
          : "rgba(255, 255, 255, 0.35)", // glassy initially
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(200,200,200,0.4)",
        borderRadius: "14px",
        padding: "10px 28px",
        display: "flex",
        alignItems: "center",
        gap: "28px",
        boxShadow: scrolled
          ? "0 6px 20px rgba(0,0,0,0.1)"
          : "0 4px 10px rgba(0,0,0,0.06)",
        zIndex: 999,
        transition: "all 0.3s ease",
      }}
    >
      {/* Business */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setHovered("business")}
        onMouseLeave={() => setHovered(null)}
      >
        <span style={navLinkStyle}>Business ▾</span>
        {hovered === "business" && (
          <div style={dropdownStyle}>
            <Link href="/business/teams" style={dropdownItemStyle}>
              👔 Teams
            </Link>
            <Link href="/business/startups" style={dropdownItemStyle}>
              🚀 Startups
            </Link>
            <Link href="/business/enterprise" style={dropdownItemStyle}>
              🏢 Enterprise
            </Link>
          </div>
        )}
      </div>

      {/* Pricing */}
      <Link href="/pricing" style={navLinkStyle}>
        Pricing
      </Link>

      {/* About */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setHovered("about")}
        onMouseLeave={() => setHovered(null)}
      >
        <span style={navLinkStyle}>About ▾</span>
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

      {/* Download Button */}
      <Link
        href="/download"
        style={{
          ...navLinkStyle,
          background: "#7c3aed",
          color: "white",
          fontWeight: 600,
          padding: "8px 18px",
          borderRadius: "8px",
        }}
      >
        ⬇ Download for macOS
      </Link>
    </nav>
  );
};

/* Dropdown Styles */
const dropdownStyle: React.CSSProperties = {
  position: "absolute",
  top: "40px",
  left: 0,
  background: "#fff",
  border: "1px solid #e5e5e5",
  borderRadius: "10px",
  padding: "12px 16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  minWidth: "200px",
  zIndex: 1000,
};

const dropdownItemStyle: React.CSSProperties = {
  color: "#333",
  textDecoration: "none",
  fontSize: "14px",
  padding: "6px 8px",
  borderRadius: "6px",
  transition: "all 0.2s ease",
};

export default FloatingNavbar;
