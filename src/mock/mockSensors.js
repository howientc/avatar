import sensorData from './sampleSensorData';
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj)); // efficient way to deep clone
}


let sensorTime = 0;
async function mockSensors(cb, interval=100, index = 0) {
  const i = index % sensorData.length;
  const response = deepClone(sensorData[i]);
  sensorTime += interval;
  response.Time = sensorTime;
  await wait(interval);
  cb(response);
  await mockSensors(cb, interval, index + 1);
}

export default mockSensors;
