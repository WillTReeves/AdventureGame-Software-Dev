function loadGame(){
    
    const BALL_RADIUS = 15;
    const INITIAL_VX = 0.1;     /* X velocity in pixels/msec */
    const INITIAL_VY = 0.1;     /* Y velocity in pixels/msec */

    let canvas = document.getElementById("basicMap");
    let ctx = canvas.getContext("2d");
    let r = BALL_RADIUS;
    let bx = canvas.width / 2;
    let by = canvas.height / 2;
    let vx = INITIAL_VX;
    let vy = INITIAL_VY;
    let lastTimestamp = 0;

    document.addEventListener("keydown",function(keys){
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
    })
                                
    


    function step(timestamp) {
        let dt = timestamp - lastTimestamp;            
        if (lastTimestamp === 0) {
            dt = 0;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        fillCircle(bx, by, r);
        bx += dt * vx;
        by += dt * vy;
        if (bx < r || bx > canvas.width - r) {
            vx = -vx;
        }
        if (by < r || by > canvas.height - r) {
            vy = -vy;
        }
        lastTimestamp = timestamp;
        window.requestAnimationFrame(step);
        
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
    
}

