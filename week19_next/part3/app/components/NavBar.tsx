"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navLinkStyle: React.CSSProperties = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    padding: "6px 14px",
    borderRadius: "20px",
    transition: "all 0.3s ease",
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(25, 28, 50, 0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: "40px",
        padding: "10px 25px",
        display: "flex",
        alignItems: "center",
        gap: "30px",
        zIndex: 1000,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      {/* Brand */}
      <Link href="/" style={{ ...navLinkStyle, fontWeight: "600" }}>
        Lemurian Labs
      </Link>

      {/* Links */}
      <Link
        href="/"
        style={{
          ...navLinkStyle,
          background:
            pathname === "/" ? "rgba(255,255,255,0.15)" : "transparent",
          boxShadow:
            pathname === "/"
              ? "0 0 10px rgba(255,255,255,0.4)"
              : "none",
        }}
      >
        Home
      </Link>

      <Link
        href="/about"
        style={{
          ...navLinkStyle,
          background:
            pathname === "/about" ? "rgba(255,255,255,0.15)" : "transparent",
          boxShadow:
            pathname === "/about"
              ? "0 0 10px rgba(255,255,255,0.4)"
              : "none",
        }}
      >
        About Us
      </Link>

      <Link
        href="/thoughts"
        style={{
          ...navLinkStyle,
          background:
            pathname === "/thoughts" ? "rgba(255,255,255,0.15)" : "transparent",
          boxShadow:
            pathname === "/thoughts"
              ? "0 0 10px rgba(255,255,255,0.4)"
              : "none",
        }}
      >
        Our Thoughts
      </Link>

      {/* Contact button */}
      <Link
        href="/contact"
        style={{
          ...navLinkStyle,
          border: "1px solid rgba(255,255,255,0.5)",
        }}
      >
        Contact
      </Link>
    </nav>
  );
};

export default Navbar;
