let cvsWrapper = null;

const range = (start, end) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}

// assets from: https://github.com/sourabhv/FlapPyBird/tree/master/assets
const stateMode = ["Start", "Play", "End"];
const birdColor = ["blue", "red", "yellow"];
const flapMode = ["up", "mid", "down"];
const bgScrollSpeed = 2;

function preload() {
    bgs = {
        day: loadImage("./assets/sprites/background-day.png"),
        night: loadImage("./assets/sprites/background-night.png")
    };
    base = loadImage("./assets/sprites/base.png")
    start = loadImage("./assets/sprites/message.png");
    digits = range(0, 10).map((x) => loadImage(`./assets/sprites/${x}.png`));
    gameover = loadImage("./assets/sprites/gameover.png");
    birds = range(0, birdColor.length).map((birdType) => {
        return range(0, flapMode.length).map((flapType) => {
            return loadImage(`./assets/sprites/${birdColor[birdType]}bird-${flapMode[flapType]}flap.png`);
        });
    });
}

function plotScore(y, scale) {
    let digitsStr = score.toString().split("");
    let center = (digitsStr.length + 1) / 2;
    digitsStr.forEach((digitStr, index) => {
        image(digits[digitStr], width / 2 + digits[0].width * (index + 1 - center), y, digits[digitStr].width * scale, digits[digitStr].height * scale);
    });
}

function initGame() {
    bg = Math.random() < 0.5 ? bgs["day"] : bgs["night"];
    bird = birds[Math.floor(Math.random() * 10) % birds.length];
    state = "Start";
    score = 0;

    birdState = 1;
    birdy = height * 0.6;
    birdv = 0;
    birda = 0.2;
    birdr = 0;
    birdw = 0;
    birdwa = 0.01;
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
    bgx1 = 0;
    bgx2 = width;
    basey = height - base.height - birds[0][0].height * 1.5 / 2;
    angleMode(DEGREES);
    imageMode(CENTER);
    initGame();
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
    if (state !== "End") {
        scrollBackground();
    }
    imageMode(CORNER);
    image(bg, bgx1, 0, width, height);
    image(bg, bgx2, 0, width, height);
    image(base, bgx1, height - base.height, width, base.height);
    image(base, bgx2, height - base.height, width, base.height);
    imageMode(CENTER);

    // plot game title
    if (state === "Start") {
        image(start, width / 2, height / 2, width * 0.6, height * 0.6);
    }

    // plot score
    if (state === "Play") {
        plotScore(height * 0.2, 1);
        if (birdy < basey) {
            if (birdy + birdv > basey) {
                birdy = basey;
                birdv = 0;
                birda = 0;
                birdw = 0;
                birdwa = 0;
            }
            else {
                birdy += birdv;
                birdv += birda;
                birdr += birdw;
                birdw += birdwa;
            }
            if (birdr < -30) {
                birdr = -30;
                birdw = 0;
            }
            if (birdr > 50) {
                birdr = 50;
                birdwa = 0;
            }
        }
        else {
            state = "End";
        }
    }

    // plot bird
    if (state !== "End" && frameCount % 5 === 0) {
        birdState = (birdState + 1) % flapMode.length;
    }
    let tmpbird = bird[birdState];
    translate(width / 2, birdy);
    rotate(birdr);
    image(tmpbird, 0, 0, tmpbird.width * 1.5, tmpbird.height * 1.5);
    rotate(-birdr);
    translate(-width / 2, -birdy);

    // plot end message
    if (state === "End") {
        image(gameover, width / 2, height * 0.3, gameover.width * 1.5, gameover.height * 1.5);
        plotScore(height * 0.4, 1.5);
    }
}

function keyPressed() {
    if (state === "Start") {
        state = "Play";
    }
    else if (state === "Play") {
        score += 1;
        birdv -= 5;
        birdw -= 0.35;
    }
    else if (state === "End") {
        state = "Start";
        initGame();
    }
}
