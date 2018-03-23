/**
 * Класс для отрисовки видео в канвасе. Для помех используется фильтр blur.
 * Также используется агрегат - оболочка для
 * функции вызова помех на ВЕСЬ ИНТЕРФЕЙС, которая отрисовывается каждые 3 секунды в другом канвасе
 */
class Vision {
  constructor(video, canvas, stream, glitch) {
    this._video = video;
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this._video.srcObject = stream;
    // храним оболочку для вызова функции помех, задержка - 3 секунды
    this._glitch = glitch.glitchWrapper(3000);
  }

  /**
   * Отрисовка видео на канвасе с помощью метода RAF, FPS не тормозит,
   * в нули выставляются все пиксели, кроме красных для создания эффекта красного зрения
   */
  _draw() {
    this._context.drawImage(this._video, 0, 0, this._canvas.width, this._canvas.height);

    const image = this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);

    for (let i = 0; i < image.data.length; i += 4) {
      image.data[i + 1] = 0;
      image.data[i + 2] = 0;
    }

    this._context.putImageData(image, 0, 0);

    this._glitch(image);

    requestAnimationFrame(() => this._draw());
  }

  /**
   * Создание помех на видео с помощью фильтра blur
   * Рандомно создаётся несколько фильтров с разным размытием для создания помех.
   */
  _blurVision() {
    let tick = 0;
    const repeat = 5;

    if (tick > repeat) {
      return;
    }

    const timerId = setInterval(() => {
      tick++;
      const radius = (Math.random() * 100).toFixed(1);
      this._canvas.style.filter = `blur(${radius}px)`;

      if (tick > repeat) {
        clearInterval(timerId);
        this._canvas.style.filter = '';
      }
    }, 100);
  }

  /**
   * Старт отрисовки на канвасе плюс запук помех раз в 5 секунд
   */
  startVision() {
    this._draw();
    setInterval(() => this._blurVision(), 5000);
  }
}

module.exports = Vision;
