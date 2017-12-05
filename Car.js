// car setup
var carPic = document.createElement("img");
var carPicLoaded = false;

var carX = 75;
var carY = 75;
var carAng = 0;
var carSpeed = 0;
var carRadius = 10;
var carColor = "white";
var carDeadStop = 0.3;

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;

function carImageLoad(){
    carPic.onload = function(){
        carPicLoaded = true;
    }
      carPic.src = "Player1car.png";
}

function carMove(){
    carSpeed *= GROUNDSPEED_DECAY_MULT;
    if(keyHeld_Gas){
        carSpeed += DRIVE_POWER;
    }
    if(keyHeld_Reverse){
        carSpeed -= REVERSE_POWER;
    }
    if(keyHeld_TurnRight && carSpeed != 0){
        carAng += TURN_RATE;
    }
    if(keyHeld_TurnLeft && carSpeed != 0){
        carAng -= TURN_RATE;
    }
    // move the car
    carX += Math.cos(carAng) * carSpeed;
    carY += Math.sin(carAng) * carSpeed;
   
   // stop the car make sure speed is 0
    if(carSpeed < carDeadStop && !keyHeld_Gas && !keyHeld_Reverse){
        carSpeed = 0;
    }
}

function carReset(){
    for(var eachRow=0;eachRow<trackRow;eachRow++){    
        for(var eachCol=0;eachCol<trackCols;eachCol++){

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if(trackGrid[arrayIndex] == TRACK_PLAYERSTART){
                trackGrid[arrayIndex] = TRACK_ROAD;
                carAng = -Math.PI/2;
                carX = eachCol * trackWidth + trackWidth / 2;
                carY = eachRow * trackHeight + trackHeight /2;
            }
        }
    }        
 }

 function carDraw(){
    if(carPicLoaded){
        drawBitmapCenteredWithRotation(carPic, carX,carY, carAng);
       }
 }