import React, {useState} from 'react';
import './App.css';
import AvatarScene from './AvatarScene';

function App() {
  const [boneNum, setBoneNum] = useState(14);
  return (
      <div>
      <AvatarScene boneNum={boneNum}/>
      <button type="button" onClick={() =>setBoneNum(boneNum-1)}>Less</button>
      <span>{boneNum}</span>
      <button type="button" onClick={() =>setBoneNum(boneNum+1)}>More</button>
      </div>
  );
}

export default App;
