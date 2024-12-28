"use client";

import React from "react";
import * as StyleX from "@stylexjs/stylex";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/vibetribe logo.png";

const Navbar = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#000435",
          zIndex: 9,
        }}
      >
        <div {...StyleX.props(styles.navBar)}>
          <Link href="/" {...StyleX.props(styles.logoText)}>
            My Saloon
          </Link>
        </div>
      </div>
    </>
  );
};

const styles = StyleX.create({
  centerChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navBar: {
    height: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: {
      default: 0,
      "@media (max-width: 431px)": 999,
      "@media (max-width: 768px)": 999,
    },
    width: "90%",
  },
  logoText: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    fontSize: 32,
  },
});

export default Navbar;
