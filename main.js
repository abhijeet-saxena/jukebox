const pads = document.querySelector(".pads");

const playSoundAndAnimate = target => {
  const audio = target.children[0];
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
  ball.onanimationend = () => document.body.removeChild(ball);
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

let access = null;
let op = document.querySelector(".op");
let link = document.querySelector("a");

const init = async () => {
  access = await navigator.mediaDevices.getUserMedia({ audio: true });
  onSuccess(access);
};

init();

var constraints = { audio: true };
var chunks = [];

var onSuccess = function(stream) {
  var options = {
    mimeType: "audio/webm"
  };

  var mediaRecorder = new MediaRecorder(stream, options);

  mediaRecorder.onstop = function(e) {
    console.log("data available after MediaRecorder.stop() called.");

    var audio = document.createElement("audio");
    audio.controls = true;
    var blob = new Blob(chunks, { type: "audio/mpeg; codecs=opus" });
    var audioURL = window.URL.createObjectURL(blob);

    link.href = audioURL;
    audio.src = audioURL;
    op.appendChild(audio);

    console.log("recorder stopped");
  };

  mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
  };

  mediaRecorder.start();
  console.log("recorder started");

  setTimeout(() => {
    mediaRecorder.stop();
    console.log("recorder stopped");
  }, 20000);
};
