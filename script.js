(function () {
    'use strict';
    let scrolling = false,
        impressApi,
        mobileBreakpoint = 769,
        isMobile = window.innerWidth < mobileBreakpoint;
    
    impressRestructure(null, true);
    impressApi = impress();
    impressApi.init();
    
    document.documentElement.addEventListener('impress:stepenter', function (e) {
       scrolling = false;
    });
    
    document.documentElement.addEventListener('wheel', function (e) {
        if (!scrolling && e.wheelDelta !== 0) {
			let delta = e.deltaY;
            if (delta > 0){
                // wheel scroll down
                impress().next();
            } else if (delta < 0) {
                // wheel scroll up
                impress().prev();
            }
            scrolling = true;
        }
    });
    
    
    window.addEventListener('resize', impressRestructure)
    
    
    function impressRestructure(event, force){
        let mobileSize = window.innerWidth < mobileBreakpoint;
        
        if (mobileSize && (force || !isMobile)) {
            isMobile = true;
            // restructure the impress slides to the mobile layout and redraw
            impressApi && impressApi.tear();
            impressRedraw('mobile');
        } else if (!mobileSize && (force || isMobile)) {
            isMobile = false;
            // restrucure the impress to the desktop layout and redraw
            impressApi && impressApi.tear();
            impressRedraw('desktop');
        }
    }
    
    function impressRedraw(setup){
        let steps = Array.from(document.querySelectorAll('#impress,.step')),
            props = ['X','Y','Z','Rotate', 'Scale', 'Width', 'Height'];
        
        steps.forEach(function(step){
            resetData(step, props, setup);
        });
        //let active = document.querySelector('.step.active');
        impressApi = impress();
        impressApi.init();
        //impress().goto(active);
    }
    
    function resetData(node, props, prefix){
        var dataset = node.dataset;
        props.forEach(function(prop){
            let combinedProp = prefix+prop;
            if(dataset.hasOwnProperty(combinedProp)){
                dataset[prop.toLowerCase()] = dataset[combinedProp];
            }
        })
    }
    
    // [TODO:remove]
    // temporarily expose the impress API to the global
    //window['impressApi'] = impressApi;
})();