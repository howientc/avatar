import React, { useRef, useState, useEffect } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { SceneLoader } from "@babylonjs/core";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
// import { Mesh } from "@babylonjs/core/Meshes/mesh";

// import avatar from "./assets/Dude.json";
// import avatar from "./assets/AvatarMVI_Female_Rig.json";
// import avatar from "./assets/AvatarMVI_Rig.json";
import avatar from './assets/AvatarMVI_Female_Rig_TestAnim';
const AvatarScene = ({ boneInfo, boneNum }) => {
  // const [scene, setScene] = useState(null);
  const [engine, setEngine] = useState(null);
  const [skeleton, setSkeleton] = useState(null);
  const [previousBone, setPreviousBone] = useState(null);
  const canvasRef = useRef(null);

  // useEffect(() => {
  //   if (skeleton) {
  //     if (previousBone) {
  //       console.log('setting previous back')
  //       previousBone.setScale(new Vector3(1, 1, 1));
  //     }

  //     let bone = skeleton.bones[boneNum];
  //     if (!bone) {
  //       return;
  //     }
  //     bone.setScale(new Vector3(2, 2, 2));
  //     setPreviousBone(bone);
  //   }
  // }, [skeleton, boneNum, previousBone]);

  useEffect(() => {
      if (skeleton && boneInfo) {
      // console.log(boneInfo)
      boneInfo.forEach( ({boneId, p, q } )=> {
        let bone = skeleton.bones[boneId];
        bone.rotationQuaternion = q;
        // bone.position = p; 
      })
    }
  }, [skeleton, boneInfo]);

  useEffect(() => {
    if (engine) return; // only do once
    const canvas = canvasRef.current;
    const e = new Engine(canvas, true);
    setEngine(e);

    const scene = new Scene(e);
    const camera = new ArcRotateCamera(
      "camera",
      1,
      1,
      140,
      Vector3.Zero(),
      scene
    );

    camera.setTarget(new Vector3(0, 40, 0));

    camera.attachControl(canvas, true);

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    light.intensity = 0.7;
    SceneLoader.ImportMesh(
      "",
      "",
      `data:${JSON.stringify(avatar)}`,
      scene,
      function(newMeshes, particleSystems, skeletons) {
        // mesh = newMeshes[0];
        setSkeleton(skeletons[0]);
      }
    );
    e.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });

    const onResizeWindow = () => {
      if (engine) {
        engine.resize();
      }
    };
  
    window.addEventListener("resize",  onResizeWindow);
    return () => {
      window.removeEventListener("resize", onResizeWindow);
    };
  }, [engine]);

  const opts = {
    width: 1000,
    height: 800
  };
  return <canvas {...opts} ref={canvasRef} />;
};

export default AvatarScene;
// bone.rotationQuaternion=new Quarternion(x,y,z,w);