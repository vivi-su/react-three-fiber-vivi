import React, {Suspense} from "react";
import { Canvas } from "@react-three/fiber";
import {OrbitControls, Stars, PerspectiveCamera} from "@react-three/drei";
import { Physics, useBox, usePlane} from '@react-three/cannon'
import "./styles.css";

function Box(){
  const [ref, api] = useBox (()=>({mass:1, position: [0, 10, 0]}));

  return (
    <mesh onClick={()=>{
      api.velocity.set(0,5,0);
    }} ref={ref} position={[0,1,0]}>
      <sphereGeometry />
      <meshNormalMaterial color="hotpink"/>
    </mesh>
  );
}

function Plane() {
  const [ref] = usePlane(() => ({
    rotation:[- Math.PI/ 2,0,0]
}));

  return (
    <mesh ref={ref} position={[0,0,0]} rotation={[-Math.PI/ 2,0,0]} >
      <planeGeometry args={[20,20]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      <OrbitControls />
      <Stars />
      <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.3} />
          <PerspectiveCamera position={[2,2,2]} makeDefault/>
          <Physics>
            <Box />
            <Plane />
          </Physics>
      </Suspense>
    </Canvas>
  );
}

export default App;
