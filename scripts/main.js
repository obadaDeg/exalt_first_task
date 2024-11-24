// import SevenSegmentDisplay from "./SevenSegmentDisplay.js";

const footerDate = document.querySelector(".current-datetime");
const action = document.querySelector(".action-button");
const profileTitle = document.querySelector(".profile-header h2");
const toggleTheme = document.querySelector(".toggle-theme");

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

    const profileData = await response.json();
    console.log(profileData);
  } catch (error) {
    console.log(error.message);
  }
}

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

setInterval(() => {
  let date = new Date();
  let currentDate = `${date.toDateString()} ${date.toLocaleTimeString()}`;

  footerDate.textContent = currentDate;
}, 1000);

// action.removeAttribute('disabled')

// const display = new SevenSegmentDisplay("counter", 0, 0, 40, 40, 8);
// display.startCounter();
