import * as Stylex from "@stylexjs/stylex";
import loader from "../../../public/assets/loading.json";
import Lottie from "lottie-react";

const styles = Stylex.create({
  loaderDiv: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgb(0, 0, 0, 0.2)",
    backdropFilter: "blur(5px)",
    width: "100%",
    height: "100%",
    zIndex: 20,
  },
  loader: {
    width: "25%",
  },
  centerChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Loader() {
  return (
    <div {...Stylex.props(styles.loaderDiv, styles.centerChild)}>
      <div {...Stylex.props(styles.loader)}>
        <Lottie animationData={loader} loop />
      </div>
    </div>
  );
}
