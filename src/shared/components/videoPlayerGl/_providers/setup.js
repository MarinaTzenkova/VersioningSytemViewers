import withBuffer from "./withBuffer";
import withVideoControls from "./withVideoControls";
import withSpeed from "./withSpeed";
export default function(index, indices) {
  // buffer
  // playing stuff
  // channels?
  // img omg
  // const { cacheChanngels, getIndexImages, createImages } = withImages();
  const { buffer } = withBuffer(index, indices);
  const { speed, setSpeed } = withSpeed();
  const { controls, startPlaying, pause } = withVideoControls(speed, buffer);

  return {
    buffer,
    controls,
    setSpeed,
    speed,
    startPlaying,
    pause
  };
}
