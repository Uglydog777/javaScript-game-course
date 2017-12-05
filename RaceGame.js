
// general setup
 var canvas, canvasContext;
 
// background setup
 var bgX = 0;
 var bgY = 0;
 var bgWidth = 800;
 var bgHeight = 600;
 var bgColor = 'black';

window.onload = function(){
    // setup the play area for the game
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");
    // setup the frame rate
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);// this repeatedly calls updateAll function for our game loop (30 fps)

    setupInput();
    trackLoadImages();
    carImageLoad();
    carReset();
}
// the game loop
function updateAll(){
    moveAll();
    drawAll();
}

function moveAll(){
    carMove();
    carTrackHandling();
   
 }

function drawAll(){
  
    drawTrack();    
    carDraw();

    console.log(carSpeed);

    }


 