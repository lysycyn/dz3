import glitch from '../../lib/glitch.min';

/**
 * Создание эффекта помех с помощью библиотеки glitch-canvas.
 * Фактически - нужна лишь обертка - функция для периодического срабатывания помех
 */
export default class Glitch {
  constructor(canvasGlitch) {
    this._canvas = canvasGlitch;
    this._context = canvasGlitch.getContext('2d');
  }

  /**
   * Отрисовка помех в телечение 0.2 секунды. В настройке библиотеки можно задать другие
   * праметры для помех.
   */
  _draw(image) {
    const timeDuration = 200;
    glitch()
      .fromImageData(image)
      .toImageData()
      .then((imageData) => {
        this._context.putImageData(imageData, 0, 0);

        setTimeout(() => {
          this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }, timeDuration);
      });
  }

  /**
   * Функция-обертка для вызова помех.
   */
  glitchWrapper(time) {
    let lock = false;

    return (...args) => {
      if (!lock) {
        lock = true;
        /* eslint-disable-next-line */
        this._draw.apply(this, args);

        setTimeout(() => {
          lock = false;
        }, time);
      }
    };
  }
}
