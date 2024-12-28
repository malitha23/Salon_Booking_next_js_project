"use client";
import StyleX from "@stylexjs/stylex";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Right from "../../../public/assets/right.svg";
import Dashboard from "../../../public/assets/dashboard.svg";
import Event from "../../../public/assets/Event.svg";
import Booking from "../../../public/assets/Booking.svg";

type SidebarProps = {
  isCollapsed: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const router = useRouter();
  const path = usePathname();

  const [isExpanded, setIsExpanded] = useState(true);
  const variants = {
    expended: { width: "100%", zIndex: 10 },
    nonExpanded: { width: "70px", zIndex: 10 },
  };
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    isCollapsed();
  };

  const NavItems = [
    { Name: "Dashboard", path: "/dashboard", img: Dashboard },
    { Name: "My Saloon", path: "/dashboard/saloon", img: Event },
    { Name: "Bookings", path: "/dashboard/bookings", img: Booking },
  ];

  return (
    <motion.div
      {...StyleX.props(styles.sidebar)}
      initial={{ width: "70px" }}
      animate={{ width: isExpanded ? "100%" : "70px" }}
      transition={{ duration: 0.5 }}
    >
      <div {...StyleX.props(styles.container)} onClick={handleExpand}>
        <motion.div
          animate={{ rotate: isExpanded ? 0 : 180 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={Right} alt="" width={20} height={20} />
        </motion.div>
      </div>
      <div {...StyleX.props(styles.menuContainer)}>
        {NavItems.map((item, index) => (
          <div
            {...StyleX.props(styles.menuItem(path, item.path))}
            key={index}
            onClick={() => router.push(item.path)}
          >
            <Image
              src={item.img}
              alt=""
              objectFit="cover"
              {...StyleX.props(styles.image(path, item.path))}
            />
            {isExpanded && (
              <span {...StyleX.props(styles.expandedText)}>{item.Name}</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const styles = StyleX.create({
  sidebar: {
    display: "flex",
    flexDirection: "column",
    height: "90vh",
    backgroundColor: "#05031A",
    width: "100%",
    position: "relative",
  },
  container: {
    position: "absolute",
    top: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    right: -14,
    width: 30,
    height: 30,
    background: "#FFF",
    borderRadius: 100,
    border: "1px solid #000435",
  },
  menuContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  menuItem: (current, path) => ({
    display: "flex",
    alignItems: "center",
    padding: "15px 20px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "opacity 0.3s",
    color: {
      default: current == path ? "#000" : "#fff",
      ":hover": "#000",
    },
    background: {
      default: current == path ? "#F5C100" : "transparent",
      ":hover": "#f5d800",
    },
    gap: 10,
  }),
  expandedText: {
    fontSize: "15px",
    whiteSpace: "nowrap",
  },
  image: (current, path) => ({
    filter: current == path ? "invert(10%)" : "invert(100%)",
  }),
});

export default Sidebar;
