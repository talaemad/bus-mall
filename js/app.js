'use strict';

var leftImg = document.getElementById('left-img');
var middleImg = document.getElementById('middle-img');
var rightImg = document.getElementById('right-img');
var maxAttempts = 25;
var userAttemptsCounter = 0;
var allImg = [];
var leftImgIndex;
var middleImgIndex;
var rightImgIndex;

function theImages(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;
    allImg.push(this);
}

new theImages('bag', 'img/bag.jpg');
new theImages('banana', 'img/banana.jpg');
new theImages('bathroom', 'img/bathroom.jpg');
new theImages('boots', 'img/boots.jpg');
new theImages('breakfast', 'img/breakfast.jpg');
new theImages('bubblegum', 'img/bubblegum.jpg');
new theImages('chair', 'img/chair.jpg');
new theImages('cthulhu', 'img/cthulhu.jpg');
new theImages('dog-duck', 'img/dog-duck.jpg');
new theImages('dragon', 'img/dragon.jpg');
new theImages('pen', 'img/pen.jpg');
new theImages('pet-sweep', 'img/pet-sweep.jpg');
new theImages('scissors', 'img/scissors.jpg');
new theImages('shark', 'img/shark.jpg');
new theImages('sweep', 'img/sweep.png');
new theImages('tauntaun', 'img/tauntaun.jpg');
new theImages('unicorn', 'img/unicorn.jpg');
new theImages('usb', 'img/usb.gif');
new theImages('water-can', 'img/water-can.jpg');
new theImages('wine-glass', 'img/wine-glass.jpg');

function renderRandomImgs() {
    leftImgIndex = generateRandomIndex();
    do {
        middleImgIndex = generateRandomIndex();
        rightImgIndex = generateRandomIndex();
        console.log(leftImgIndex, middleImgIndex, rightImgIndex)
    } while (leftImgIndex === middleImgIndex || leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex);

    leftImg.src = allImg[leftImgIndex].source;
    allImg[leftImgIndex].shown++;
    middleImg.src = allImg[middleImgIndex].source;
    allImg[middleImgIndex].shown++;
    rightImg.src = allImg[rightImgIndex].source;
    allImg[rightImgIndex].shown++;
}

function generateRandomIndex() {
    return Math.floor(Math.random() * (allImg.length));
}

console.log(allImg);
renderRandomImgs();

var form = document.getElementById('form');
form.addEventListener('submit', getValue);
function getValue(event) {
    event.preventDefault();
    maxAttempts = event.target.input.value;
}
form.removeEventListener('submit', handleUserClick);

leftImg.addEventListener('click', handleUserClick);
middleImg.addEventListener('click', handleUserClick);
rightImg.addEventListener('click', handleUserClick);

function handleUserClick(event) {
    userAttemptsCounter++;
    if (userAttemptsCounter <= maxAttempts) {
        if (event.target.id === 'left-img') {
            allImg[leftImgIndex].votes++;
        } else if (event.target.id === 'middle-img') {
            allImg[middleImgIndex].votes++;
        }
        else {
            allImg[rightImgIndex].votes++;
        }
        renderRandomImgs();
    }
    else {
        // handle end of voting
        document.getElementById('show-result').style.visibility="visible";
        var viewResult = document.getElementById('theResult');
        viewResult.addEventListener('submit', theResult);

        leftImg.removeEventListener('click', handleUserClick);
        middleImg.removeEventListener('click', handleUserClick);
        rightImg.removeEventListener('click', handleUserClick);
    }
}

function theResult(event) {
    event.preventDefault();
    var results = document.getElementById('Result');
    results.textContent=' ';
    var imgResult;
    for (var i = 0; i < allImg.length; i++) {
        imgResult = document.createElement('li');
        imgResult.textContent = allImg[i].name + 'has ' + allImg[i].votes + ' votes and ' + allImg[i].shown + ' viewers';
        results.appendChild(imgResult);
    }
}
