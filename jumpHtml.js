(function(speed, heroThickness, heroHeight, jumpHeight){
    var hero = document.getElementById('hero');
        display = document.getElementById('display'),
        holesJumped = 0, gameOver = false, holes = [], jump = false;
    function game () {
        setTimeout(function(){
            //var l = Math.random()*50;
            //if ((!holes.length || holes[holes.length-1][0]+holes[holes.length-1][1]<width*0.8) && l > heroThickness) {holes.push([width, l]);}
            //ctx.clearRect(0,0,width,height);
            //ctx.fillStyle = "black";
            //ctx.fillRect(0,height-heroThickness,width,heroThickness);
            //display.innerHTML = holesJumped;
            //ctx.fillStyle = "red";
            //if (jump) {
            //    ctx.fillRect(10,height-heroThickness-heroHeight-jumpHeight,heroThickness,heroHeight);
            //    
            //} else {
            //    ctx.fillRect(10,height-heroThickness-heroHeight,heroThickness,heroHeight);    
            //} 
            //for(var i = 0; i < holes.length; i++){
            //    if( !jump && holes[i][0] <= 10 && holes[i][0]+holes[i][1] >= 10+heroThickness){gameOver = true;}
            //    ctx.fillStyle = "white";
            //    ctx.fillRect(holes[i][0],height-heroThickness,holes[i][1],heroThickness);
            //    if (holes[i][0]+holes[i][1] <= 0 ) {
            //        holes.splice( i, 1);
            //        i--;
            //        holesJumped++;
            //    } else {
            //        holes[i][0] -= 5;
            //    }
            //}
            //if (!gameOver) {
            //    window.requestAnimationFrame(game);
            //} else {
            //    display.innerHTML += '<span>GAME OVER</span>';
            //    ctx.clearRect(10,height-heroThickness-heroHeight,heroThickness,heroHeight);
            //    ctx.fillStyle = "red";
            //    ctx.fillRect(10,height-heroHeight,heroThickness,heroHeight);
            //}  
        },speed -=0.01);
    }
    document.addEventListener('keyup', function (e) {
        hero.classList.add('jump');
        setTimeout(function(){hero.classList.remove('jump');}, 300);
    }, false);
    game();
})(33,20, 50, 50);