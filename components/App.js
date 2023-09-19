import { makeRandomNumber, validator } from '../src/helper.js';
import GameInput from './GameInput.js';
import GameResult from './GameResult.js';

export default class App {
  computerInputNumbers = 0;

  constructor($target) {
    this.$target = $target;
    this.$refreshBtn = document.querySelector('#game-restart-button');
    this.$refreshBtn.addEventListener('click', () => {
      this.setIsStart(true);
    });
    this.isStart = true;
    this.render();
  }

  setIsStart(newState) {
    this.isStart = newState;
    this.render();
  }

  render() {
    this.isStart ? this.start() : this.finish();
  }

  start() {
    this.computerInputNumbers = makeRandomNumber();
    this.gameResult = new GameResult(document.querySelector('#result'));
    this.gameInput = new GameInput({
      $target: document.querySelector('form'),
      onSubmit: (userInputNumbers) => {
        validator(userInputNumbers)
          ? this.gameResult.printResult(this.play(this.computerInputNumbers, userInputNumbers))
          : this.showInputErrorMessage();
      },
    });
    this.$refreshBtn.style.display = 'none';
  }

  finish() {
    this.$refreshBtn.style.display = 'block';
    this.gameInput.blockInput();
  }

  showInputErrorMessage() {
    alert('중복되지 않는 세자리 수를 입력해주세요!');
  }

  play(computerInputNumbers, userInputNumbers) {
    if (computerInputNumbers === userInputNumbers) {
      this.setIsStart(false);
      return `<h1>🎉성공했습니다🎉</h1><p>게임을 다시 시작하시겠습니까?</p>`;
    }

    let ci = new Set(this.computerInputNumbers);
    let ui = new Set(userInputNumbers);
    let result = new Set();
    let strike = 0;
    let ball = 0;

    for (const num of ui) {
      if (ci.has(num)) result.add(num);
    }

    [...result].forEach((num) => {
      [...ci].findIndex((value) => value === num) === [...ui].findIndex((value) => value === num) ? strike++ : ball++;
    });

    return strike && !ball
      ? `${strike}스트라이크`
      : ball && !strike
      ? `${ball}볼`
      : strike && ball
      ? `${ball}볼 ${strike}스트라이크`
      : '낫싱';
  }
}
