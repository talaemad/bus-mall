'use strict';
// declare variables
var leftImg = document.getElementById('left-img');
var middleImg = document.getElementById('middle-img');
var rightImg = document.getElementById('right-img');
var maxAttempts = 25;
var userAttemptsCounter = 0;
var allImg = [];
var indexImg = [];
var leftImgIndex;
var middleImgIndex;
var rightImgIndex;
var imgName = [];
var imgVote = [];
var imgView = [];

// declare the constractor
function theImages(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;
    this.perVotes = 0;
    this.perShown = 0;
    allImg.push(this);
    indexImg = allImg.indexOf(this.name);
    imgName.push(name);
}

// create objects.
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

// decalre variables to the function
var check = [-1, -1, -1];
var bool;
function renderRandomImgs() {
    do {
        bool = false;
        // genrate the indexes
        leftImgIndex = generateRandomIndex();
        middleImgIndex = generateRandomIndex();
        rightImgIndex = generateRandomIndex();
        // to check that the pic will not appear in the next round
        if (check[0] == -1) {
        
            check[0] = leftImgIndex; check[1] = middleImgIndex; check[2] = rightImgIndex;
        }
        else {
            leftImgIndex = generateRandomIndex();
            var a = check[0];
            var b = check[1];
            var c = check[2];
            if (a == leftImgIndex || b == leftImgIndex || c == leftImgIndex || a == middleImgIndex || b == middleImgIndex || c == middleImgIndex || a == rightImgIndex || b == rightImgIndex || c == rightImgIndex) {
                bool = true;
            }
        }
    } while (leftImgIndex === middleImgIndex || leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex || bool);
    // update the array values
    check[0] = leftImgIndex; check[1] = middleImgIndex; check[2] = rightImgIndex;
    // added the img (objects)
    leftImg.src = allImg[leftImgIndex].source;
    allImg[leftImgIndex].shown++;
    middleImg.src = allImg[middleImgIndex].source;
    allImg[middleImgIndex].shown++;
    rightImg.src = allImg[rightImgIndex].source;
    allImg[rightImgIndex].shown++;
}
// to do random number for the img index
function generateRandomIndex() {
    return Math.floor(Math.random() * (allImg.length));
}
// calling the render to let first round from img to appear
renderRandomImgs();
// the form to get a number of attemps from user.
var form = document.getElementById('form');
form.addEventListener('submit', getValue);
function getValue(event) {
    event.preventDefault();
    maxAttempts = event.target.input.value;
}
form.removeEventListener('submit', handleUserClick);
// add event listener to imgs
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
        document.getElementById('show-result').style.visibility = "visible";
        var viewResult = document.getElementById('theResult');
        viewResult.addEventListener('submit', theResult);
        // remove events
        leftImg.removeEventListener('click', handleUserClick);
        middleImg.removeEventListener('click', handleUserClick);
        rightImg.removeEventListener('click', handleUserClick);
    }
}
// function to show the result & the chart
function theResult(event) {
    event.preventDefault();
    var results = document.getElementById('Result');
    results.textContent = ' ';
    var imgResult;
    percentage();
    for (var i = 0; i < allImg.length; i++) {
        imgResult = document.createElement('li');
        imgResult.textContent = allImg[i].name + 'has ' + allImg[i].votes + ' votes and ' + allImg[i].shown + ' viewers';
        results.appendChild(imgResult);
        imgVote.push(allImg[i].perVotes);
        imgView.push(allImg[i].perShown);
    }
    // the chart
    document.getElementById('title').style.visibility = "visible";
    var ctx = document.getElementById('theChart').getContext('2d');
   
    var chart = new Chart(ctx, {
        // type of chart 
        type: 'bar',
        // data for dataset
        title:{
            text: "Statistics"              
          },
        data: {
            labels: imgName,
            datasets: [
                // data for vote    
                {
                    label: 'Votes',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: imgVote
                },
                // for the showns
                {
                    label: 'showns',
                    backgroundColor: '#4b134f',
                    borderColor: '#4b134f',
                    data: imgView
                },]
        },
        // Configuration options go here
        options: {}
    });
}
// for percentages
function percentage() {
    for (var i = 0; i < allImg.length; i++) {
        allImg[i].perShown = (allImg[i].shown * 100) / maxAttempts;
        allImg[i].perVotes = (allImg[i].votes * 100) / maxAttempts;
    }
}


