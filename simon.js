(function(sequence, lightDuration) {
    var lights = ['0','1','2','3'].map(function(id){
       return document.getElementById('l'+id); 
    });
    
    var containerEl = document.getElementById('container');
    
    containerEl.style.width = containerEl.getBoundingClientRect().height + 'px';
    
    function addElement(sequence) {
        sequence.push(Math.floor(Math.random()*4));
        return sequence;
    }
    
    sequence = addElement(sequence);
    
    (function game() {
        
        (function lightOn (sequencePos) {
            lights[sequence[sequencePos]].classList.add('on');
            setTimeout(function(){
                lights[sequence[sequencePos]].classList.remove('on');
                
                lights[sequence[sequencePos]].addEventListener('transitionend', function nextLight(){
                    lights[sequence[sequencePos]].removeEventListener(nextLight);
                    if (sequencePos < sequence.length-1) {
                        lightOn(++sequencePos);
                    }
                });
            },lightDuration);
        })(0);
        
    })();
})([2],700);