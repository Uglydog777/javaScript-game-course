var carPic = document.createElement("img");

var roadPic = document.createElement("img");
var wallPic = document.createElement("img");
var grassPic = document.createElement("img");

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
    picsToLoad--;
    if(picsToLoad == 0){
     imageLoadingDoneSoStartGame();    
    }
}

function beginLoadingImages(imgVar, fileName){
    imgVar.onload = countLoadedImagesAndLaunchIfReady; 
    imgVar.src = fileName ;
}

 function loadImages(){
    var imageList = [
        {varName: carPic, theFile: "player1car.png" },
        {varName: roadPic, theFile: "Track_Road.png" },
        {varName: wallPic, theFile: "Track_Wall.png" },
        {varName: grassPic, theFile: "Track_Grass.png" }
    ];

    picsToLoad = imageList.length;

    for( var i = 0; i< imageList.length ; i++){
        beginLoadingImages(imageList[i].varName, imageList[i].theFile);
    }
  //  beginLoadingImages(roadPic, "Track_Road.png");
  //  beginLoadingImages(wallPic, "Track_Wall.png");
  //  beginLoadingImages(grassPic, "Track_Grass.png");
 }