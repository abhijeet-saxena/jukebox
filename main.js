const sounds = document.querySelectorAll("audio");
const pads = document.querySelector(".pads");
const animation = document.querySelector(".ball-animation");

pads.addEventListener(
  "click",
  event => {
    const audio = event.target.children[0];
    const targetColor = window
      .getComputedStyle(event.target)
      .getPropertyValue("background-color");

    const ball = document.createElement("div");
    ball.classList = "ball";
    ball.style.background = targetColor;

    document.body.appendChild(ball);

    audio.currentTime = 0;
    audio.play();
  },
  false
);
