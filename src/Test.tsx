import React, { Suspense, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, useVideoTexture } from "@react-three/drei";
import './styles.css';
import url from './coffee.mp4';


const VD = () => {
    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.src = url;
        vid.crossOrigin = "anonymous";
        vid.loop = true;
        vid.muted = true;
        vid.play();
        return vid;
    });

    return (
        <group>
            <mesh>
                <planeGeometry args={[10, 10, 10]} />
                <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
                    <videoTexture attach="map" args={[video]} />
                    <videoTexture attach="emmisiveMap" args={[video]} />
                </meshStandardMaterial>

            </mesh>
        </group>
    )
}
function VideoMaterial({ url }) {
    const texture = useVideoTexture(url);
}

const Floor = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, -2, 0]}>
            <planeBufferGeometry args={[100, 100, 1]} />
            <meshStandardMaterial color="white" side={THREE.DoubleSide} />
        </mesh>
    );
};

export default function Test() {
    return (
        <Canvas camera={{ position: [0, 2, 10] }}>
            <OrbitControls />
            <directionalLight intensity={0.05} />
            <pointLight intensity={0.2} color="red" />
            <Suspense fallback={null}>
                <VD />
                <Floor />
            </Suspense>
        </Canvas>
    )
}