import React from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  Mesh,
  SceneLoader,
  ArcRotateCamera
} from "babylonjs";
import SceneComponent from "./SceneComponent"; // import the component above linking to file we just created.
import avatar from './assets/Dude.json';
import mockSensors from './mock/mockSensors';

// import avatar from './assets/male.json';
console.log(avatar);
const onSceneMount = e => {
  const { canvas, scene, engine } = e;

  var camera = new ArcRotateCamera("camera", 1, 1, 140, Vector3.Zero(), scene);

  camera.setTarget(new Vector3(0, 40, 0));

  camera.attachControl(canvas, true);

  var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

  light.intensity = 0.7;

  var scales = [];
  var skeleton, mesh;
  SceneLoader.ImportMesh('', '', `data:${JSON.stringify(avatar)}`, scene, function(
    newMeshes,
    particleSystems,
    skeletons
  ) {
    mesh = newMeshes[0];
    skeleton = skeletons[0];

    // var animation = scene.beginAnimation(skeletons[0], 0, 100, true, 1.0);
    console.log('skel', skeleton)
    var bone = skeleton.bones[14];
                    bone.setScale(new Vector3(2,2,2));

    // s.x *= 30;

  });

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
};

const logit = (x) => {console.log(x.Skeletal)};

const PageWithScene = () => {

  mockSensors(logit);
  return (
    <SceneComponent onSceneMount={onSceneMount} width={1000} height={800} />
  );
};

export default PageWithScene;
