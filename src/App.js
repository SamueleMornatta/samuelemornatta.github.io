import "./App.css";
import { Fragment, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { Intro } from "./components/Intro";

function App() {
  return (
    <Fragment>
      <Canvas
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          backgroundColor: "#4158D0",
          backgroundImage:
            "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
        }}
        dpr={[1, 2]}
        shadows
      >
        <ambientLight />
        <pointLight position={[100, 10, 10]} />
        <Suspense fallback={null}>
          <ScrollControls pages={3}>
            <Intro />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </Fragment>
  );
}

export default App;
