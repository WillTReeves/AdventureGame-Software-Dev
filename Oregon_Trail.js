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
        if(e.keyCode == 39) {
            console.log("right");
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            console.log("left");
            leftPressed = true;
        }
        if(e.keyCode == 40) {
            console.log("down");
            downPressed = true;
        }
        else if(e.keyCode == 38) {
            console.log("up");
            upPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
        if(e.keyCode == 40) {
            downPressed = false;
        }
        else if(e.keyCode == 38) {
            upPressed = false;
        }
    }
    /*document.addEventListener("keydown",function(keys){
        switch(keys.key) {
            case "w":
                window.requestAnimationFrame(step);
                break;
            case "s":
                window.requestAnimationFrame(step);
                break;
            case "a":
                window.requestAnimationFrame(step);
                break;
            case "d":
                window.requestAnimationFrame(step);
                break;
       }
    })*/
                                
    

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
            playerX += 5;
        }
        else if(leftPressed) {
            playerX -= 5;
        }
        if(downPressed) {
            playerY += 5;
        }
        else if(upPressed) {
            playerY -= 5;
        }  
        fillCircle(playerX, playerY, r);
        window.requestAnimationFrame(draw);
    }
    draw();
}   


