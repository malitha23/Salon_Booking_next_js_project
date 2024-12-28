"use client";
import * as stylex from "@stylexjs/stylex";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Back from "../../../../../public/assets/back.svg";
import Image from "next/image";

const page = () => {
  const router = useRouter();

  return (
    <main {...stylex.props(x.main, x.centerChild)}>
      <div {...stylex.props(x.container)}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            padding: "6px 0",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Image
            src={Back}
            alt=""
            objectFit="contain"
            style={{ cursor: "pointer" }}
            onClick={() => router.replace("/dashboard/bookings")}
          />
          <h2>Booking Details</h2>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            borderRadius: 20,
            width: "100%",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              border: "1px solid #D9D9D970",
              borderRadius: 20,
              flexDirection: "column",
              height: "100%",
              width: "50%",
            }}
          >
            <div
              style={{
                height: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  padding: "10px 20px",
                }}
              >
                Booking info
              </h3>
              <div
                style={{
                  width: "100%",
                  height: 2,
                  backgroundColor: "#d9d9d950",
                }}
              ></div>
            </div>
            <div
              style={{
                height: "81%",
                padding: "10px 20px",
                display: "flex",
                gap: 20,
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#99a1b7",
                  }}
                >
                  Booking ID :
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#99a1b7",
                  }}
                >
                  Booking Date :
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#99a1b7",
                  }}
                >
                  Booking Time :
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#99a1b7",
                  }}
                >
                  Address:
                </p>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#3a3a3a",
                  }}
                >
                  1246544
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#3a3a3a",
                  }}
                >
                  24/06/2024
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#3a3a3a",
                  }}
                >
                  1.56 PM
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#3a3a3a",
                  }}
                >
                  Matara
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: 10,
              borderRadius: 20,
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              border: "1px solid #D9D9D970",
              borderRadius: 20,
              flexDirection: "column",
              width: "48%",
              height: "40vh",
            }}
          >
            <div
              style={{
                height: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  padding: "10px 20px",
                }}
              >
                Payments
              </h3>
              <div
                style={{
                  width: "100%",
                  height: 2,
                  backgroundColor: "#d9d9d950",
                }}
              ></div>
            </div>
            <div
              style={{
                height: "80%",
                padding: "10px 20px",
                display: "flex",
                gap: 130,
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#99a1b7",
                  }}
                >
                  Total :
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#3a3a3a",
                    marginBottom: "24px",
                  }}
                >
                  £ 200.00
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              border: "1px solid #D9D9D970",
              borderRadius: 20,
              flexDirection: "column",
              width: "48%",
              height: "40vh",
            }}
          >
            <div
              style={{
                height: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  padding: "10px 20px",
                }}
              >
                User info
              </h3>
              <div
                style={{
                  width: "100%",
                  height: 2,
                  backgroundColor: "#d9d9d950",
                }}
              ></div>
            </div>
            <div
              style={{
                height: "80%",
                padding: "10px 20px",
                display: "flex",
                gap: 20,
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#99a1b7",
                  }}
                >
                  User Name :
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#99a1b7",
                  }}
                >
                  User Email :
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#99a1b7",
                  }}
                >
                  Phone Number :
                </p>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#3a3a3a",
                  }}
                >
                  John Mack
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#3a3a3a",
                  }}
                >
                  choosecareer@gmail.com
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#3a3a3a",
                  }}
                >
                  +44 0000000000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const x = stylex.create({
  centerChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
    height: "88vh",
    overflowX: "scroll",
  },
  container: {
    width: "90%",
    flexDirection: "column",
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    gap: 20,
    height: "100%",
  },
});

export default page;
