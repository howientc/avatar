import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import { Vector3, Quaternion } from "@babylonjs/core/Maths/math";

import mockSensors from './mock/mockSensors';

import './App.css';
import AvatarScene from './AvatarScene';



// These come from Unreal and correspond to boneType in database
const boneType = {
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

const boneName = _.invert(boneType);

const BONE_MAP = {
  // [boneName['Spine']] : 2,
  [boneName['Hand_L']] : 10,
  [boneName['Elbow_L']] : 9,
  [boneName['Hand_R']] : 32,
  [boneName['Elbow_R']] : 31,
//hips?
//head?
  // [boneName['Spine2']] : 4,
  // [boneName['Spine1']] : 3,
// neck?  
  [boneName['Shoulder_L']] : 6,
  [boneName['Shoulder_R']] : 29,
  [boneName['Arm_L']] : 8,
  [boneName['Arm_R']] : 30,
};

function App() {
  const [boneNum, setBoneNum] = useState(14);
  const incrementBone = useCallback(() => setBoneNum(boneNum => boneNum + 1), []);
  const decrementBone = useCallback(() => setBoneNum(boneNum => boneNum - 1), []);
  const [boneInfo, setBoneInfo] = useState(null);
  if (!boneInfo) {
    mockSensors(({ Skeletal }) => {
      const b = [];
      console.log('sssss')
      Skeletal.forEach(bone => {
        const {QX, QY, QZ, QW, PX, PY, PZ, ID } = bone;
        const boneId = BONE_MAP[ID];
        if (boneId) {
          let q = new Quaternion(QX / 1000 , QY / 1000, QZ / 1000, QW / 1000);
          const p  = new Vector3(PX / 1000, PY/1000, PZ/1000);
          // q = Quaternion.Inverse(q);
          b.push( { boneId, p, q });
        }
      });
      setBoneInfo(b);
    });
  }
  return (
      <div>
      <AvatarScene boneInfo={boneInfo} boneNum={boneNum}/>
      <button type="button" onClick={decrementBone}>Less</button>
      <span>{boneNum}</span>
      <button type="button" onClick={incrementBone}>More</button>
      </div>
  );
}

export default App;
