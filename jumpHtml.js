(function(speed, jumpDuration, speedIncrement, holeMaxLength, holesGap){
    var hero = document.getElementById('hero'),
        field = document.getElementById('field'),
        display = document.getElementById('display'),
        holesJumped = 0, gameOver = false;
    (function game () {
        setTimeout(function(){
            display.innerHTML = holesJumped;
            var l = Math.random()*holeMaxLength;
            var holes = document.querySelectorAll('.hole');
            if (!holes.length || holes[holes.length-1].getBoundingClientRect().right < window.innerWidth*holesGap) {
                var d = document.createElement("div");
                d.className = 'hole';
                d.style.width = l+'%';
                d.style.right = '-' + l + '%';
                field.appendChild(d);
            }
            [].forEach.call(holes,function(hole){
                hole.style.transform = 'translateX(' + (hole.getBoundingClientRect().right - hole.getBoundingClientRect().width - window.innerWidth - 5) + 'px)';
                if (!hero.classList.contains('jump') && hole.getBoundingClientRect().left < hero.getBoundingClientRect().left && hole.getBoundingClientRect().right > hero.getBoundingClientRect().right) {
                    field.classList.add('gameOver');
                }
                if (hole.getBoundingClientRect().left + hole.getBoundingClientRect().width < 0) {
                    field.removeChild(hole);
                    holesJumped++;
                }
            });
            if (!field.classList.contains('gameOver')) {
                window.requestAnimationFrame(game);
            }  
        },speed -=speedIncrement);
    })();
    document.addEventListener('keyup', function (e) {
        hero.classList.add('jump');
        setTimeout(function(){hero.classList.remove('jump');}, jumpDuration);
    }, false);
})(33, 1100, 0.01,14,0.8);