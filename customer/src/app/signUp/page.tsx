import * as StyleX from "@stylexjs/stylex";
import background from "../../../public/assets/background.jpg";
import SignUp from "../components/signUp";

const Page = () => {
  return (
    <div
      {...StyleX.props(styles.main)}
      // style={{ backgroundImage: `url(${background.src})` }}
    >
      <SignUp />
    </div>
  );
};

const styles = StyleX.create({
  main: {
    width: "100%",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "hidden",
    backgroundColor: "rgb(197,245,255)",
    background:
      "radial-gradient(circle, rgba(255,208,229,1) 0%, rgba(255,255,255,1) 59%)",
  },
});

export default Page;
