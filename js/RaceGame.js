
// general setup
 var canvas, canvasContext;

 var blueCar = new carClass();
 var greenCar = new carClass();

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
    
    // loading screen ;-P
    colorRect(0,0, canvas.width, canvas.height, 'black');
    colorText("Loading Images", canvas.width/2, canvas.height/2, 'white')


    loadImages();
}

function imageLoadingDoneSoStartGame(){
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);// this repeatedly calls updateAll function for our game loop (30 fps)

    setupInput();
    blueCar.reset(carPic, "Blue wind");
    greenCar.reset(otherCarPic, "Green Turd");
}
// the game loop
function updateAll(){
    moveAll();
    drawAll();
}

function moveAll(){
    blueCar.move();
    greenCar.move();
    
   
 }

function drawAll(){
  
    drawTrack();    
    blueCar.draw();
    greenCar.draw();

    }


 