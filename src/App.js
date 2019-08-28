import React, { useState, useCallback } from 'react';
import { Vector3, Quaternion } from "@babylonjs/core/Maths/math";

import mockSensors from './mock/mockSensors';

import './App.css';
import AvatarScene from './AvatarScene';
import { boneNumberToBone } from './boneMap';

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
          let q = new Quaternion(QX / 1000 , QY / 1000, QZ / 1000, QW / 1000);
          const p  = new Vector3(PX / 1000, PY/1000, PZ/1000);
          b.push( { ID, p, q });
      });
      setBoneInfo(b);
    });
  }
  return (
      <div>
      <AvatarScene boneInfo={boneInfo} boneNum={boneNum} paused={paused} width={1000} height={1000}/>
      <button type="button" onClick={()=>setPaused(!paused)}>{paused ? "resume" : "pause"}</button>
      <button type="button" onClick={decrementBone}>Less</button>
      <span>{`${boneNum}: ${boneNumberToBone(boneNum).name}`} </span>
      <button type="button" onClick={incrementBone}>More</button>
      </div>
  );
}

export default App;
