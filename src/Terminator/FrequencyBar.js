export default class FrequencyBar {
  constructor(analyzer, canvas) {
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');
    this._analyzer = analyzer;

    this._bufferLengthAlt = this._analyzer.frequencyBinCount;
    this._dataArrayAlt = new Uint8Array(this._bufferLengthAlt);

    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  _draw() {
    this._analyzer.getByteFrequencyData(this._dataArrayAlt);

    this._context.fillStyle = 'rgb(255, 0, 0)';
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    const barWidth = (this._canvas.width / this._bufferLengthAlt) * 2.5;
    let i;
    let barHeight;
    let x = 0;

    for (i = 0; i < this._bufferLengthAlt; i++) {
      barHeight = this._dataArrayAlt[i];

      this._context.fillStyle = `rgb(${barHeight + 100}, 150, 150)`;
      this._context.fillRect(x, this._canvas.height - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 1;
    }

    requestAnimationFrame(() => { this._draw(); });
  }

  startFrequency() {
    this._draw();
  }
}
