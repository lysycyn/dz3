/**
 * Инициализация анализатора звука для последующего использования в отрисовке на канвасах
 */
export default class Analyzer {
  constructor(stream) {
    const audioContext = new window.AudioContext();

    this._analyzer = audioContext.createAnalyser();

    this._analyzer.minDecibels = -90;
    this._analyzer.maxDecibels = -10;
    this._analyzer.smoothingTimeConstant = 0.85;
    this._analyzer.fftSize = 256;

    const source = audioContext.createMediaStreamSource(stream);

    source.connect(this._analyzer);
  }

  getAnalyzer() {
    return this._analyzer;
  }
}
