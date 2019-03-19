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
const pipeScrollSpeed = 3;

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
    die = loadSound("./assets/audio/die.wav");
    hit = loadSound("./assets/audio/hit.wav");
    wing = loadSound("./assets/audio/wing.wav");
    point = loadSound("./assets/audio/point.wav");

    pipegreenlow = loadImage("./assets/sprites/pipe-green-lower.png");
    pipegreenup = loadImage("./assets/sprites/pipe-green-upper.png");
    piperedlow = loadImage("./assets/sprites/pipe-red-lower.png");
    piperedup = loadImage("./assets/sprites/pipe-red-upper.png");
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
    birdw = -4;
    pipex1 = width;
    pipex2 = width * 1.6;
    pipey1 = Math.floor(Math.random() * 500);
    pipey2 = Math.floor(Math.random() * 500);
    pipey1 -= pipey1 / 2;
    pipey2 -= pipey2 / 2;
    pass1 = false;
    pass2 = false;

    let green = Math.random() < 0.5;
    pipeup = green ? pipegreenup : piperedup;
    pipelow = green ? pipegreenlow : piperedlow;
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

function scrollPipe() {
    pipex1 -= pipeScrollSpeed;
    pipex2 -= pipeScrollSpeed;
    if (pipex1 < -pipeup.width) {
        pipex1 = width;
        pass1 = false;
    }
    if (pipex2 < -pipeup.width) {
        pipex2 = width;
        pass2 = false;
    }
}

function detectPipe(bird_x, bird_y, pipe_x, pipe_y) {
    if (bird_x >= pipe_x && bird_x <= pipe_x + pipeup.width * 1.2) {
        if (bird_y <= -240 + pipe_y + pipeup.height * 1.2 || bird_y >= height - base.height - pipelow.height + 30 + pipe_y) {
            return true;
        }
    }
    return false;
}

function draw() {
    // plot background
    if (state !== "End") {
        scrollBackground();
    }
    imageMode(CORNER);
    image(bg, bgx1, 0, width, height);
    image(bg, bgx2, 0, width, height);
    imageMode(CENTER);

    // plot game title
    if (state === "Start") {
        image(start, width / 2, height / 2, width * 0.6, height * 0.6);
    }

    if (state !== "Start") {
        imageMode(CORNER);
        image(pipeup, pipex1, -240 + pipey1, pipeup.width * 1.2, pipeup.height * 1.2);
        image(pipelow, pipex1, height - base.height - pipelow.height + 30 + pipey1, pipelow.width * 1.2, pipelow.height * 1.2);
        image(pipeup, pipex2, -240 + pipey2, pipeup.width * 1.2, pipeup.height * 1.2);
        image(pipelow, pipex2, height - base.height - pipelow.height + 30 + pipey2, pipelow.width * 1.2, pipelow.height * 1.2);
        imageMode(CENTER);
    }

    // plot score
    if (state === "Play") {
        scrollPipe();
        plotScore(height * 0.2, 1);
        if (birdy < basey) {
            birdy += birdv;
            birdv += birda;
            if (birdr <= 60) {
                birdr -= birdw;
            }
        }
        else {
            state = "End";
            hit.play();
            die.play();
        }

        // detect hit pipe
        let birdx = width / 2;
        let hitpipe1 = detectPipe(birdx, birdy, pipex1, pipey1);
        let hitpipe2 = detectPipe(birdx, birdy, pipex2, pipey2);
        if (hitpipe1 || hitpipe2) {
            state = "End";
            hit.play();
            die.play();
        }

        if (!pass1 && birdx > pipex1 + pipeup.width * 1.2) {
            pass1 = true;
            score += 1;
            point.play()
        }
        if (!pass2 && birdx > pipex2 + pipeup.width * 1.2) {
            pass2 = true;
            score += 1;
            point.play();
        }
    }

    imageMode(CORNER);
    image(base, bgx1, height - base.height, width, base.height);
    image(base, bgx2, height - base.height, width, base.height);
    imageMode(CENTER);

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
    wing.play();

    if (state === "Start") {
        state = "Play";
    }
    else if (state === "Play") {
        birdv -= 5;
        birdr = -75;
    }
    else if (state === "End") {
        state = "Start";
        initGame();
    }
}
