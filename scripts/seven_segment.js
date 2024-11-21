const canvas = document.getElementById("counter");

if (canvas.getContext) {
  const ctx = canvas.getContext("2d");
} else {
  console.log("context is not supported");
}
