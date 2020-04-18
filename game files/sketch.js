let width, height, selected, rock, paper, scissors, waiting;
let imgDim, vidWidth, vidHeight, video, flippedVideo;
function preload() {
    rock = loadImage('assets/rock.png');
    paper = loadImage('assets/paper.png');
    scissors = loadImage('assets/scissors.png');
    waiting = loadImage('assets/waiting.png');

    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/BAr8MxneN/model.json');

}

function setup() {
    width = innerWidth;
    height = innerHeight - 4;
    createCanvas(width, height);

    selected = waiting;
    imgDim = 200;
    vidWidth = 320;
    vidHeight = 260;

    
    video = createCapture(VIDEO);
    video.size(vidWidth, vidHeight);
    video.hide();

    flippedVideo = ml5.flipImage(video);

    classifyVideo();
}

function draw() {
    background(38, 0, 111);
    drawTurn();
    image(flippedVideo, width / 2 - vidWidth / 2, height - vidHeight - 10, vidWidth, vidHeight)
}

function drawTurn() {
    image(selected, width / 2 - imgDim / 2, 100, imgDim, imgDim);
}

function classifyVideo() {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
        return;
    }
    label = results[0].label;

    if(label == 'Rock') {
        selected = paper;
    }
    if(label == 'Paper') {
        selected = scissors;
    }
    if(label == 'Others') {
        selected = waiting;
    }
    if(label == 'Scissor') {
        selected = rock;
    }
    drawTurn();
    classifyVideo();
}

function mousePressed() {
    console.log(label);
}

