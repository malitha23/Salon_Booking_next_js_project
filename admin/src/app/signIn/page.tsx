import React from "react";
import * as StyleX from "@stylexjs/stylex";
import SignIn from "../components/signIn";
import Navbar from "../components/navbar";

const Page = () => {
  return (
    <div>
      <Navbar />
      <div {...StyleX.props(styles.main)}>
        <SignIn />
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
