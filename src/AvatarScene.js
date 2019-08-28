import React, { useRef, useState, useEffect } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { SceneLoader } from "@babylonjs/core";
import { SphereBuilder } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import {boneType} from './App';
import { findIndex } from 'lodash';
// import { Mesh } from "@babylonjs/core/Meshes/mesh";

// import avatar from "./assets/Dude.json";
// import avatar from "./assets/AvatarMVI_Female_Rig.json";
// import avatar from "./assets/AvatarMVI_Rig.json";
import avatar from './assets/AvatarMVI_Female_Rig_TestAnim';

const boneMap = {};
const buildBoneMap = (bones) => {
  Object.entries(boneType).forEach(([ix,name]) => {
    const avatarBone = findIndex(bones, b=> (name === b.name || name+'_Skin' === b.name));
    if (avatarBone !== -1) boneMap[ix] = avatarBone;
  });
  delete boneMap[0];
  delete boneMap[5];
  delete boneMap[7];
  delete boneMap[8];
  console.log(boneMap);
}

const AvatarScene = ({ boneInfo, boneNum, paused=false }) => {
  // const [scene, setScene] = useState(null);
  const [engine, setEngine] = useState(null);
  const [skeleton, setSkeleton] = useState(null);
  const [mesh, setMesh] = useState(null);
  const canvasRef = useRef(null);
  const [marker, setMarker] = useState(null);

  if (skeleton) {
    let bone = skeleton.bones[boneNum];
    marker.attachToBone(bone, mesh);
    if (!paused && boneInfo) {
      // console.log(boneInfo)
      boneInfo.forEach( ({ID, p, q } )=> {
        const boneId = boneMap[ID];
        if (boneId) {
          let bone = skeleton.bones[boneId];
          bone.rotationQuaternion = q;
        }
        // bone.position = p; 
      })
    }
  }

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
      240,
      Vector3.Zero(),
      scene
    );

    camera.setTarget(new Vector3(0, 90, 0));
    camera.attachControl(canvas, true);
    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    setMarker(SphereBuilder.CreateSphere("marker", {diameter: 15}, scene));
    SceneLoader.ImportMesh(
      "",
      "",
      `data:${JSON.stringify(avatar)}`,
      scene,
      (newMeshes, particleSystems, skeletons) => {
        console.log(newMeshes, skeletons)
        buildBoneMap(skeletons[0].bones);
        setMesh(newMeshes[0]);
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