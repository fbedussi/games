(function(speed, heroThickness, heroHeight, jumpHeight){
    var hero = document.getElementById('hero'),
        field = document.getElementById('field'),
        display = document.getElementById('display'),
        holesJumped = 0, gameOver = false, holes = [], jump = false;
    function game () {
        setTimeout(function(){
            display.innerHTML = holesJumped;
            var l = Math.random()*20;
            var holes = document.querySelectorAll('.hole');
            if (!holes.length || holes[holes.length-1].getBoundingClientRect().right < window.innerWidth*0.8) {
                var d = document.createElement("div");
                d.className = 'hole';
                d.style.width = l+'%';
                field.appendChild(d);
            }
            
            [].forEach.call(holes,function(hole){
               hole.style.transform = 'translateX(' + (hole.getBoundingClientRect().right - window.innerWidth - 5) + 'px)';
               
                if (hole.getBoundingClientRect().left + hole.getBoundingClientRect().width < 0) {
                    field.removeChild(hole);
                    holesJumped++;
                }
            });
            
            if (!gameOver) {
                window.requestAnimationFrame(game);
            } else {
                display.innerHTML += '<span>GAME OVER</span>';
            }  
        },speed -=0.01);
    }
    document.addEventListener('keyup', function (e) {
        hero.classList.add('jump');
        setTimeout(function(){hero.classList.remove('jump');}, 300);
    }, false);
    game();
})(33,20, 50, 50);