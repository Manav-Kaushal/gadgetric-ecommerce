import Canvas from "@canvas/index";
import Customizer from "@pages/Customizer";
import Home from "@pages/Home";
import Head from "next/head";
import React from "react";

type Props = {};

const MainPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>GadgetRic - Design your product</title>
      </Head>
      <main className="transition-all ease-in app">
        <Home />
        <Canvas />
        <Customizer />
      </main>
    </>
  );
};

export default MainPage;
