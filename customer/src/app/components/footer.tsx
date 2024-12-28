"use client";
import * as StyleX from "@stylexjs/stylex";
import React, { useState } from "react";
import Image from "next/image";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <div {...StyleX.props(styles.main)}>
      <div {...StyleX.props(styles.section)}>
        <div {...StyleX.props(styles.subscribeSection)}>
          <span {...StyleX.props(styles.subscribeText)}>
            Subscribe Newsletters
          </span>
          <div {...StyleX.props(styles.inputContainer)}>
            <div {...StyleX.props(styles.emailInputContainer)}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                {...StyleX.props(styles.emailInput)}
              />
              <button {...StyleX.props(styles.subscribeButton)}>
                Subscribe
              </button>
            </div>
            {error && (
              <div style={{ color: "red", paddingLeft: 20 }}>{error}</div>
            )}
          </div>
        </div>
        <div {...StyleX.props(styles.linksAndIconsContainer)}>
          <div {...StyleX.props(styles.links)}>
            <a href="/" {...StyleX.props(styles.link)}>
              Home
            </a>
            <a href="/contact" {...StyleX.props(styles.link)}>
              Contact Us
            </a>
            <a href="/about" {...StyleX.props(styles.link)}>
              About
            </a>
          </div>
        </div>
        <div {...StyleX.props(styles.footerLine)}></div>
        <div {...StyleX.props(styles.footerNote)}>
          <span>
            <a href="/terms" {...StyleX.props(styles.link)}>
              Terms of Services
            </a>
            |
            <a href="/privacy" {...StyleX.props(styles.link)}>
              Privacy Policy
            </a>
          </span>
          <span style={{ color: "#fff", textAlign: "right" }}>
            &copy; 2024 My Saloon. All rights reserved
          </span>
        </div>
      </div>
    </div>
  );
};

const styles = StyleX.create({
  section: {
    display: "flex",
    flexDirection: "column",
    width: {
      default: "90%",
      "@media (max-width: 768px)": "95%",
    },
    backgroundColor: "#1a1a1a",
    borderRadius: "12px",
    padding: "20px 0",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0",
  },
  main: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0",
    position: "relative",
  },
  subscribeSection: {
    display: "flex",
    justifyContent: {
      default: "space-between",
      "@media (max-width: 640px)": "center",
    },
    alignItems: "center",
    width: "100%",
    padding: "0 20px",
    marginBottom: "20px",
    flexDirection: {
      default: "row",
      "@media (max-width: 580px)": "column",
    },
    gap: {
      default: 0,
      "@media (max-width: 640px)": "10px",
    },
  },
  subscribeText: {
    fontSize: {
      default: "40px",
      "@media (max-width: 768px)": "16px",
      "@media (max-width: 1024px)": "20px",
    },
    fontWeight: "400",
    color: "#fff",
    width: {
      default: "50%",
      "@media (max-width: 580px)": "100%",
    },
    textAlign: {
      default: "left",
      "@media (max-width: 640px)": "center",
    },
  },
  emailInputContainer: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: {
      default: "100%",
      "@media (max-width: 1024px)": "100%",
    },
    transition: "transform 0.3s ease, 0.3s ease",
    ":hover": {
      transform: "scale(1.05)",
    },
  },
  emailInput: {
    padding: "15px 10px",
    borderRadius: "25px",
    border: "1px solid #ccc",
    outline: "none",
    paddingRight: "100px",
    width: "100%",
    paddingLeft: "20px",
    fontSize: "18px",
  },
  subscribeButton: {
    position: "absolute",
    right: "10px",
    padding: "10px 20px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#1a1a1a",
    color: "white",
    cursor: "pointer",
    outline: "none",
    transition: "transform 0.3s ease, 0.3s ease",
    ":hover": {
      transform: "scale(1.05)",
    },
    fontWeight: 700,
  },
  linksAndIconsContainer: {
    display: "flex",
    justifyContent: {
      default: "space-between",
      "@media (max-width: 580px)": "center",
    },
    alignItems: "center",
    width: "100%",
    padding: {
      default: "0 20px",
      "@media (max-width: 768px)": "5px",
    },
    flexDirection: {
      default: "row",
      "@media (max-width: 640px)": "column",
    },

    gap: "10px",
  },
  link: {
    textDecoration: "none",
    color: {
      default: "#fff",
      ":hover": "#F5C100",
    },
  },
  socialLinksSection: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },
  socialLink: {
    margin: "0",
    display: "flex",
  },
  socialIcon: {
    width: "30px",
    height: "24px",
    margin: "0",
    transition: "transform 0.3s ease, 0.3s ease",
    ":hover": {
      transform: "scale(1.5)",
    },
  },
  footerLine: {
    content: "",
    width: "97%",
    height: "2px",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 40px",
  },
  footerNote: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "20px 20px",
    fontSize: "17px",
    color: "#666",
    flexDirection: {
      default: "row",
      "@media (max-width: 640px)": "column",
    },
    gap: 10,
  },
  footerCenter: {
    fontWeight: "bold",
    color: "#fff",
  },
  links: {
    flexDirection: {
      default: "row",
      "@media (max-width: 425px)": "column",
    },
    display: "flex",
    padding: "10px 0",
    justifyContent: {
      default: "flext-start",
      "@media (max-width: 640px)": "center",
    },
    width: "100%",
    alignItems: "center",
    gap: 10,
    fontSize: "20px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: {
      default: "50%",
      "@media (max-width: 768px)": "100%",
    },
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default Footer;
