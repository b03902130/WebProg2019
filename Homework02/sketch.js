let cvsWrapper = null;

// assets from: https://github.com/sourabhv/FlapPyBird/tree/master/assets
var stateMode = ["Start", "Play", "End"];
var state = "Start";
var score = 0;

function preload() {
    bg = loadImage(`./assets/sprites/background-${Math.random() < 0.5 ? "day" : "night"}.png`);
    start = loadImage("./assets/sprites/message.png");
    digits = [...Array(10).keys()].map((x) => loadImage(`./assets/sprites/${x}.png`));
    gameover = loadImage("./assets/sprites/gameover.png")
}

function plotScore(y) {
    let digitsStr = score.toString().split("");
    let center = (digitsStr.length + 1) / 2;
    digitsStr.forEach((digitStr, index) => {
        image(digits[digitStr], width / 2 + digits[0].width * (index + 1 - center), y);
    })
    if (score === 10) {
        state = "End";
    }
}

function setup() {
    // Game basic setup.
    // Mounting canvas onto div for convenient styling.
    cvsWrapper = document.getElementById("canvasWrapper");
    const myCanvas = createCanvas(
        cvsWrapper.offsetWidth,
        cvsWrapper.offsetHeight
    );
    myCanvas.parent("canvasWrapper");

    // setup code below
    bgScrollSpeed = 2;
    pipeScrollSpeed = 3;
    bgx1 = 0
    bgx2 = width;
}

function scrollBackground() {
    bgx1 -= bgScrollSpeed;
    bgx2 -= bgScrollSpeed;
    if (bgx1 < -width) {
        bgx1 = width;
    }
    if (bgx2 < -width) {
        bgx2 = width;
    }
}

function draw() {
    // plot background
    if (state === "Start" || state === "Play") {
        scrollBackground();
    }
    image(bg, bgx1, 0, width, height);
    image(bg, bgx2, 0, width, height);

    // plot game title
    if (state === "Start") {
        imageMode(CENTER);
        image(start, width / 2, height / 2, width * 0.6, height * 0.6);
        imageMode(CORNER);
    }

    // plot score
    if (state === "Play") {
        imageMode(CENTER);
        plotScore(height * 0.2);
        imageMode(CORNER);
    }

    if (state === "End") {
        imageMode(CENTER);
        image(gameover, width / 2, height * 0.4);
        plotScore(height * 0.5);
        imageMode(CORNER);
    }
}

function keyPressed() {
    if (state === "Start") {
        state = "Play";
    }
    else if (state === "Play") {
        // state = "End";
        score += 1;
    }
    else if (state === "End") {
        state = "Start";
        score = 0;
    }
}
