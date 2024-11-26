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
const submitSegFormBtn = segmentForm.querySelector(".action-button");
const segFormInputField = segmentForm.querySelector("input");
const segInputFieldError = segmentForm.querySelector(".error");
const displays = [];
const canvas = document.getElementById("counter");
const parentWidth = canvas.parentElement.clientWidth;
let testingNumber = "444222";
let numberLength = testingNumber.toString().length;


canvas.width = numberLength * (65 + 30);

segFormInputField.addEventListener("input", () => {
  const val = segFormInputField.value.trim();

  if (val === "") {
    segInputFieldError.textContent = "";
    submitSegFormBtn.setAttribute("disabled", "");
    return;
  }

  if (!/^\d+$/.test(val)) {
    segInputFieldError.textContent = "This field should contain numbers only.";
    submitSegFormBtn.setAttribute("disabled", "");
  } else {
    segInputFieldError.textContent = "";
    submitSegFormBtn.removeAttribute("disabled");
  }
});

submitSegFormBtn.addEventListener("click", (e) => {
  e.preventDefault();



  console.log("Form submitted with:", segFormInputField.value.trim());
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
