import React from "react";
import * as StyleX from "@stylexjs/stylex";
import Navbar from "../components/navbar";
import SignUp from "../components/signUp";

const Page = () => {
  return (
    <div>
      <Navbar />
      <div {...StyleX.props(styles.main)}>
        <SignUp />
      </div>
    </div>
  );
};

const styles = StyleX.create({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "90%",
    backgroundImage: 'url("/background.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 60,
    position: "absolute",
  },
});

export default Page;
