/**
 * Класс для отрисовки звуковой частоты с помощью канваса
 */
export default class Sinewave {
  constructor(analyzer, canvas) {
    this._analyzer = analyzer;
    this._canvas = canvas;
    this._context = canvas.getContext('2d');

    this._bufferLength = this._analyzer.fftSize;
    this._dataArray = new Uint8Array(this._bufferLength);

    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  /**
   * Отрисовка волны
   */
  _draw() {
    this._analyzer.getByteTimeDomainData(this._dataArray);

    this._context.fillStyle = 'rgb(255,0,0)';
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this._context.lineWidth = 2;
    this._context.strokeStyle = 'rgb(0, 0, 0)';

    this._context.beginPath();

    const sliceWidth = this._canvas.width / this._bufferLength;
    let x = 0;
    let i;
    let v;
    let y;

    for (i = 0; i < this._bufferLength; i++) {
      v = this._dataArray[i] / 128.0;
      y = v * this._canvas.height / 2;

      if (i === 0) {
        this._context.moveTo(x, y);
      } else {
        this._context.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this._context.lineTo(424, 50);
    this._context.stroke();

    requestAnimationFrame(() => { this._draw(); });
  }

  startSinewave() {
    this._draw();
  }
}
