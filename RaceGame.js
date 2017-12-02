
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

// track setup
    var trackWidth = 40;
    var trackHeight = 40;
    var trackGap = 2;
    var trackCols =20;
    var trackRow = 15;
    var trackGrid = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                     1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,
                     1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,
                     1,0,0,0,1,0,0,0,0,1,0,0,0,1,1,1,0,0,0,1,
                     1,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,1,
                     1,0,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,1,
                     1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,
                     1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,
                     1,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,
                     1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,
                     1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,
                     1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,
                     1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
                     1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
                     1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

function updateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

 
}

window.onload = function(){
    // setup the play area for the game
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");
    // setup the frame rate
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);// this repeatedly calls updateAll function for our game loop (30 fps)

    canvas.addEventListener('mousemove', updateMousePos);

   
    ballReset();
 }
// the game loop
function updateAll(){
    moveAll();
    drawAll();
    }

function ballReset(){
    for(var eachRow=0;eachRow<trackRow;eachRow++){    
        for(var eachCol=0;eachCol<trackCols;eachCol++){

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if(trackGrid[arrayIndex] == 2){
                trackGrid[arrayIndex] = 0;
                ballX = eachCol * trackWidth + trackWidth / 2;
                ballY = eachRow * trackHeight + trackHeight /2;
            }
        }
    }        
 }

function ballMove(){
    // move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // ball wall collision checks
    //check right
    if(ballX > canvas.width && ballSpeedX > 0.0){
        ballSpeedX *= -1;
    }
    // check left
    if(ballX < 0 && ballSpeedX < 0.0){
        ballSpeedX *= -1;
    }
    //check bottom
    if(ballY > canvas.height){
        //ballSpeedY *= -1;
        ballReset();
        trackReset();
    }
    //check top
    if(ballY < 0){
        ballSpeedY *= -1;
    }
}

function isTrackAtColRow(col, row){
    if(col >= 0 && col < trackCols && row >= 0 && row < trackRow){
    var trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return (trackGrid[trackIndexUnderCoord] == 1);
    } else {
        return false;
    }
}

function ballTrackHandling(){
    var ballTrackCol = Math.floor(ballX / trackWidth);
    var ballTrackRow = Math.floor(ballY / trackHeight);
    var trackIndexUnderBall = rowColToArrayIndex(ballTrackCol, ballTrackRow);
    
    //colorText(mouseTrackCol+","+mouseTrackRow+": "+trackIndexUnderMouse , mouseX,mouseY, 'yellow')
    if(ballTrackCol >= 0 && ballTrackCol < trackCols && ballTrackRow >= 0 && ballTrackRow < trackRow){
        if(isTrackAtColRow(ballTrackCol, ballTrackRow)){
       
        var prevBallX = ballX - ballSpeedX;
        var prevBallY = ballY - ballSpeedY;
        var prevTrackCol = Math.floor(prevBallX / trackWidth);
        var prevTrackRow = Math.floor(prevBallY / trackHeight);
        
        var bothTestFailed = true;

            if (prevTrackCol != ballTrackCol){
                var adjTrackSide = rowColToArrayIndex(prevTrackCol, ballTrackRow)
                
                if(isTrackAtColRow(prevTrackCol, prevTrackRow) == false){
                    ballSpeedX *= -1;
                    bothTestFailed = false;
                }
            }
            if(prevTrackRow != ballTrackRow){
                var adjTrackTopBot = rowColToArrayIndex(ballTrackCol, prevTrackRow)
                
                if(isTrackAtColRow(ballTrackCol, prevTrackRow) == false){    
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



function moveAll(){
    ballMove();
    ballTrackHandling();
   
 }

function rowColToArrayIndex(col, row){
    return col + trackCols * row;
}

function drawTrack(){
    for(var eachRow=0;eachRow<trackRow;eachRow++){    
        for(var eachCol=0;eachCol<trackCols;eachCol++){

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if(trackGrid[arrayIndex] == 1){
                colorRect(trackWidth*eachCol,trackHeight*eachRow, trackWidth - trackGap,trackHeight - trackGap, 'blue');
            } // end of if 
        } // end of for loop
    } // end of row for loop
} // end of func

function drawAll(){
        // draw background    
        colorRect(bgX,bgY,bgWidth,bgHeight,bgColor);
        // draw tracks
        drawTrack();
        //draw ball
        colorCircle(ballX,ballY, ballRadius, ballColor);
       
        
       
       /* 
        var mouseTrackCol = Math.floor(mouseX / trackWidth);
        var mouseTrackRow = Math.floor(mouseY / trackHeight);
        var trackIndexUnderMouse = rowColToArrayIndex(mouseTrackCol, mouseTrackRow);
        
        colorText(mouseTrackCol+","+mouseTrackRow+": "+trackIndexUnderMouse , mouseX,mouseY, 'yellow')
        if(trackIndexUnderMouse >= 0 && trackIndexUnderMouse < trackCols * trackRow){

            trackGrid[trackIndexUnderMouse] = false;
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
 