function draw() {
  const canvas = document.getElementById("counter");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(200 0 0)";
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = "rgb(0 0 200 / 50%)";
    ctx.fillRect(30, 30, 50, 50);
  }
}
window.addEventListener("load", draw);


const footerDate = document.querySelector('.current-datetime')

const action = document.querySelector('.action-button')
// action.removeAttribute('disabled')


setInterval(() => {
    let date = new Date();
    let currentDate = `${date.toDateString()} ${date.toLocaleTimeString()}`;

    footerDate.textContent = currentDate;
}, 1000);