# Приложение для создания и редактирования информации о встречах сотрудников

* eslint + airbnb-base
* webpack + webpack-devserver
* glitch-canvas

Для запуск dev-derver
```
npm install
npm start
```

Реализованные эффекты и модули интерфейса:
1. [glitch-canvas](https://github.com/snorpey/glitch-canvas). При установке данного пакета через npm происходят ошибки, поэтому исходный код расположен в папке /lib и подключен в html.
2. Эффект помех на видео реализовано через filter css blur.
3. Эффект красного экрана реализовано вручную с помощью getImageData.
4. Прицел реализован через @keyframes target.
5. Анализаторы звука с помощью 2 canvas элементов и использованием Web Audio Api
6. Воспроизведение речевых фраз реализовано через Yandex SpeechKit.
