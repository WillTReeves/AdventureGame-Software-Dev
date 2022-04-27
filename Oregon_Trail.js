function loadGame(){
    
    const BALL_RADIUS = 15;
    let canvas = document.getElementById("basicMap");
    let ctx = canvas.getContext("2d");
    let r = BALL_RADIUS;
    let playerX = canvas.width / 2;//(canvas.width - bx) / 2;
    let playerY = canvas.height / 2;//(canvas.height - by) / 2;
    const keys = {up:{upPressed: false},left:{leftPressed: false},down:{downPressed: false},right:{rightPressed: false}}
    const map = new Image();
    map.src = "map.png";

    // KEYBOARD
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    function keyDownHandler(e) {
        switch(e.key){
            case "ArrowRight":
                keys.right.upPressed = true;
                break;
            case "d":
                keys.right.upPressed = true;
                break;
            case "ArrowLeft":
                keys.left.upPressed = true;
                break;
            case "a":
                keys.left.upPressed = true;
                break;
            case "ArrowDown":
                keys.down.upPressed = true;
                break;
            case "s":
                keys.down.upPressed = true;
                break;
            case "ArrowUp":
                keys.up.upPressed = true;
                break;
            case "w":
                keys.up.upPressed = true;
                break;
        }
    }
            
        
    function keyUpHandler(e) {
        switch(e.key){
            case "ArrowRight":
                keys.right.upPressed = false;
                break;
            case "d":
                keys.right.upPressed = false;
                break;
            case "ArrowLeft":
                keys.left.upPressed = false;
                break;
            case "a":
                keys.left.upPressed = false;
                break;
            case "ArrowDown":
                keys.down.upPressed = false;
                break;
            case "s":
                keys.down.upPressed = false;
                break;
            case "ArrowUp":
                keys.up.upPressed = false;
                break;
            case "w":
                keys.up.upPressed = false;
                break;
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

    class background{
        constructor({postiton, velocity, image}){
            this.postiton = postiton;
            this.image = image;
        }
        draw(){
            ctx.drawImage(this.image,this.postiton.x, this.postiton.y);
        }
    }

    let backdrop = new background({
        postiton:{
            x:0,
            y:0
        },
        image: map
    })

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
        // KEYBOARD
        backdrop.draw()
        if(keys.right.upPressed) {
            backdrop.postiton.x -= 10;
            console.log("x"+ backdrop.postiton.x);
        }
        else if(keys.left.upPressed) {
            backdrop.postiton.x += 10;
            console.log("x"+ backdrop.postiton.x);
        }
        else if(keys.down.upPressed) {
            backdrop.postiton.y -= 2;
            console.log("y"+ backdrop.postiton.y);
        }
        else if(keys.up.upPressed) {
            backdrop.postiton.y += 2;
            console.log("y"+ backdrop.postiton.y);
        }
        if(backdrop.postiton.x < -3507 + 250  + BALL_RADIUS){
            backdrop.postiton.x =  -3507 + 250 + BALL_RADIUS ;
        }else if(backdrop.postiton.x > 250 - BALL_RADIUS){
            backdrop.postiton.x = 250 - BALL_RADIUS;
        } 
        if(backdrop.postiton.y < -2480 + 150 + BALL_RADIUS){
            backdrop.postiton.y =   -2480 + 150 + BALL_RADIUS;
        }else if(backdrop.postiton.y > 150 - BALL_RADIUS ){
            backdrop.postiton.y = 150 - BALL_RADIUS;
        } 

        fillCircle(playerX, playerY, r);
        window.requestAnimationFrame(animate);
    }
    animate();
``}

