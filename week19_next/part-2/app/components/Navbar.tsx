"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle: React.CSSProperties = {
    color: scrolled ? "#222" : "#fff",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "15px",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const dropdownItemStyle: React.CSSProperties = {
    color: "#222",
    textDecoration: "none",
    fontSize: "14px",
    padding: "8px 10px",
    borderRadius: "4px",
    transition: "background 0.2s ease",
    display: "block",
  };

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    left: 0,
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "8px",
    padding: "10px 0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    minWidth: "180px",
    zIndex: 1000,
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: scrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255,255,255,0.2)",
        backdropFilter: "blur(10px)",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.1)" : "none",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 24px",
        transition: "background 0.3s, border-bottom 0.3s",
      }}
    >
      {/* Logo / Brand */}
      <Link href="/">
        <div style={{ color: scrolled ? "#222" : "#fff", fontSize: "20px", fontWeight: "600", textDecoration: "none" }}>
          YourLogo
        </div>
      </Link>

      {/* Menu items */}
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setHovered("services")}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={navLinkStyle}>Services ▾</span>
          {hovered === "services" && (
            <div style={dropdownStyle}>
              <Link href="/services/one">
                <div style={dropdownItemStyle}>Service One</div>
              </Link>
              <Link href="/services/two">
                <div style={dropdownItemStyle}>Service Two</div>
              </Link>
              <Link href="/services/three">
                <div style={dropdownItemStyle}>Service Three</div>
              </Link>
            </div>
          )}
        </div>

        <Link href="/about">
          <div style={navLinkStyle}>About</div>
        </Link>
        <Link href="/blog">
          <div style={navLinkStyle}>Blog</div>
        </Link>
        <Link href="/contact">
          <div style={navLinkStyle}>Contact</div>
        </Link>
      </div>

      {/* CTA / Button on right */}
      <Link href="/get-started">
        <div
          style={{
            color: "#fff",
            background: "#7c3aed",
            padding: "8px 16px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: 500,
            transition: "background 0.3s",
          }}
        >
          Get Started
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
