import * as StyleX from "@stylexjs/stylex";
import Saloon from "./saloon/page";
import FilterComponent from "./Filter/FilterComponent";

const x = StyleX.create({
  centerChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
  },
  filterDiv2: {
    width: {
      default: "25%",
      "@media (max-width: 768px)": "100%",
    },
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: "0px 10px",
    flexWrap: "wrap",
  },
  filterP: {
    display: "flex",
    fontSize: {
      default: 18,
      "@media (max-width: 768px)": 14,
    },
  },
  filterContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    gap: 10,
    flexDirection: {
      default: "row",
      "@media (max-width: 768px)": "column",
    },
    fontSize: {
      default: 16,
      "@media (max-width: 768px)": "12px",
      "@media (min-width: 1920px)": 36,
    },
  },
  filterInput: {
    outline: "none",
    background: "transparent",
    border: "none",
    fontSize: {
      default: 18,
      "@media (max-width: 768px)": 14,
    },
    color: "#6C6C6C",
  },
});

export default function Home() {
  return (
    <main {...StyleX.props(x.main, x.centerChild)}>
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "60px 0" }}>
          <h1>Book local beauty and wellness services</h1>
        </div>
        <FilterComponent/>
      </div>
    </main>
  );
}
