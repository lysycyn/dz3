/* eslint-disable no-undef */
/* eslint-disable no-console */
/**
 * Воспроизведение фраз с помощью Yandex Speach Kit
 */
export default class Voice {
  static tts() {
    // настройка экземпляра парсера
    return new ya.speechkit.Tts({
      lang: 'ru-RU',
      apikey: 'cd321fd9-fb7b-42d1-9cfa-a4467abd4afa',
      emotion: 'evil',
      speed: 1,
      speaker: 'ermil',
    });
  }

  /**
   * Воспроизведение фразы
   */
  static speakPhraze(phraze) {
    Voice.tts().speak(phraze, {
      stopCallback: () => {
        console.log(phraze);
      },
    });
  }
}
