function loadGame(){
    
    let canvas = document.getElementById("basicMap");
    let ctx = canvas.getContext("2d");
    let prevdir = "s";
    let humwidth = canvas.width/12
    let humheight = canvas.height/4

    const keys = {up:{upPressed: false},left:{leftPressed: false},down:{downPressed: false},right:{rightPressed: false}}
    
    const map = new Image();
    map.src = "FordFirstFloorMap.png";
    
    let playerRun = new Image();
    playerRun.src = "Alex_run_48x48.png";

    let playerIdle = new Image();
    playerIdle.src = "Alex_idle_anim_48x48.png"
    
    let rPic = new Image()
    rPic.src = "Old_man_Josh_reading_48x48.png";

    let jPic = new Image()
    jPic.src = "Conference_man_phone_48x48.png";

    let cPic  = new Image()
    cPic.src = "Bruce_idle_anim_48x48.png";

    let mood = new Image()
    mood.src = "Mood_changer_squeeze_48x48.png"

    let stu = new Image()
    stu.src = "Witch_idle_anim_48x48.png"
    
    let j = new Image()
    j.src = "Old_woman_Jenny_reading_48x48.png"

    let re = new Image()
    re.src = "Ash_sit3_48x48.png"

    let collisionMap = [];
    for(let i =0; i < collisions.length;i += 56){
        collisionMap.push(collisions.slice(i,56 + i));
    }
    class boundary{
        static square = 64; 
        constructor({position}){
            this.position = position;
            this.width = 64
            this.height = 64
        }
        draw(){
            ctx.fillStyle = 'rgba(255, 0, 0, 0)';
            ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
        }
    }

    let boundaries = [];
    let offset = {
        x:-800,
        y:-1000
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

            if(this.frames.ela % 20 ===0){
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
            this.max = maxs+1
            this.frames = {max:maxs, val:0, ela: 0};
        }
        draw(){
            ctx.drawImage(this.image,
                this.image.width/this.max*this.frames.val , 0, 
                this.image.width/this.max,this.image.height, 
                this.position.x, this.position.y, 
                this.size.x, this.size.y);
            
            if(this.frames.max > 1){
                this.frames.ela++;
            }

            if(this.frames.ela % 20 ===0){
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
            x:humwidth,
            y:humheight
        }
    })
    let r = new prof({
        position:{
            x:-200,
            y: 464
        },
        image: rPic,
        size:{
            x:humwidth,
            y:humheight
        },
        maxs:17
    })

    let jamis = new prof({
        position:{
            x:1960,
            y:-500
        },
        image: jPic,
        size:{
            x:humwidth,
            y:humheight
        },
        maxs: 8
    })

    let calvin = new prof({
        position:{
            x:1850,
            y:-500
        },
        image: cPic,
        size:{
            x:humwidth,
            y:humheight
        },
        maxs: 5
    })

    let moods = new prof({
        position:{
            x:1865,
            y:-520
        },
        image: mood,
        size:{
            x:100,
            y:50
        },
        maxs: 2

    })

    let stud = new prof({
        position:{
            x:30,
            y:-785
        },
        image: stu,
        size:{
            x:humwidth,
            y:humheight
        },
        maxs: 5
    })

    let jen = new prof({
        position:{
            x:610,
            y:-520
        },
        image: j,
        size:{
            x:humwidth,
            y:humheight
        },
        maxs: 17
    })

    let ret = new prof({
        position:{
            x:2600,
            y:850
        },
        image: re,
        size:{
            x:humwidth,
            y:humheight
        },
        maxs: 5
    })

    let backdrop = new obj ({
        position:{
            x:offset.x,
            y:offset.y
        },
        image: map
    })

    let staticobj = [backdrop,...boundaries,r,jamis,calvin,moods,stud,jen,ret ];
    
    function rectangularCollision({ rectangle1, rectangle2 }) {
        return (
          rectangle1.position.x + (rectangle1.size.x-50) >= rectangle2.position.x &&
          rectangle1.position.x -32 <= rectangle2.position.x + rectangle2.width &&
          rectangle1.position.y +24 <= rectangle2.position.y + rectangle2.height &&
          rectangle1.position.y + (rectangle1.size.y-50)>= rectangle2.position.y
        )
      }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
        
        backdrop.draw()
        player.drawIm()
        r.draw()
        jamis.draw()
        calvin.draw()
        moods.draw()
        stud.draw()
        jen.draw()
        ret.draw()

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
                    console.log("col");
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

