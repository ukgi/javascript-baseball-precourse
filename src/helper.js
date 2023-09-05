export function makeRandomNumber() {
  let result = new Set();
  while (result.size !== 3) {
    result.add(MissionUtils.Random.pickNumberInRange(1, 9));
  }
  console.log([...result].join(''));
  return [...result].join('');
}

export function validator(input) {
  if (input.length > 3) {
    return false;
  }
  let userInput = new Set(input + '');
  return userInput.size === 3 ? true : false;
}
