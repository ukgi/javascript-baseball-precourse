export default function makeRandomNumber() {
  let result = new Set();
  while (result.size !== 3) {
    result.add(MissionUtils.Random.pickNumberInRange(1, 9));
  }
  console.log([...result].join(''));
  return [...result].join('');
}
