"use client";

import React, { useState, useEffect } from "react";
import * as StyleX from "@stylexjs/stylex";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Profile from "../../../public/assets/Profile.svg";
import Image from "next/image";
import logo from "../../../public/assets/vibetribe logo.png";
import Logout from "../components/logout";

const TopBar = () => {
  const router = useRouter();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const [showLogout, setShowLogout] = useState(false);

  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const name = localStorage.getItem("adminName");
    const email = localStorage.getItem("adminEmail");

    if (name && email) {
      setAdminName(name);
      setAdminEmail(email);
    }
  }, []);

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const showPopup = () => {
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div {...StyleX.props(styles.topBar)}>
      <div {...StyleX.props(styles.centerChild)}>
        {/* <div {...StyleX.props(styles.sidebarToggle)} onClick={toggleSidebar}>
          <Image
            src={Menu}
            alt=''
            width={30}
            height={30}
            style={{ cursor: "pointer" }}
          />
        </div> */}
        <Link href="/" {...StyleX.props(styles.logoText)}>
          My Saloon
        </Link>
      </div>
      <div {...StyleX.props(styles.rightSection)}>
        <Image
          src={Profile}
          alt=""
          style={{ cursor: "pointer", width: 40, height: 40 }}
          onClick={toggleLogout}
        />
        {showLogout && (
          <div {...StyleX.props(styles.logoutContainer)}>
             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          {adminName && adminEmail && (
            <>
             <div {...StyleX.props(styles.userInfo)}>
              <span>{adminName}</span>

            </div>
            <div {...StyleX.props(styles.userInfo)}>
            <span style={{ opacity:"0.4", fontSize:"14px" }} >{adminEmail}</span>
          </div>
            </>
          )}
        </div>
            <div {...StyleX.props(styles.logoutBtn)} onClick={showPopup}>
              Log Out
            </div>
            {isPopupVisible && <Logout />}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = StyleX.create({
  centerChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    height: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    background: "#05031A",
    padding: "0 15px",
    boxShadow: "0 0 10px 5px #00000025",
    zIndex: 101,
  },
  logoText: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: 32,
    marginLeft: "20px",
  },
  userInfo: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginBottom: "5px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },
  icon: {
    cursor: "pointer",
    width: "40px",
    height: "40px",
  },
  sidebarToggle: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  logoutBtn: {
    padding: 10,
    fontSize: {
      default: 16,
      "@media (max-width: 768px)": "14px",
      "@media (max-width: 431px)": "10px",
    },
    fontWeight: "700",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#fff",
    background: "#000",
    display: "flex",
    alignItems: "center",
    gap: 4,
    transition: "transform 0.3s ease, background-color 0.5s ease",
    ":hover": {
      transform: "scale(1.05)",
    },
    width: "200px",
    justifyContent: "center",
    zIndex: 100,
  },
  logoutContainer: {
    position: "absolute",
    right: 0,
    top: "75px",
    width: "250px",
    height: "150px",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
});

export default TopBar;
