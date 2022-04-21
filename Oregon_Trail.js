function loadGame(){
    
    const BALL_RADIUS = 15;

    let canvas = document.getElementById("basicMap");
    let ctx = canvas.getContext("2d");
    let r = BALL_RADIUS;
    let playerX = canvas.width / 2;//(canvas.width - bx) / 2;
    let playerY = canvas.height / 2;//(canvas.height - by) / 2;
    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;

    // KEYBOARD
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    function keyDownHandler(e) {
        switch(e.key){
            case "ArrowRight":
                rightPressed= true;
            case "d":
                rightPressed= true;
            case "ArrowLeft":
                leftPressed = true;
            case "a":
                leftPressed = true;
            case "ArrowDown":
                downPressed= true;
            case "s":
                downPressed= true;
            case "ArrowUp":
                upPressed = true;
            case "w":
                upPressed = true;
        }
    }
            
        
    function keyUpHandler(e) {
        switch(e.key){
            case "ArrowRight":
                rightPressed= false;
            case "d":
                rightPressed= false;
            case "ArrowLeft":
                leftPressed = false;
            case "a":
                leftPressed = false;
            case "ArrowDown":
                downPressed= false;
            case "s":
                downPressed= false;
            case "ArrowUp":
                upPressed = false;
            case "w":
                upPressed = false;
        }
    }                                
    

    function fillCircle(x, y, r, color) {
        ctx.save();
        if (color !== undefined) {
            ctx.fillStyle = color;
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
        // KEYBOARD

        if(rightPressed) {
            console.log("right")
            playerX += 2;
        }
        else if(leftPressed) {
            console.log("left")
            playerX -= 2;
        }
        else if(downPressed) {
            console.log("down")
            playerY += 2;
        }
        else if(upPressed) {
            console.log("up")
            playerY -= 2;
        } 

        //Collison
        if(playerX > canvas.width - BALL_RADIUS){
            playerX =  canvas.width - BALL_RADIUS ;
        }else if(playerX < BALL_RADIUS){
            playerX = BALL_RADIUS ;
        }
        if(playerY > canvas.height - BALL_RADIUS){
            playerY = canvas.height - BALL_RADIUS ;
        }else if(playerY < BALL_RADIUS){
            playerY = BALL_RADIUS;
        }
        
        if(playerX > 200 && playerX < 300 && playerY === canvas.height - BALL_RADIUS){ //Swap the 200 and the 300 with a input depending on map//this would be for a door at the bottem    
            canvas.style.background = "green";
        }else if(playerX > 200 && playerX < 300 && playerY === BALL_RADIUS){ //Swap the 200 and the 300 with a input depending on map//this would be for a door at the top    
            canvas.style.background = "yellow";
        }
        if(playerY > 75 && playerY < 175 && playerX === canvas.width - BALL_RADIUS){ //Swap the 200 and the 300 with a input depending on map//this would be for a door at the right   
            canvas.style.background = "blue";
        }else if(playerY > 75 && playerY < 175  && playerX === BALL_RADIUS){ //Swap the 200 and the 300 with a input depending on map//this would be for a door at the left   
            canvas.style.background = "red";
        }
        fillCircle(playerX, playerY, r);
        window.requestAnimationFrame(draw);
    }
    draw();
}

