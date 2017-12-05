
// track setup
var roadPic = document.createElement("img");
var wallPic = document.createElement("img");
var grassPic = document.createElement("img");

var trackWidth = 40;
var trackHeight = 40;
var trackGap = 2;
var trackCols =20;
var trackRow = 15;
var trackGrid = [3,3,3,1,1,1,1,3,3,3,3,3,1,1,1,1,1,3,3,3,
                 3,3,1,0,0,0,0,1,3,3,3,1,0,0,0,0,0,1,3,3,
                 3,1,0,0,0,0,0,0,1,3,1,0,0,0,0,0,0,0,1,1,
                 1,0,0,0,1,0,0,0,0,1,0,0,0,1,1,1,0,0,0,1,
                 1,0,0,1,3,1,0,0,0,0,0,0,1,3,3,3,1,0,0,1,
                 1,0,0,1,3,3,1,0,0,0,0,1,3,3,3,3,1,0,0,1,
                 1,0,0,1,3,3,3,1,1,1,1,3,3,3,3,3,1,0,0,1,
                 1,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,1,
                 1,0,2,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,1,
                 1,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,1,
                 1,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,1,
                 1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,
                 3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,
                 3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,3,
                 3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GRASS = 3;  

 function trackLoadImages(){
   roadPic.src = "Track_Road.png";
   wallPic.src = "Track_Wall.png";
   grassPic.src = "Track_Grass.png";
}

function isWallAtColRow(col, row){
    if(col >= 0 && col < trackCols && row >= 0 && row < trackRow){
    var trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return (trackGrid[trackIndexUnderCoord] == TRACK_WALL);
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
        if(isWallAtColRow(carTrackCol, carTrackRow)){
            carX -= Math.cos(carAng) * carSpeed;
            carY -= Math.sin(carAng) * carSpeed;
            carSpeed *= -0.5;
        }
    }
}

function rowColToArrayIndex(col, row){
    return col + trackCols * row;
}

function drawTrack(){
    for(var eachRow=0;eachRow<trackRow;eachRow++){    
        for(var eachCol=0;eachCol<trackCols;eachCol++){

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if(trackGrid[arrayIndex] == TRACK_ROAD){
                canvasContext.drawImage(roadPic, trackWidth*eachCol, trackHeight*eachRow);
               } else if(trackGrid[arrayIndex] == TRACK_WALL){
                    canvasContext.drawImage(wallPic, trackWidth*eachCol, trackHeight*eachRow);
                  //  console.log("loaded a wall")
               } else if(trackGrid[arrayIndex] == TRACK_GRASS){
                 //  console.log('i load grass heh')
                canvasContext.drawImage(grassPic, trackWidth*eachCol, trackHeight*eachRow);
           } 
        } // end of for loop
    } // end of row for loop
} // end of func