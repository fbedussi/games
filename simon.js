(function init(sequence, userSequence, lightDuration) {
    var lights = ['0','1','2','3'].map(function(id){
       return document.getElementById('l'+id); 
    });
    
    var containerEl = document.getElementById('container');
    var display = document.getElementById('display');
    var points = document.getElementById('points');
    
    containerEl.style.width = containerEl.getBoundingClientRect().height + 'px';

    function getUserInput(e) {
        if (containerEl.className !== 'playerTurn') {
            return;
        }
        
        userSequence.push(parseInt(e.target.id.substr(1,1)));
        
        if (userSequence[userSequence.length-1] !== sequence[userSequence.length-1]) {
            containerEl.className = 'fail';
            return;
        }
        
        if (userSequence.length === sequence.length) {
            containerEl.className = 'pass';
            points.innerHTML = sequence.length;
            setTimeout(function(){
                containerEl.className = '';
                game();    
            },1000);
        }
    }
    
    function lightOn (sequencePos) {
        lights[sequence[sequencePos]].classList.add('on');
        setTimeout(function(){
            lights[sequence[sequencePos]].classList.remove('on');
            
            lights[sequence[sequencePos]].addEventListener('transitionend', function nextLight(){
                lights[sequence[sequencePos]].removeEventListener('transitionend', nextLight);
                if (sequencePos < sequence.length-1) {
                    lightOn(++sequencePos);
                } else {
                    containerEl.className = 'playerTurn';
                }
            });
        },lightDuration);
    }
        
    function game() {
        userSequence = [];
        sequence.push(Math.floor(Math.random()*4));
        lightOn(0);
    }   
    
    [].forEach.call(document.querySelectorAll('.light'), function(el) {
        el.addEventListener('click', getUserInput);          
    });
    
    display.addEventListener('click',function(e){
        if (containerEl.className === 'start') {
            userSequence = [];
            sequence = [];
            containerEl.className = '';
            game();  
        }
        
        if (containerEl.className === 'fail' ) {
            points.innerHTML = '0';
            containerEl.className = 'start';
        }
    });
})([], [], 700);