import SevenSegmentDisplay from "./SevenSegmentDisplay.js";
import ProfileDetailsEnum from "./DetailsEnum.js";
// import FormValidator from "./FormValidator.js";

const footerDate = document.querySelector(".current-datetime");
const action = document.querySelector(".action-button");
const toggleTheme = document.querySelector(".toggle-theme");
const contactForm = document.querySelector(".contact-form");
const segmentForm = document.querySelector(".segment-input");

let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
const theme = {
  light: {
    "--primary-color": "#f6f6f6",
    "--secondary-color": "#1b4183",
    "--accent-color": "#dddddd",
    "--success-color": "#28a745",
    "--call-to-action": "#c2d2ec",
    "--active-color": "#eeeff3",
    "--info-color": "#17a2b8",
    "--warning-color": "#ffc107",
    "--danger-color": "#dc3545",
    "--light-color": "#fcfcfc",
    "--primary-text-color": "#242424",
  },
  dark: {
    "--primary-color": "#242424",
    "--secondary-color": "#89b3f5",
    "--accent-color": "#888888",
    "--success-color": "#4caf50",
    "--call-to-action": "#5a7dbc",
    "--active-color": "#4a4a4a",
    "--info-color": "#64c0d8",
    "--warning-color": "#ffc957",
    "--danger-color": "#e57373",
    "--light-color": "#3a3a3a",
    "--primary-text-color": "#f6f6f6",
  },
};

