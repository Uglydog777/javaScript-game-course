var carPic = document.createElement("img");
var otherCarPic = document.createElement("img");

var trackPics = [];

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
    picsToLoad--;
    if(picsToLoad == 0){
        imageLoadingDoneSoStartGame();    
    }
}

function beginLoadingImages(imgVar, fileName){
    imgVar.onload = countLoadedImagesAndLaunchIfReady; 
    imgVar.src = "images/"+fileName ;
}

function loadImageForTrackCode(trackCode, fileName){
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImages(trackPics[trackCode], fileName);
}

 function loadImages(){
    var imageList = [
        {varName: carPic, theFile: "player1car.png" },
        {varName: otherCarPic, theFile: "player2car.png" },
        {trackType: TRACK_ROAD, theFile: "Track_Road.png" },
        {trackType: TRACK_WALL, theFile: "Track_Wall.png" },
        {trackType: TRACK_GRASS, theFile: "Track_Grass.png"},
        {trackType: TRACK_TREES, theFile: "Track_Trees.png"},
        {trackType: TRACK_FLAG, theFile: "Track_Flag.png"},
        {trackType: TRACK_GOAL, theFile: "Track_Goal.png"}
    ];
    
    picsToLoad = imageList.length;

    for( var i = 0; i< imageList.length ; i++){
        if(imageList[i].varName != undefined){
             beginLoadingImages(imageList[i].varName, imageList[i].theFile);
        } else {
            loadImageForTrackCode( imageList[i].trackType, imageList[i].theFile );
        }     
    }
  //  beginLoadingImages(roadPic, "Track_Road.png");
  //  beginLoadingImages(wallPic, "Track_Wall.png");
  //  beginLoadingImages(grassPic, "Track_Grass.png");
 }