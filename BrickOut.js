
// general setup
 var canvas, canvasContext;
 var mouseX;
 var mouseY;
// background setup
 var bgX = 0;
 var bgY = 0;
 var bgWidth = 800;
 var bgHeight = 600;
 var bgColor = 'black';
// ball setup
 var ballX = 75;
 var ballY = 75;
 var ballSpeedX = 5;
 var ballSpeedY = 7;
 var ballRadius = 10;
 var ballColor = "white";
// paddle setup
 var paddleWidth = 100;
 var paddleThickness = 10;
 var paddleX = 400;
 var paddleY = 540;
 var paddleColor = 'white';
// brick setup
    var brickWidth = 80;
    var brickHeight = 20;
    var brickGap = 2;
    var brickCols =10;
    var brickRow = 14;
    var brickGrid = new Array(brickCols * brickRow);
    var bricksLeft = 0;
function updateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - paddleWidth/2;

}
function brickReset(){
    bricksLeft = 0;
    var i
    for(i = 0; i < 3*brickCols;i++){
        brickGrid[i] = false;
    }
    for(;i< brickCols * brickRow;i++){
        brickGrid[i] = true;
        bricksLeft++;
    } // end of for loop
} // end of func

window.onload = function(){
    // setup the play area for the game
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");
    // setup the frame rate
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);// this repeatedly calls updateAll function for our game loop (30 fps)

    canvas.addEventListener('mousemove', updateMousePos);

    brickReset();
 }
// the game loop
function updateAll(){
    moveAll();
    drawAll();
    }

function ballReset(){
    ballX = canvas.width/2;
    ballY = canvas.height/2;
 }

function ballMove(){
    // move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // ball wall collision checks
    //check right
    if(ballX > canvas.width){
        ballSpeedX *= -1;
    }
    // check left
    if(ballX < 0){
        ballSpeedX *= -1;
    }
    //check bottom
    if(ballY > canvas.height){
        //ballSpeedY *= -1;
        ballReset();
    }
    //check top
    if(ballY < 0){
        ballSpeedY *= -1;
    }
}

function ballBrickHandling(){
    var ballBrickCol = Math.floor(ballX / brickWidth);
    var ballBrickRow = Math.floor(ballY / brickHeight);
    var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
    
    //colorText(mouseBrickCol+","+mouseBrickRow+": "+brickIndexUnderMouse , mouseX,mouseY, 'yellow')
    if(ballBrickCol >= 0 && ballBrickCol < brickCols && ballBrickRow >= 0 && ballBrickRow < brickRow){
        if(brickGrid[brickIndexUnderBall]){
        brickGrid[brickIndexUnderBall] = false;
        bricksLeft--;
        console.log(bricksLeft);

        var prevBallX = ballX - ballSpeedX;
        var prevBallY = ballY - ballSpeedY;
        var prevBrickCol = Math.floor(prevBallX / brickWidth);
        var prevBrickRow = Math.floor(prevBallY / brickHeight);
        
        var bothTestFailed = true;

            if (prevBrickCol != ballBrickCol){
                var adjBrickSide = rowColToArrayIndex(prevBrickCol, ballBrickRow)
                
                if(brickGrid[adjBrickSide] == false){
                    ballSpeedX *= -1;
                    bothTestFailed = false;
                }
            }
            if(prevBrickRow != ballBrickRow){
                var adjBrickTopBot = rowColToArrayIndex(ballBrickCol, prevBrickRow)
                
                if(brickGrid[adjBrickTopBot] == false){    
                    ballSpeedY *= -1;
                    bothTestFailed = false;
                }
            }
            if(bothTestFailed){
                ballSpeedX *= -1;
                ballSpeedY *= -1;
            }
        }
    }
}

function ballPaddleHandling(){
    // check paddle collision
    var paddleTopEdgeY = paddleY;
    var paddleBottomEdgeY = paddleY + paddleThickness;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleX + paddleWidth;
    if( ballY > paddleTopEdgeY && // below the top of paddle
        ballY < paddleBottomEdgeY && // above the bottom of paddle
        ballX > paddleLeftEdgeX && // right of the left side of paddle
        ballX < paddleRightEdgeX) { // left of the right side of paddle
        
        ballSpeedY *= -1;

        var centerOfPaddleX = paddleX + paddleWidth/2;
        var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
        
        ballSpeedX = ballDistFromPaddleCenterX * 0.35;
        }
}

function moveAll(){
    ballMove();
    ballBrickHandling();
    ballPaddleHandling();
 }

function rowColToArrayIndex(col, row){
    return col + brickCols * row;
}

function drawBrick(){
    for(var eachRow=0;eachRow<brickRow;eachRow++){    
        for(var eachCol=0;eachCol<brickCols;eachCol++){

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if(brickGrid[arrayIndex]){
                colorRect(brickWidth*eachCol,brickHeight*eachRow, brickWidth - brickGap,brickHeight - brickGap, 'blue');
            } // end of if 
        } // end of for loop
    } // end of row for loop
} // end of func

function drawAll(){
        // draw background    
        colorRect(bgX,bgY,bgWidth,bgHeight,bgColor);
        // draw bricks
        drawBrick();
        //draw ball
        colorCircle(ballX,ballY, ballRadius, ballColor);
        //draw paddle
        //colorRect(paddleX - paddleWidth/2,paddleY, paddleWidth,paddleThickness, paddleColor)
        colorRect(paddleX,paddleY, paddleWidth,paddleThickness, paddleColor)
        
       
       /* 
        var mouseBrickCol = Math.floor(mouseX / brickWidth);
        var mouseBrickRow = Math.floor(mouseY / brickHeight);
        var brickIndexUnderMouse = rowColToArrayIndex(mouseBrickCol, mouseBrickRow);
        
        colorText(mouseBrickCol+","+mouseBrickRow+": "+brickIndexUnderMouse , mouseX,mouseY, 'yellow')
        if(brickIndexUnderMouse >= 0 && brickIndexUnderMouse < brickCols * brickRow){

            brickGrid[brickIndexUnderMouse] = false;
        }*/
    }

function colorRect(topLeftX,topLeftY,boxWidth,boxHeight,fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
 }

function colorCircle(centerX,centerY, radius, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
    canvasContext.fill();
 }

function colorText(showWords, textX,textY, fillColor){ 
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX,textY);
}
 