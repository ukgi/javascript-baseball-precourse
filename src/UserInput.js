export default class UserInput {
  #onSubmit;

  constructor(onSubmit) {
    this.$form = document.querySelector('form');
    this.$input = document.querySelector('#user-input');
    this.#onSubmit = onSubmit;
  }

  reset() {
    this.$input.value = '';
    this.$input.focus();
    this.$form.addEventListener('submit', this.#handleSubmit);
  }

  finish() {
    this.$form.removeEventListener('submit', this.#handleSubmit);
  }

  #handleSubmit = (e) => {
    e.preventDefault();
    const userInput = e.target[0].value;
    this.#onSubmit(userInput);
  };
}
