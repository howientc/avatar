import React, { useState, useCallback } from 'react';
import { invert } from 'lodash';
import { Vector3, Quaternion } from "@babylonjs/core/Maths/math";

import mockSensors from './mock/mockSensors';

import './App.css';
import AvatarScene from './AvatarScene';



// These come from Unreal and correspond to boneType in database
export const boneType = {
  0: 'Spine',
  1: 'Hand_L',
  2: 'Elbow_L',
  3: 'Hand_R',
  4: 'Elbow_R',
  5: 'Hips',
  6: 'Head',
  7: 'Spine2',
  8: 'Spine1',
  9: 'Neck',
  10: 'Shoulder_L',
  11: 'Shoulder_R',
  12: 'Arm_L',
  13: 'Arm_R',
  14: 'Thigh_L',
  15: 'Knee_L',
  16: 'Ankle_L',
  17: 'Thigh_R',
  18: 'Knee_R',
  19: 'Ankle_R',
};

const boneName = invert(boneType);

const BONE_MAP = {
  [boneName['Shoulder_L']] : 6,
  [boneName['Arm_L']] : 7,
  [boneName['Elbow_L']] : 10,
  [boneName['Hand_L']] : 12 ,

//hips?
//head?
  // [boneName['Spine']] : 2,
  // [boneName['Spine2']] : 4,
  // [boneName['Spine1']] : 3,
// neck?  
  [boneName['Shoulder_R']] : 29,
  [boneName['Arm_R']] : 30,
  [boneName['Elbow_R']] : 33,
  [boneName['Hand_R']] : 35,
};

function App() {
  const [boneNum, setBoneNum] = useState(14);
  const incrementBone = useCallback(() => setBoneNum(boneNum => boneNum + 1), []);
  const decrementBone = useCallback(() => setBoneNum(boneNum => boneNum - 1), []);
  const [boneInfo, setBoneInfo] = useState(null);
  const [paused, setPaused] = useState(true);
  if (!boneInfo) {
    mockSensors(({ Skeletal }) => {
      const b = [];
      Skeletal.forEach(bone => {
        const {QX, QY, QZ, QW, PX, PY, PZ, ID } = bone;
        // const boneId = BONE_MAP[ID];
          let q = new Quaternion(QX / 1000 , QY / 1000, QZ / 1000, QW / 1000);
          const p  = new Vector3(PX / 1000, PY/1000, PZ/1000);
          b.push( { ID, p, q });
      });
      setBoneInfo(b);
    });
  }
  return (
      <div>
      <AvatarScene boneInfo={boneInfo} boneNum={boneNum} paused={paused}/>
      <button type="button" onClick={()=>setPaused(!paused)}>{paused ? "resume" : "pause"}</button>
      <button type="button" onClick={decrementBone}>Less</button>
      <span>{boneNum}</span>
      <button type="button" onClick={incrementBone}>More</button>
      </div>
  );
}

export default App;
