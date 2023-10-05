import ERROR from '../constant/errorMessage.js';

export default function validator(value) {
  try {
    if (![...value].every((num) => !isNaN(num))) throw new Error(ERROR.INPUT_INVALID_VALUE_TYPE);
    if ([...value].length !== 3) throw new Error(ERROR.INPUT_INVALID_LENGTH);
    if (new Set([...value]).size !== 3) throw new Error(ERROR.INPUT_INVALID_VALUE_DUPLICATION);

    return [...value].map((num) => +num);
  } catch (error) {
    alert(error.message);
  }
}
