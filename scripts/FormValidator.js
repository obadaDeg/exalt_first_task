// export default class FormValidator {
//   constructor(selector) {
//     this.form = document.querySelector(selector);
//     this.inputsHasErrors = new Set();

//     this.form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       this.validateAllInputs();
//       if (!this.hasErrors) {
//         console.log("Form is valid and ready to submit!");
//         this.form.submit();
//       } else {
//         console.log("Form has errors, submission blocked.");
//       }
//     });

//     this.form.addEventListener("input", () => {
//       const requiredInputs = Array.from(
//         this.form.querySelectorAll("input[required], textarea[required]")
//       );
//       const submitButton = this.form.querySelector(".action-button");

//       const allFilled = requiredInputs.every(
//         (input) => input.value.trim() !== ""
//       );

//       allFilled
//         ? submitButton.removeAttribute("disabled")
//         : submitButton.setAttribute("disabled", "");
//     });
//   }

//   get hasErrors() {
//     return this.inputsHasErrors.size > 0;
//   }

//   addInputValidation(selector, checkFunction) {
//     const inputField = this.form.querySelector(selector);
//     const errorElement = inputField?.closest(".input")?.querySelector(".error");

//     const validateInput = () => {
//       const { pass, error } = checkFunction(inputField.value, inputField);

//       if (!pass) {
//         this.inputsHasErrors.add(inputField);
//         errorElement.textContent = error;
//       } else {
//         this.inputsHasErrors.delete(inputField);
//         errorElement.textContent = "";
//       }
//     };

//     inputField.addEventListener("input", validateInput);

//     validateInput();
//   }

//   validateAllInputs() {
//     const inputs = Array.from(
//       this.form.querySelectorAll("input[required], textarea[required]")
//     );
//     inputs.forEach((input) => {
//       const event = new Event("input");
//       input.dispatchEvent(event);
//     });
//   }
// }

// for main

// function validateNumber(value, element) {
//   if (isNaN(parseInt(value))) {
//     console.log(parseInt(value));
//     return { pass: true };
//   }

//   console.log(parseInt(value), "from me");

//   return {
//     pass: false,
//     error: "Field must be a number",
//   };
// }

// function validateNumber(value, element) {
//   if (/^\d+$/g.test(value)) {
//     return { pass: true };
//   }
//   console.log(/^\d+$/g.test(value), 'from regex');
  
//   return {
//     pass: false,
//     error: "Field must be a number",
//   };
// }


// const contactFormValidator = new FormValidator(".contact-form");
// const segmentFormValidator = new FormValidator(".segment-input");

// function validateLength(value, inputField) {
//   if (value.length === 0 || value.length > 5) {
//     return {
//       pass: false,
//       error: "Username must be between 1 - 5 characters."
//     };
//   }

//   return {
//     pass: true
//   };
// }

// contactFormValidator.addInputValidation('#email', validateLength)
// // segmentFormValidator.addInputValidation("input", validateNumber);

