import makeRandomNumber from './helper.js';

export default class BaseballGame {
  constructor() {
    this.isStart = true;
    this.computerInputNumbers = 0;
    this.form = document.querySelector('form');
    this.result = document.getElementById('result');
    this.refreshBtn = document.getElementById('game-restart-button');
    this.input = document.getElementById('user-input');
    this.refreshBtn.addEventListener('click', this.handleRefresh);
    this.render();
  }

  render() {
    this.isStart ? this.start() : this.finish();
  }

  setIsStart(bool) {
    this.isStart = bool;
    this.render();
  }

  start() {
    this.form.addEventListener('submit', this.handleSubmit);
    this.input.value = '';
    this.input.focus();
    this.computerInputNumbers = makeRandomNumber();
    this.result.innerHTML = ``;
    this.refreshBtn.style.display = 'none';
  }

  finish() {
    this.form.removeEventListener('submit', this.handleSubmit);
    this.result.innerHTML = `<h1>🎉성공했습니다🎉</h1><p>게임을 다시 시작하시겠습니까?</p>`;
    this.refreshBtn.style.display = 'block';
  }

  handleRefresh = () => {
    this.setIsStart(true);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userInputNumbers = e.target[0].value;
    this.validator(userInputNumbers) ? this.match(this.computerInputNumbers, userInputNumbers) : this.error();
  };

  match(computerInputNumbers, userInputNumbers) {
    computerInputNumbers === userInputNumbers ? this.setIsStart(false) : this.fail(userInputNumbers);
  }

  validator(input) {
    if (input.length > 3) {
      return false;
    }
    let userInput = new Set(input + '');
    return userInput.size === 3 ? true : false;
  }

  error() {
    alert('중복되지 않는 세자리 수를 입력해주세요!');
  }

  fail(userInputNumbers) {
    let message = '';
    message = this.play(userInputNumbers);
    this.result.textContent = message;
  }

  play(userInputNumbers) {
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
