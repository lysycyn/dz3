import './css/index.css';

import Terminator from './Terminator';

(() => {
  const video = document.createElement('video');

  const canvasVision = document.querySelector('.js-vision');

  const canvasGlitch = document.querySelector('.js-glitch');
  const canvasSinewave = document.querySelector('.js-sinewave');
  const canvasFrequencyBar = document.querySelector('.js-frequency');

  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: canvasVision.width,
      height: canvasVision.height,
    },
  }).then((stream) => {
    const terminator = new Terminator(
      video,
      canvasVision,
      stream,
      canvasGlitch,
      canvasSinewave,
      canvasFrequencyBar,
    );
    terminator.run();
  });
})();
