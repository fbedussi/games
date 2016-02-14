(function(elid, width, height, speed, jumpDuration, heroThickness, heroHeight, jumpHeight){
    var canvas = document.querySelector(elid),
            ctx = canvas.getContext("2d"),
            holesJumped = 0,
            gameOver = false;
            holes = [],
            jump = false;
        
    canvas.width = width; canvas.height = height;
    ctx.font="40px Arial";
    
    var game = function() {
            setTimeout(function(){
            //Add new holes
            var l;
            if ((!holes.length || holes[holes.length-1][0]+holes[holes.length-1][1]<width*0.8) && (l = Math.random()*50) > heroThickness) {
               holes.push([width, l]);
            }
            
            //Floor
            ctx.fillStyle = "black";
            ctx.fillRect(0,height-heroThickness,width,heroThickness);
        
            //Hero
            ctx.fillStyle = "red";
            ctx.clearRect(0, 0, width, 100);
            ctx.fillText(holesJumped,10,50);
            if (jump) {
                ctx.clearRect(10,height-heroThickness-heroHeight,heroThickness,heroHeight);
                ctx.fillRect(10,height-heroThickness-heroHeight-jumpHeight,heroThickness,heroHeight);
                setTimeout(function(){
                    jump = false;
                }, jumpDuration);
            } else {
                ctx.clearRect(10,height-heroThickness-heroHeight-jumpHeight,heroThickness,heroHeight);
                ctx.fillRect(10,height-heroThickness-heroHeight,heroThickness,heroHeight);    
            }
            
            for(var i = 0; i < holes.length; i++){
                //Check
                if( !jump && holes[i][0] <= 10 && holes[i][0]+holes[i][1] >= 10+heroThickness){
                    ctx.clearRect(10,height-heroThickness-heroHeight,heroThickness,heroHeight);
                    ctx.fillRect(10,height-heroHeight,heroThickness,heroHeight);
                    gameOver = true;
                    //alert("Game over. You jumped " + holesJumped + " holes.");
                }
                
                //Holes animation
                ctx.fillStyle = "white";
                ctx.fillRect(holes[i][0],height-heroThickness,holes[i][1],heroThickness);
                if( holes[i][0]+holes[i][1] <= 0 ){
                    holes.splice( i, 1);
                    i--;
                    holesJumped++;
                } else {
                    holes[i][0] -= 5;
                }
            }
            
            if (!gameOver) {
                speed -=0.01;
                window.requestAnimationFrame(game);
            } else {
                ctx.fillStyle = "red";
                ctx.fillText("GAME OVER",10,100);
                ctx.fillRect(10,height-heroHeight,heroThickness,heroHeight);
            }
            
        },speed);
    };
    
    document.addEventListener('keyup', function (e) {
        if (e.keyCode !== 116) { //F5
            jump = true;
        }
    }, false);
    
    game();
})("#canvas",800,600,33,300,20, 50, 50);