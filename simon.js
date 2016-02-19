(function(sequence, lightDuration) {
    var lights = ['0','1','2','3'].map(function(id){
       return document.getElementById('l'+id); 
    });
    
    var containerEl = document.getElementById('container');
    var display = document.getElementById('display');
    var userSequence = [];
    containerEl.style.width = containerEl.getBoundingClientRect().height + 'px';
    
    function addElement(sequence) {
        sequence.push(Math.floor(Math.random()*4));
        return sequence;
    }
    
    function signalEnd() {
        display.classList.remove('hide');
        setTimeout(function(){display.classList.add('hide');}, 1000);
    }
    
    function getUserInput() {
        document.querySelectorAll('light').addEventListener('click', function(e){
            userSequence.push
        });
    }
    
    sequence = addElement(sequence);
    
    (function game() {
        
        (function lightOn (sequencePos) {
            lights[sequence[sequencePos]].classList.add('on');
            setTimeout(function(){
                lights[sequence[sequencePos]].classList.remove('on');
                
                lights[sequence[sequencePos]].addEventListener('transitionend', function nextLight(){
                    lights[sequence[sequencePos]].removeEventListener('transitionend');
                    if (sequencePos < sequence.length-1) {
                        lightOn(++sequencePos);
                    } else {
                        signalEnd();
                        getUserInput();
                    }
                });
            },lightDuration);
        })(0);
        
    })();
})([2],700);