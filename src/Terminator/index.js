import Vision from './Vision';
import Glitch from './Glitch';
import Voice from './Voice';
import Analyzer from './Analyzer';
import Sinewave from './Sinewave';
import FrequencyBar from './FrequencyBar';

/**
 * Класс для запуска всех эффектов. Фактически - агрегатор разлинчных классов для удобного масштабирования
 */
export default class Terminator {
  constructor(video, canvasVision, stream, canvasGlitch, canvasSinewave, canvasFrequencyBar) {
    this._glitch = new Glitch(canvasGlitch);
    this._vision = new Vision(video, canvasVision, stream, this._glitch);
    this._analyzer = new Analyzer(stream);
    this._sinewave = new Sinewave(this._analyzer.getAnalyzer(), canvasSinewave);
    this._frequencyBar = new FrequencyBar(this._analyzer.getAnalyzer(), canvasFrequencyBar);
  }

  /**
   * Запуск всех систем
   * Голосовое Воспроизведение
   * Визуализация интерфейса
   * Визуализация анализаторов звука
   */
  run() {
    Voice.speakPhraze('Система проанализирована');
    this._vision.startVision();
    this._sinewave.startSinewave();
    this._frequencyBar.startFrequency();
  }
}
