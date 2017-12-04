
// general setup
 var canvas, canvasContext;
 var mouseX;
 var mouseY;

 const KEY_LEFT_ARROW = 37;
 const KEY_UP_ARROW = 38;
 const KEY_RIGHT_ARROW = 39;
 const KEY_DOWN_ARROW = 40;

 var keyHeld_Gas = false;
 var keyHeld_Reverse = false;
 var keyHeld_TurnLeft = false;
 var keyHeld_TurnRight = false;

// background setup
 var bgX = 0;
 var bgY = 0;
 var bgWidth = 800;
 var bgHeight = 600;
 var bgColor = 'black';
// car setup
 var carPic = document.createElement("img");
 var carPicLoaded = false;

 var carX = 75;
 var carY = 75;
 var carAng = 0;
 var carSpeed = 0;
 var carRadius = 10;
 var carColor = "white";

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

function keyPressed(evt){
  //  console.log("Key pressed: "+evt.keyCode);
    if(evt.keyCode == KEY_LEFT_ARROW){
        keyHeld_TurnLeft = true;
    }
    if(evt.keyCode == KEY_RIGHT_ARROW){
        keyHeld_TurnRight = true;
    }
    if(evt.keyCode == KEY_UP_ARROW){
        keyHeld_Gas = true;
    }
    if(evt.keyCode == KEY_DOWN_ARROW){
        keyHeld_Reverse = true;
    }

    evt.preventDefault();
}

function keyReleased(evt){
  //  console.log("Key Released: "+evt.keyCode);
    if(evt.keyCode == KEY_LEFT_ARROW){
        keyHeld_TurnLeft = false;
    }
    if(evt.keyCode == KEY_RIGHT_ARROW){
        keyHeld_TurnRight = false;
    }
    if(evt.keyCode == KEY_UP_ARROW){
        keyHeld_Gas = false;
    }
    if(evt.keyCode == KEY_DOWN_ARROW){
        keyHeld_Reverse = false;
    }
}

window.onload = function(){
    // setup the play area for the game
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");
    // setup the frame rate
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);// this repeatedly calls updateAll function for our game loop (30 fps)

    canvas.addEventListener('mousemove', updateMousePos);

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    carPic.onload = function(){
        carPicLoaded = true;
    }
      carPic.src = "Player1car.png";
   
    carReset();
 }
// the game loop
function updateAll(){
    moveAll();
    drawAll();
    }

function carReset(){
    for(var eachRow=0;eachRow<trackRow;eachRow++){    
        for(var eachCol=0;eachCol<trackCols;eachCol++){

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if(trackGrid[arrayIndex] == 2){
                trackGrid[arrayIndex] = 0;
                carAng = -Math.PI/2;
                carX = eachCol * trackWidth + trackWidth / 2;
                carY = eachRow * trackHeight + trackHeight /2;
            }
        }
    }        
 }

function carMove(){
    carSpeed *= 0.97;
    if(keyHeld_Gas){
        carSpeed += 0.3;
    }
    if(keyHeld_Reverse){
        carSpeed -= 0.5;
    }
    if(keyHeld_TurnRight){
        carAng += 0.04;
    }
    if(keyHeld_TurnLeft){
        carAng -= 0.04;
    }
    // move the car
    carX += Math.cos(carAng) * carSpeed;
    carY += Math.sin(carAng) * carSpeed;
   // carAng += 0.02;
   
    // car wall collision checks
   
}

function isTrackAtColRow(col, row){
    if(col >= 0 && col < trackCols && row >= 0 && row < trackRow){
    var trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return (trackGrid[trackIndexUnderCoord] == 1);
    } else {
        return false;
    }
}

function carTrackHandling(){
    var carTrackCol = Math.floor(carX / trackWidth);
    var carTrackRow = Math.floor(carY / trackHeight);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
    
    //colorText(mouseTrackCol+","+mouseTrackRow+": "+trackIndexUnderMouse , mouseX,mouseY, 'yellow')
    if(carTrackCol >= 0 && carTrackCol < trackCols && carTrackRow >= 0 && carTrackRow < trackRow){
        if(isTrackAtColRow(carTrackCol, carTrackRow)){
            carX -= Math.cos(carAng) * carSpeed;
            carY -= Math.sin(carAng) * carSpeed;
            carSpeed *= -0.5;
        }
    }
}



function moveAll(){
    carMove();
    carTrackHandling();
   
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
        //draw car
       // colorCircle(carX,carY, carRadius, carColor);
       if(carPicLoaded){
        drawBitmapCenteredWithRotation(carPic, carX,carY, carAng);
       }
        
       
       /* 
        var mouseTrackCol = Math.floor(mouseX / trackWidth);
        var mouseTrackRow = Math.floor(mouseY / trackHeight);
        var trackIndexUnderMouse = rowColToArrayIndex(mouseTrackCol, mouseTrackRow);
        
        colorText(mouseTrackCol+","+mouseTrackRow+": "+trackIndexUnderMouse , mouseX,mouseY, 'yellow')
        if(trackIndexUnderMouse >= 0 && trackIndexUnderMouse < trackCols * trackRow){

            trackGrid[trackIndexUnderMouse] = false;
        }*/
    }

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng){
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
    canvasContext.restore();
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
 