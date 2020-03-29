const pads = document.querySelector(".pads");
const sounds = [];

let startTime = null;
let lastNote = null;

let stop = false;

const playSoundAndAnimate = target => {
  const audio = target.children[0];

  if (!stop) {
    if (startTime)
      sounds.push({ note: lastNote, wait: Date.now() - startTime });
    startTime = Date.now();
    lastNote = target.id;
  }
  audio.currentTime = 0;
  audio.play();
  const color = window
    .getComputedStyle(target)
    .getPropertyValue("background-color");

  const ball = document.createElement("div");
  ball.classList = "ball";
  ball.style.background = color;
  ball.style.animation = "bounce 1000ms ease-in-out";
  document.body.appendChild(ball);
  ball.onanimationend = () => {
    document.body.removeChild(ball);
  };
  pulse();
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

const lines = document.querySelector(".lines");

const linesArray = Array.from(document.querySelectorAll(".line"));

window.onload = () => {
  for (let i = 0; i < linesArray.length; i++) {
    let targetHeight =
      i === 2
        ? "200"
        : [0, 4, 9].indexOf(i) !== -1
        ? "40"
        : [6, 8].indexOf(i) !== -1
        ? "65"
        : "120";
    if (window.innerWidth < 600) targetHeight *= 0.8;
    linesArray[i].style.height = `${targetHeight}px`;
  }
};

const pulse = () => {
  lines.classList.add("ripple");
  setTimeout(() => {
    lines.classList.remove("ripple");
  }, 600);
};

const waitAndPlay = (i, lag) => {
  playSoundAndAnimate(document.getElementById(sounds[i].note));
  setTimeout(() => {
    i++;
    if (i < sounds.length) waitAndPlay(i, sounds[i].wait);
  }, lag);
};

// setTimeout(() => {
//   stop = true;
//   waitAndPlay(0, sounds[0].wait);
// }, 10000);
