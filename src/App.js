import React, { useState, useCallback } from 'react';
import './App.css';
import AvatarScene from './AvatarScene';

function App() {
  const [boneNum, setBoneNum] = useState(14);
  const incrementBone = useCallback(() => setBoneNum(boneNum => boneNum + 1), []);
  const decrementBone = useCallback(() => setBoneNum(boneNum => boneNum - 1), []);
  return (
      <div>
      <AvatarScene boneNum={boneNum}/>
      <button type="button" onClick={decrementBone}>Less</button>
      <span>{boneNum}</span>
      <button type="button" onClick={incrementBone}>More</button>
      </div>
  );
}

export default App;
