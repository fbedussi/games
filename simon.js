(function init(sequence, userSequence, lightDuration) {
    var lights = ['0','1','2','3'].map(function(id){
       return document.getElementById('l'+id); 
    });
    
    var containerEl = document.getElementById('container');
    var display = document.getElementById('display');
    var points = document.getElementById('points');
    
    containerEl.style.width = containerEl.getBoundingClientRect().height + 'px';
    //display.className = '';

    function getUserInput(e) {
        if (display.className !== 'on') {
            return;
        }
        
        userSequence.push(parseInt(e.target.id.substr(1,1)));
        
        if (userSequence[userSequence.length-1] !== sequence[userSequence.length-1]) {
            display.className = 'fail';
            return;
        }
        
        if (userSequence.length === sequence.length) {
            display.className = 'pass';
            points.innerHTML = sequence.length;
            setTimeout(function(){
                display.className = '';
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
                    display.className = 'on';
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
        if (display.className === 'start') {
            userSequence = [];
            sequence = [];
            display.className = '';
            game();  
        }
        
        if (display.className === 'fail' ) {
            points.innerHTML = '0';
            display.className = 'start';
        }
    });

    //document.getElementById('replay').addEventListener('click', function(){lightOn(0);});
    
    //game();
})([], [], 700);