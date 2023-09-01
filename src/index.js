'use strict';

// export default class BaseballGame {
//     play(computerInputNumbers, userInputNumbers) {
//       return "결과 값 String";
//     }
//   }

//   // 예시
//   play(123, 456); // '낫싱'
//   play(123, 345); // '1볼'
//   play(123, 432); // '2볼'
//   play(123, 312); // '3볼'
//   play(123, 145); // '1스트라이크'
//   play(123, 134); // '1볼 1스트라이크'
//   play(123, 132); // '2볼 1스트라이크'
//   play(123, 124); // '2스트라이크

let isStart = true;
let computerInputNumbers;
const form = document.querySelector('form');
const result = document.getElementById('result');
const refreshBtn = document.getElementById('game-restart-button');
render();

function render() {
  isStart ? start() : finish();
}

function setIsStart(bool) {
  isStart = bool;
  render();
}

function start() {
  makeRandomNumber();
  form.addEventListener('submit', handleSubmit);
  result.innerHTML = ``;
  refreshBtn.style.display = 'none';
}

function finish() {
  form.removeEventListener('submit', handleSubmit);
  result.innerHTML = `<h1>🎉성공했습니다🎉</h1><p>게임을 다시 시작하시겠습니까?</p>`;
  refreshBtn.style.display = 'block';
  refreshBtn.addEventListener('click', handleRefresh);
}

function handleRefresh() {
  setIsStart(true);
}

function handleSubmit(e) {
  e.preventDefault();
  const userInputNumbers = e.target[0].value;
  console.log('유저입력', userInputNumbers);
  validator(userInputNumbers) ? match(computerInputNumbers, userInputNumbers) : error();
}

function makeRandomNumber() {
  let result = new Set();
  while (result.size !== 3) {
    result.add(MissionUtils.Random.pickNumberInRange(1, 9));
  }
  computerInputNumbers = [...result].join('');
  console.log(computerInputNumbers);
}

function match(computerInputNumbers, userInputNumbers) {
  computerInputNumbers === userInputNumbers ? setIsStart(false) : fail(userInputNumbers);
}

function validator(input) {
  if (input.length > 3) {
    return false;
  }
  let userInput = new Set(input + '');
  return userInput.size === 3 ? true : false;
}

function error() {
  alert('중복되지 않는 세자리 수를 입력해주세요!');
}

function fail(userInputNumbers) {
  let message = '';
  intersection(userInputNumbers) ? (message = intersection(userInputNumbers)) : (message = '낫씽');
  result.textContent = message;
}

function intersection(userInputNumbers) {
  let ci = new Set(computerInputNumbers);
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
    : false;
}
