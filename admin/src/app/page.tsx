import * as StyleX from "@stylexjs/stylex";
import SignIn from "@/app/signIn/page";

const styles = StyleX.create({
  main: {
    fontSize: 30,
    color: "red",
  },
});

export default function Home() {
  return (
    <div>
      <SignIn />
    </div>
  );
}
