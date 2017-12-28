
// track setup

var trackWidth = 40;
var trackHeight = 40;
var trackGap = 2;
var trackCols =20;
var trackRow = 15;
var trackGrid = [4,3,1,1,1,1,1,1,3,3,3,1,1,1,1,1,1,1,3,3,
                 3,1,1,0,0,0,0,1,1,4,1,1,0,0,0,0,0,1,1,3,
                 1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,
                 1,0,0,0,1,0,0,0,0,1,0,0,0,1,1,1,0,0,0,1,
                 1,0,0,1,5,1,0,0,0,0,0,0,1,1,3,5,1,0,0,1,
                 1,0,0,1,3,1,1,0,0,0,0,1,1,3,4,3,1,0,0,1,
                 1,0,0,1,3,3,1,1,1,1,1,1,3,3,3,3,1,0,0,1,
                 1,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,1,
                 1,2,2,1,3,3,4,3,3,3,3,3,3,4,3,3,1,0,0,1,
                 1,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,1,
                 1,0,0,1,5,3,3,3,3,3,3,3,4,3,3,5,1,0,0,1,
                 1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,
                 1,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,1,1,
                 3,1,1,0,0,0,0,0,0,6,0,0,0,0,0,0,0,1,1,3,
                 3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,3];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GRASS = 3;
const TRACK_TREES = 4;
const TRACK_FLAG = 5;
const TRACK_GOAL = 6;  

function returnTileTypeAtColRow(col, row){
    if(col >= 0 && col < trackCols && row >= 0 && row < trackRow){
    var trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return trackGrid[trackIndexUnderCoord];
    } else {
        return TRACK_WALL;
    }
}

function carTrackHandling(whichCar){
    var carTrackCol = Math.floor(whichCar.x / trackWidth);
    var carTrackRow = Math.floor(whichCar.y / trackHeight);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
    
    //colorText(mouseTrackCol+","+mouseTrackRow+": "+trackIndexUnderMouse , mouseX,mouseY, 'yellow')
    if(carTrackCol >= 0 && carTrackCol < trackCols && carTrackRow >= 0 && carTrackRow < trackRow){
        var tileHere = returnTileTypeAtColRow(carTrackCol, carTrackRow);
        
        if(tileHere == TRACK_GOAL){
             console.log(whichCar.name + " is not the loser");
          } else if(tileHere != TRACK_ROAD){
            whichCar.speed *= -0.5;
        }
    }
}

function rowColToArrayIndex(col, row){
    return col + trackCols * row;
}

function drawTrack(){
   
   var arrayIndex = 0;
   var drawTileX = 0;
   var drawTileY = 0;
    for(var eachRow=0;eachRow<trackRow;eachRow++){    
        for(var eachCol=0;eachCol<trackCols;eachCol++){

            
            var tileKindHere = trackGrid[arrayIndex];
            var useImg = trackPics[tileKindHere];

           
            canvasContext.drawImage(useImg, drawTileX, drawTileY);
            drawTileX += trackWidth;
            arrayIndex++;    
        } // end of for loop
        drawTileY += trackHeight;
        drawTileX = 0;
    } // end of row for loop
} // end of func