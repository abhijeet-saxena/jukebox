const pads = document.querySelector(".pads");
const startButton = document.querySelector(".start");
const pauseButton = document.querySelector(".pause");
const stopButton = document.querySelector(".stop");
const playButton = document.querySelector(".play");
// const downloadButton = document.querySelector(".download");

let soundsArray = [];
let startTime = null;
let isRecording = false;
let isPlaying = false;

const playSoundAndAnimate = target => {
  const audio = target.children[0];

  if (isRecording) {
    if (soundsArray.length !== 0)
      soundsArray[soundsArray.length - 1].wait = Date.now() - startTime;
    soundsArray.push({ note: target.id, wait: null });
    startTime = Date.now();
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

startButton.addEventListener(
  "click",
  () => {
    if (isPlaying || isRecording) return;
    soundsArray = [];
    startTime = null;
    isRecording = true;
    startButton.classList.add("active");
    pauseButton.style.display = "block";
    stopButton.style.display = "block";
    playButton.style.display = "none";
  },
  false
);

pauseButton.addEventListener(
  "click",
  () => {
    pauseButton.classList.toggle("active");
    if (!isRecording) startTime = Date.now();
    isRecording = !isRecording;
  },
  false
);

stopButton.addEventListener(
  "click",
  () => {
    isRecording = false;
    startButton.classList.remove("active");
    pauseButton.style.display = "none";
    stopButton.style.display = "none";
    if (soundsArray.length) playButton.style.display = "block";
  },
  false
);

const waitAndPlay = (i, lag) => {
  playSoundAndAnimate(document.getElementById(soundsArray[i].note));
  if (i === soundsArray.length - 1) {
    playButton.classList.remove("active");
    startButton.classList.remove("inactive");
    isPlaying = false;
  }
  setTimeout(() => {
    i++;
    if (i < soundsArray.length) waitAndPlay(i, soundsArray[i].wait);
  }, lag);
};

playButton.addEventListener(
  "click",
  () => {
    isPlaying = true;
    playButton.classList.add("active");
    startButton.classList.add("inactive");
    waitAndPlay(0, soundsArray[0].wait);
  },
  false
);
// downloadButton.addEventListener("click", () => stopRecording, false);