async function getProfileInfo() {
  try {
    const response = await fetch(`http://localhost:3000/0`);
    if (!response.ok) {
      throw Error(`Response Status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

function createDetail(container, key, value) {
  key = key.replace(/([A-Z])/g, " $1");
  key = key.charAt(0).toUpperCase() + key.slice(1);

  const paragraphDetail = document.createElement("p");
  paragraphDetail.classList.add("details");
  paragraphDetail.textContent = `${key}: ${value}`;
  container.appendChild(paragraphDetail);
}

function createListItem(container, value) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-content");
  listItem.textContent = value;
  container.appendChild(listItem);
}

// Fetching profile informaiton from the server
window.addEventListener("load", async () => {
  const profileTitle = document.querySelector(".profile-header h2");
  const profileImg = document.querySelector(".profile-picture img");
  const profileDetails = document.querySelector(".about-me .details-container");
  const profileSkillsSection = document.querySelector(".skills ul");
  const profileHobbiesSection = document.querySelector(
    ".content-card.hobbies ul"
  );
  const profileData = (await getProfileInfo())["userData"];
  // console.log(profileData);

  profileTitle.textContent = `Profile Page of ${profileData.firstName} ${profileData.lastName}`;
  profileImg.src =
    profileData.profileImage || "./assets/images/profile_image.png";

  // About me Section
  const details = ((profileData) => {
    const modifiedVersion = {
      fullName: `${profileData.firstName} ${profileData.lastName}`,
    };

    Object.keys(ProfileDetailsEnum).forEach((key) => {
      if (profileData[ProfileDetailsEnum[key]] !== undefined) {
        modifiedVersion[ProfileDetailsEnum[key]] =
          profileData[ProfileDetailsEnum[key]];
      }
    });
    return modifiedVersion;
  })(profileData);

  Object.keys(details).forEach((key) => {
    createDetail(profileDetails, key, details[key]);
  });

  // Skills
  profileData["skills"].forEach((element) => {
    createListItem(profileSkillsSection, element["name"]);
  });

  // Hobbies
  profileData["hobbies"].forEach((element) => {
    createListItem(profileHobbiesSection, element);
  });
});

// Contact form validation

const submitcontactFormBtn = contactForm.querySelector(".action-button");
const emailInputField = contactForm.querySelector("#email");
const emailInputFieldError = emailInputField
  .closest(".input")
  .querySelector(".error");
const msgInputField = contactForm.querySelector("#message");
const msgInputFieldError = msgInputField
  .closest(".input")
  .querySelector(".error");

emailInputField.addEventListener("change", (e) => {
  let email = emailInputField.value.trim();
  let msg = msgInputField.value.trim();

  emailInputFieldError.textContent = "";
  submitcontactFormBtn.setAttribute("disabled", "");

  if (email === "") {
    emailInputFieldError.textContent = "";
    return;
  }

  if (!/\w.+@\w+.\w+/ig.test(email)) {
    emailInputFieldError.textContent = "Invalid Email";
    return;
  }

  if (/^([0-9\W])\w.+@\w+.\w+/ig.test(email)) {
    emailInputFieldError.textContent = "Email can't start with a number";
    return;
  }

  if (!/\.\b(com|org|net)\b$/.test(email)) {
    emailInputFieldError.textContent = "Email should end with .com, .org, or .net";
    return;
  }

  if (!msg || !email) {
    return;
  }

  submitcontactFormBtn.removeAttribute("disabled");
  console.log(email, msg);
});

msgInputField.addEventListener("change", (e) => {
  let email = emailInputField.value.trim();
  let msg = msgInputField.value.trim();

  msgInputFieldError.textContent = "";
  submitcontactFormBtn.setAttribute("disabled", "");

  if (msg === "") {
    msgInputFieldError.textContent = "";
    return;
  }

  console.log(msg.split(" "));

  if (msg.split(" ").length < 5) {
    msgInputFieldError.textContent =
      "The message is too short, Please Add More details";
  }

  if (!msg || !email) {
    return;
  }

  submitcontactFormBtn.removeAttribute("disabled");
  console.log(email, msg);
});

submitcontactFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

// Segment form validation
const submitSegFormBtn = segmentForm.querySelector(".action-button");
const segFormInputField = segmentForm.querySelector("input");
const segInputFieldError = segmentForm.querySelector(".error");
const displays = [];
const canvas = document.getElementById("counter");
canvas.style.display = "none";
const parentWidth = canvas.parentElement.clientWidth;
let testingNumber = "444222";
let numberLength = testingNumber.toString().length;

canvas.width = numberLength * (65 + 30);

segFormInputField.addEventListener("input", () => {
  const val = segFormInputField.value.trim();

  segInputFieldError.textContent = "";
  submitSegFormBtn.setAttribute("disabled", "");

  if (val === "") {
    segInputFieldError.textContent = "";
    canvas.style.display = "none";
    return;
  }

  if (!/^\d+$/.test(val)) {
    segInputFieldError.textContent = "This field should contain numbers only.";
    return;
  }

  if (val.length > 3) {
    segInputFieldError.textContent = "This field should contain 3 digits only.";
    return;
  }

  submitSegFormBtn.removeAttribute("disabled");
});

submitSegFormBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const inputValue = segFormInputField.value.trim();
  const numberLength = inputValue.length;

  canvas.width = numberLength * (65 + 40);

  displays.length = 0;

  canvas.style.display = "block";

  for (let i = 0; i < numberLength; i++) {
    const x = 0 + i * (65 + 20);
    const y = 0;
    displays.push(new SevenSegmentDisplay(canvas, x, y, 40, 40, 8));
  }

  for (let i = 0; i < numberLength; i++) {
    const digit = parseInt(inputValue[i], 10);
    displays[i].applyNumber(digit);
  }

  console.log("Form submitted with:", inputValue);
});

// Dark Theme handling
window.addEventListener("load", () => {
  let toggleThemeMessage = !isDarkMode ? "Dark Theme" : "Light Theme";
  toggleTheme.textContent = toggleThemeMessage;
});

toggleTheme.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  let toggleThemeMessage = !isDarkMode ? "Dark Theme" : "Light Theme";
  toggleTheme.textContent = toggleThemeMessage;

  const root = document.documentElement;
  if (!isDarkMode) {
    for (const [element, value] of Object.entries(theme.light)) {
      root.style.setProperty(element, value);
    }
  } else {
    for (const [element, value] of Object.entries(theme.dark)) {
      root.style.setProperty(element, value);
    }
  }
});

console.log(canvas.width);

setInterval(() => {
  let date = new Date();
  let currentDate = `${date.toDateString()} ${date.toLocaleTimeString()}`;

  footerDate.textContent = currentDate;
}, 1000);
