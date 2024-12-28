"use client";
import * as StyleX from "@stylexjs/stylex";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Logout = () => {
  const router = useRouter();

  const handleConfirmLogout = () => {
    toast.success("You have been logged out successfully.");
    router.replace("/signIn");
  };

  const handleClose = () => {
    toast("Logout cancelled");
  };

  return (
    <div {...StyleX.props(styles.overlay)}>
      <div {...StyleX.props(styles.popup)}>
        <button {...StyleX.props(styles.closeButton)}>&times;</button>
        <div {...StyleX.props(styles.popupContent)}>
          <h2 {...StyleX.props(styles.heading)}>
            Are you sure you want to log out?
          </h2>
          <div {...StyleX.props(styles.buttonContainer)}>
            <button
              {...StyleX.props(styles.confirmButton)}
              onClick={handleConfirmLogout}
            >
              Yes
            </button>
            <button
              {...StyleX.props(styles.cancelButton)}
              onClick={handleClose}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = StyleX.create({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    position: "relative",
    width: "500px",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    whiteSpace: "nowrap",
    marginBottom: "20px",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  confirmButton: {
    width: "150px",
    height: "50px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#333",
      transform: "scale(1.05)",
    },
  },
  cancelButton: {
    width: "150px",
    height: "50px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#333",
      transform: "scale(1.05)",
    },
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    fontSize: "28px",
    border: "none",
    background: "transparent",
  },
});

export default Logout;
