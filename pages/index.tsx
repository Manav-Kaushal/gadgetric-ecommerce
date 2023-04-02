import Canvas from "@canvas/index";
import Customizer from "@pages/Customizer";
import Home from "@pages/Home";
import React from "react";

type Props = {};

const MainPage = (props: Props) => {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas />
      <Customizer />
    </main>
  );
};

export default MainPage;
