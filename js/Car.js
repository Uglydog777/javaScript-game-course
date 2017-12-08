// car setup
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const carDeadStop = 0.3;

function carClass() {


    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;
    this.radius = 10;
    this.color = "white";
    this.myCarPic; // which picture to use

    this.reset = function(whichImage){
        this.myCarPic = whichImage;

        for(var eachRow=0;eachRow<trackRow;eachRow++){    
            for(var eachCol=0;eachCol<trackCols;eachCol++){
    
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                if(trackGrid[arrayIndex] == TRACK_PLAYERSTART){
                    trackGrid[arrayIndex] = TRACK_ROAD;
                    this.ang = -Math.PI/2;
                    this.x = eachCol * trackWidth + trackWidth / 2;
                    this.y = eachRow * trackHeight + trackHeight /2;
                    return;
                }
            }
        }        
     }

    this.move = function(){
        this.speed *= GROUNDSPEED_DECAY_MULT;
        if(keyHeld_Gas){
            this.speed += DRIVE_POWER;
        }
        if(keyHeld_Reverse){
            this.speed -= REVERSE_POWER;
        }
        if(keyHeld_TurnRight && this.speed != 0){
            this.ang += TURN_RATE;
        }
        if(keyHeld_TurnLeft && this.speed != 0){
            this.ang -= TURN_RATE;
        }
        // move the car
        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;
    
    // stop the car make sure speed is 0
        if(this.speed < carDeadStop && !keyHeld_Gas && !keyHeld_Reverse){
            this.speed = 0;
        }
        carTrackHandling(this);
    }


    this.draw = function(){
    drawBitmapCenteredWithRotation(this.myCarPic, this.x,this.y, this.ang);   
    }
}
