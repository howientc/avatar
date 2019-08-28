import { invert, findIndex } from 'lodash';

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

const boneMap = {};
let cachedBones = null;
export const buildBoneMap = bones => {
  cachedBones = bones;
  console.log(bones.map((b, i) => b.name));

  Object.entries(boneType).forEach(([ix, name]) => {
    let avatarBoneIndex = findIndex(bones, b => name === b.name); // first try direct match
    if (avatarBoneIndex === -1) {
      avatarBoneIndex = findIndex(bones, b => name + "_Skin" === b.name); // try with _Skin suffix
    }
    if (avatarBoneIndex !== -1) boneMap[ix] = avatarBoneIndex; // if we have a match use it
  });
  delete boneMap[0];
  delete boneMap[5];
  delete boneMap[7];
  delete boneMap[8];
  console.log(boneMap);
};

export const mapBone = ( id ) => boneMap[id];

export const boneNumberToBone = (num) => {
  if (!cachedBones) return {name: '?'};
  return cachedBones[num];
}