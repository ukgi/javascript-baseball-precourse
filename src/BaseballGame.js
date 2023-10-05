import PrintResult from './PrintResult.js';
import UserInput from './UserInput.js';
import validator from '../utils/validator.js';

export default class BaseballGame {
  #isStart;

  constructor() {
    this.$restartBtn = document.querySelector('#game-restart-button');
    this.$restartBtn.addEventListener('click', () => this.#setGameState(true));
    this.#isStart = true;
    this.printResult = new PrintResult();
    this.userInput = new UserInput((userInput) => {
      const userInputNumber = validator(userInput);
      this.printResult.setShowResult(this.#play(this.computerInputNumber, userInputNumber));
    });
    this.#render(); // 모든 DOM, 객체요소들을 만든 후에 랜더링
  }

  #play(computerInputNumbers, userInputNumbers) {
    if (!userInputNumbers) return;
    return this.#printResultMessage(computerInputNumbers, userInputNumbers, this.#setGameState);
  }

  #printResultMessage(computerInputNumbers, userInputNumbers, setGameState) {
    let strike = 0;
    let ball = 0;

    if (!userInputNumbers.some((num) => computerInputNumbers.includes(num))) {
      return '낫싱';
    }

    userInputNumbers.forEach((userNum, i) => {
      if (computerInputNumbers.findIndex((ComNum) => userNum === ComNum) === i) {
        strike += 1;
      } else if (
        computerInputNumbers.findIndex((ComNum) => userNum === ComNum) !== -1 &&
        computerInputNumbers.findIndex((ComNum) => userNum === ComNum) !== i
      ) {
        ball += 1;
      }
    });

    if (strike === 3) {
      setGameState(false);
      return `성공`;
    }
    return `${ball}볼 ${strike}스트라이크`;
  }

  #start() {
    this.$restartBtn.style.display = 'none';
    this.userInput.reset();
    this.printResult.reset();
    this.computerInputNumber = this.#makeComputerInputNumber();
    console.log('컴퓨터', this.computerInputNumber);
  }

  #finish() {
    this.$restartBtn.style.display = 'block';
    this.userInput.finish();
  }

  #setGameState = (newState) => {
    this.#isStart = newState;
    this.#render();
  };

  #render() {
    this.#isStart ? this.#start() : this.#finish();
  }

  #makeComputerInputNumber() {
    let computerInputNumber = new Set();
    while (computerInputNumber.size !== 3) {
      computerInputNumber.add(MissionUtils.Random.pickNumberInRange(1, 9));
    }
    return [...computerInputNumber];
  }
}

const game = new BaseballGame();
