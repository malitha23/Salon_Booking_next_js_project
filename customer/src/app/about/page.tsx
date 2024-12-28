import React from "react";
import Be from "../../../public/assets/beard.jpg";
import Image from "next/image";
import * as styleX from "@stylexjs/stylex";

const x = styleX.create({
  container: {
    width: {
      default: "90%",
      "@media (max-width: 1024px)": "100%",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 0",
    gap: 20,
    flexWrap: {
      default: "nowrap",
      "@media (max-width: 1024px)": "wrap",
    },
  },
});

const page = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div {...styleX.props(x.container)}>
        <div style={{ width: "50%" }}>
          <Image src={Be} alt='Beard' width={600} />
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            flexDirection: "column",
          }}
        >
          <h2 style={{ textAlign: "start", widows: "100%" }}>
            ABOUT OUR <br /> TECHNOLOGY
          </h2>
          <div
            style={{
              width: "250px",
              height: 2,
              content: "",
              backgroundColor: "#999",
              margin: "20px 0",
            }}
          ></div>
          <p>
            Our barbershop is the territory created purely for males who
            appreciate premium quality, time and flawless look. Welcome to
            Nelson!
          </p>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#1a1a1a",
              color: "#fff",
              border: "none",
              borderRadius: 100,
              marginTop: 20,
            }}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
