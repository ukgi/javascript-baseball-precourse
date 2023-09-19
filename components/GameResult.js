export default class GameResult {
  constructor($target) {
    this.$target = $target;
    this.setup();
  }

  setup() {
    this.$target.textContent = '';
  }

  printResult(result) {
    this.$target.innerHTML = result;
  }
}
