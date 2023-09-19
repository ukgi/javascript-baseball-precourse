export default class GameInput {
  constructor({ $target, onSubmit }) {
    this.$target = $target;
    this.$input = document.querySelector('#user-input');
    this.$input.disabled = false;
    this.onSubmit = onSubmit;
    this.setEvent();
    this.setup();
  }

  setup() {
    this.$input.value = '';
  }

  setEvent() {
    this.$target.addEventListener('submit', (e) => {
      e.preventDefault();
      const userInput = e.target[0].value;
      this.onSubmit(userInput);
    });
  }

  blockInput() {
    this.$input.disabled = true;
  }
}
