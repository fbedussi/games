(function(elid, width, height, speed, jumpDuration, heroThickness, heroHeight, jumpHeight){
    var ctx = document.querySelector(elid).getContext("2d"), points = 0, display = document.getElementById('display'), l, gameOver = false, holes = [], jump = false;
    canvas.width = width; canvas.height = height;
    (function game () {
        setTimeout(function(){
            if ((!holes.length || holes[holes.length-1][0]+holes[holes.length-1][1]<width*0.8) && (l = Math.random()*50) > heroThickness) {holes.push([width, l]);}
            display.innerHTML = 'Holes jumped: ' + points;
            ctx.clearRect(0,0,width,height);
            ctx.fillStyle = "black";
            ctx.fillRect(0,height-heroThickness,width,heroThickness);
            for(var i = 0; i < holes.length; i++){
                if( !jump && holes[i][0] <= 10 && holes[i][0]+holes[i][1] >= 10+heroThickness){gameOver = true;}
                ctx.fillStyle = "white";
                ctx.fillRect(holes[i][0],height-heroThickness,holes[i][1],heroThickness);
                if (holes[i][0]+holes[i][1] <= 0 && ++points) { holes.splice( i--, 1);} else {holes[i][0] -= 5;}
            }
            ctx.fillStyle = "red";
            if (jump) {
                ctx.fillRect(10,height-heroThickness-heroHeight-jumpHeight,heroThickness,heroHeight);
                setTimeout(function(){jump = false;}, jumpDuration);
            }
            if (!jump && !gameOver) {ctx.fillRect(10,height-heroThickness-heroHeight,heroThickness,heroHeight);} 
            if (!gameOver) {window.requestAnimationFrame(game);} else {
                display.innerHTML += '<span>GAME OVER</span>';
                ctx.fillRect(10,height-heroHeight,heroThickness,heroHeight);
            }  
        },speed -=0.01);
    })();
    document.addEventListener('keyup', function (e) {jump = true;}, false);
})("#canvas",800,600,33,300,20, 50, 50);