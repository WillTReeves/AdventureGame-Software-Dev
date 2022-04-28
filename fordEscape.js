function loadGame(){
    
    const BALL_RADIUS = 15;
    let canvas = document.getElementById("basicMap");
    let ctx = canvas.getContext("2d");
    let r = BALL_RADIUS;
    let prevdir = "s";

    const keys = {up:{upPressed: false},left:{leftPressed: false},down:{downPressed: false},right:{rightPressed: false}}
    
    const map = new Image();
    map.src = "FordFirstFloorMap.png";
    
    let playerRun = new Image();
    playerRun.src = "Alex_run_48x48.png";

    let playerIdle = new Image();
    playerIdle.src = "Alex_idle_anim_48x48.png"
    
    let ericPic = new Image
    ericPic.src = "Old_man_Josh_reading_48x48.png"

    let collisionMap = [];
    for(let i =0; i < collisions.length;i += 56){
        collisionMap.push(collisions.slice(i,56 + i));
    }
    class boundary{
        static square = 88; 
        constructor({position}){
            this.position = position;
            this.width = 88
            this.height = 88
        }
        draw(){
            ctx.fillStyle = 'rgba(255, 0, 0, 0)';
            ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
        }
    }

    let boundaries = [];
    let offset = {
        x:-800,
        y:-1200
    }

    collisionMap.forEach((row,i) => {
        row.forEach((symbol,j) =>{
            if(symbol === 25309){
                boundaries.push(
                    new boundary({
                        position:{
                            x:j * boundary.square + offset.x, 
                            y:i * boundary.square + offset.y
                        }
                    })
                )
            }
        })
    });
    console.log(boundaries);
    // KEYBOARD
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    function keyDownHandler(e) {
        switch(e.key){
            case "ArrowRight":
                keys.right.upPressed = true;
                prevdir = "r";
                break;
            case "d":
                keys.right.upPressed = true;
                prevdir = "r";
                break;
            case "ArrowLeft":
                keys.left.upPressed = true;
                prevdir = "l";
                break;
            case "a":
                keys.left.upPressed = true;
                prevdir = "l";
                break;
            case "ArrowDown":
                keys.down.upPressed = true;
                prevdir = "s";
                break;
            case "s":
                keys.down.upPressed = true;
                prevdir = "s";
                break;
            case "ArrowUp":
                keys.up.upPressed = true;
                prevdir = "w";
                break;
            case "w":
                keys.up.upPressed = true;
                prevdir = "w";
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


    class obj{
        constructor({position, velocity, image}){
            this.position = position;
            this.image = image;
            this.image.onload = () => {
                this.width = this.image.width;
                this.height = this.image.height;
                console.log(this.width);
                console.log(this.height);
            }
        }
        draw(){
            ctx.drawImage(this.image,this.position.x, this.position.y);
        }
    }
    
    class char{
        constructor({position, image, image2, size, frames = {max:5}}){
            this.position = position;
            this.image = image;
            this.image2 = image2;
            this.size = size;
            this.dir = 18;
            this.frames = {...frames, val:0, ela: 0};
        }
        drawIm(){
            switch(prevdir){
                case"r":
                    this.dir = 0;
                    this.draw();
                    break;

                case"l":
                    this.dir = 12;
                    this.draw();
                    break;

                case"s":
                    this.dir = 18;
                    this.draw();
                    break;

                case"w":
                    this.dir = 6;
                    this.draw();
                    break;
            }
        }
        draw(){ 
            if(keys.right.upPressed||keys.left.upPressed||keys.down.upPressed||keys.up.upPressed){
            ctx.drawImage(this.image2,
                this.image.width/24*this.frames.val + this.dir *this.image.width/24 , 0, 
                this.image.width/24,this.image.height, 
                this.position.x-canvas.width/18, this.position.y-canvas.height/12, 
                this.size.x, this.size.y);
            }
            else{
                ctx.drawImage(this.image,
                    this.image.width/24*this.frames.val + this.dir *this.image.width/24 , 0, 
                    this.image.width/24,this.image.height, 
                    this.position.x-canvas.width/18, this.position.y-canvas.height/12, 
                    this.size.x, this.size.y);
            }
            if(this.frames.max > 1){
                this.frames.ela++;
            }

            if(this.frames.ela % 10 ===0){
                if(this.frames.val < this.frames.max){
                    this.frames.val++}
                else{
                    this.frames.val = 0}
                }
            }
    }
        class prof{
        constructor({position, image, size, maxs}){
            this.position = position;
            this.image = image;
            this.size = size;
            this.frames = {max:maxs, val:0, ela: 0};
        }
        draw(){
            ctx.drawImage(this.image,
                this.image.width/18*this.frames.val , 0, 
                this.image.width/18,this.image.height, 
                this.position.x, this.position.y, 
                this.size.x, this.size.y);
            
            if(this.frames.max > 1){
                this.frames.ela++;
            }

            if(this.frames.ela % 10 ===0){
                if(this.frames.val < this.frames.max){
                    this.frames.val++}
                else{
                    this.frames.val = 0}
                }
            }

        
    }   
        
    let player = new char ({
        position:{
            x: canvas.width / 2,
            y: canvas.height / 2
        },
        image: playerIdle,
        image2:playerRun,
        size:{
            x:canvas.width/9,
            y:canvas.height/3
        }
    })
        let eric = new prof({
        position:{
            x:20,
            y:300
        },
        image: ericPic,
        size:{
            x:humwidth,
            y:humheight
        },
        maxs:17
    })

    let backdrop = new obj ({
        position:{
            x:offset.x,
            y:offset.y
        },
        image: map
    })

    

    let staticobj = [backdrop,...boundaries]
    
    function rectangularCollision({ rectangle1, rectangle2 }) {
        return (
          rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
          rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
          rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
          rectangle1.position.y + rectangle1.height >= rectangle2.position.y
        )
      }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
        
        backdrop.draw()
        player.drawIm()

        let moving = true;

        boundaries.forEach(boundary => {
            boundary.draw();
        })


        if(keys.right.upPressed) {
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
                  rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                      ...boundary,
                      position: {
                        x: boundary.position.x - 5,
                        y: boundary.position.y 
                      }
                    }
                  })
                ) {
                    moving = false;
                    break;
                }
              }
          
            if (moving)
              staticobj.forEach((staticobj) => {
                staticobj.position.x -= 5;
                })
        }
        else if(keys.left.upPressed) {
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
                  rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                      ...boundary,
                      position: {
                        x: boundary.position.x + 5,
                        y: boundary.position.y 
                      }
                    }
                  })
                ) {
                    console.log("coliding")
                    moving = false;
                    break;
                }
              }
            if (moving)
              staticobj.forEach((staticobj) => {
                staticobj.position.x += 5;
                })
        }
        else if(keys.down.upPressed) {
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
                  rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                      ...boundary,
                      position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 5
                      }
                    }
                  })
                ) {
                    moving = false;
                    break;
                }
              }
          
            if (moving)
              staticobj.forEach((staticobj) => {
                staticobj.position.y -= 5;
                })
        }
        else if(keys.up.upPressed) {
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (
                  rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                      ...boundary,
                      position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 5
                      }
                    }
                  })
                ) {
                    moving = false;
                    break;
                }
              }
            if (moving)
              staticobj.forEach((staticobj) => {
                staticobj.position.y += 5;
                })
        }
        window.requestAnimationFrame(animate);
    }
    animate();
}

