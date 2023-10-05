export default class PrintResult {
  #resultMessage;

  constructor(resultMessage) {
    this.#resultMessage = resultMessage;
    this.$result = document.querySelector('#result');

    this.#render();
  }

  reset() {
    this.$result.textContent = '';
  }

  setShowResult(newMessage) {
    this.#resultMessage = newMessage;
    this.#render();
  }

  #render() {
    if (this.#resultMessage === '성공') this.$result.textContent = `성공했습니다!`;
    else this.$result.textContent = this.#resultMessage;
  }
}
