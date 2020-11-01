/* eslint-disable no-undef */
// because all these ball clases lay in another file
// todo fix eslint for such cases of global vars


window.addEventListener('load', () => {
    const whiteModifier = new WhiteModifier();
    const eightModifier = new EightModifier();
    const fullModifier = new FullModifier();
    const halfModifier = new HalfModifier();
    
    const updateState = async () => {
        try {
            const result = await fetch('http://merzlabs.de:9999/tableState');
            const json = await result.json();
            // console.log(json);
    
            if (json.class_count) {
                if (json.class_count === {}) {
                    hideAllBalls();
                } else {
                    showAllBalls();
                    const whiteCount = json.class_count.white;
                    const eightCount = json.class_count['8'];
                    const fullCount = json.class_count.full;
                    const halfCount = json.class_count.half;
    
                    if (whiteCount || whiteCount === 0) updateBall(whiteModifier, whiteCount);
                    if (eightCount || eightCount === 0) updateBall(eightModifier, eightCount);
                    if (fullCount || fullCount === 0) updateBall(fullModifier, fullCount);
                    if (halfCount || halfCount === 0) updateBall(halfModifier, halfCount);
                }
            }
        } catch(e) {
            console.error(e);
            hideAllBalls();
        }
        
        // update state every 5 seconds since that's around the time where new predictions get made
        setTimeout(() => updateState(), 2000);
    }; 
    
    updateState();
});

