const pads = document.querySelector(".pads");

const playSoundAndAnimate = target => {
  const audio = target.children[0];
  const color = window
    .getComputedStyle(target)
    .getPropertyValue("background-color");

  const ball = document.createElement("div");
  ball.classList = "ball";
  ball.style.background = color;
  ball.style.animation = "bounce 1000ms ease-in-out";
  document.body.appendChild(ball);
  ball.onanimationend = () => document.body.removeChild(ball);

  audio.currentTime = 0;
  audio.play();
};

pads.addEventListener("click", event => playSoundAndAnimate(event.target));
pads.addEventListener("touch", event => playSoundAndAnimate(event.target));

document.addEventListener(
  "keypress",
  event => {
    const targetDiv = document.getElementById(event.key.toUpperCase());
    if (targetDiv) playSoundAndAnimate(targetDiv);
  },
  false
);
