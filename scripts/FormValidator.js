export default class FormValidator {
  constructor(selector) {
    this.form = document.querySelector(selector);
    this.inputsHasErrors = new Set();

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

    //   const inputs = Array.from(this.form.querySelectorAll("input"));
    //   inputs.forEach((input) => input.dispatchEvent(new Event("change")));

    //   this.inputsHasErrors.add("for testing");
      if (!this.hasErrors) {
        this.form.submit();
      }
    });

    this.form.addEventListener("change", () => {
      const requireInputFields = Array.from(
        this.form.querySelectorAll("input[required]")
      );

      const submitButton = this.form.querySelector(".action-button");

      requireInputFields.every((element) => {
        if (element.value == "") return false;

        return true;
      })
        ? submitButton.removeAttribute("disabled")
        : submitButton.setAttribute("disabled", "");
    });
  }

  get hasErrors() {
    return this.inputsHasErrors.size > 0;
  }

  addInputValidation(selector, checkFunction) {
    const inputField = this.form.querySelector(selector);
    const errorElement = inputField.closest(".input").querySelector(".error");

    const execute = (hideError) => {
      const { pass, error } = checkFunction(inputField.value, inputField);

      console.log(checkFunction);
      console.log(pass, error);
      
      
      if (!hideError) {
        errorElement.textContent = error || "";
      }

      if (!pass) {
        this.inputsHasErrors.add(inputField);
      } else {
        this.inputsHasErrors.delete(inputField);
      }
    };

    inputField.addEventListener("change", execute(false));
    execute(true);
  }
}
