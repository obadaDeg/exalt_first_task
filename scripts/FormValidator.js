export default class FormValidator {
  constructor(selector) {
    this.form = document.querySelector(selector);
    this.inputsHasErrors = new Set();

    this.form.addEventListner("submit", (e) => {
      e.preventDefault();

      if (!this.hasErrors) {
        this.form.submit();
      }
    });
  }

  get hasErrors() {
    return this.inputsHasErrors.size > 0;
  }

  addInputValidation(selector, checkFunction) {
    const inputField = this.form.querySelector(selector);
    const errorElement = this.inputField
      .closest(".input")
      .querySelector(".error");

    const execute = (hideError) => {
      const { pass, error } = checkFunction(inputField.value, inputField);

      if (!hideError) {
        errorElement = error || "";
      }

      if(!pass) {
        this.inputsHasErrors.add(inputField);
      } else {
        this.inputsHasErrors.delete(inputField);
      }
    };

    inputField.addEventListner('change', execute());
    execute(true);
  }
}
