"use client";
import { useState } from "react";
import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import StyleX from "@stylexjs/stylex";

const styles = StyleX.create({
  mainContentCollapsed: (isCollapsed) => ({
    width: isCollapsed ? "100%" : "80%",
    height: "100%",
    // transition: "width 0.5s ease",
  }),
  // mainContentExpanded: {
  //   width: "80%",
  //   height: "100%",
  //   display: "flex",
  // },
  sidebarCollapsed: {
    display: "flex",
  },
  sidebarExpanded: {
    width: "20%",
    height: "100%",
    display: "flex",
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", height: "10%", display: "flex" }}>
          <TopBar />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              {...StyleX.props(
                styles.sidebarCollapsed,
                !isSidebarCollapsed && styles.sidebarExpanded
              )}
            >
              <Sidebar isCollapsed={toggleSidebar} />
            </div>
            <div
              {...StyleX.props(styles.mainContentCollapsed(isSidebarCollapsed))}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
