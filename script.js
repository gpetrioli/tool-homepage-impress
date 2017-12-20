(function () {
    'use strict';
    let scrolling = false,
        impressApi = impress();
    
    impressApi.init();
    
    document.documentElement.addEventListener('impress:stepenter', function (e) {
       scrolling = false;
    });
    
    document.documentElement.addEventListener('wheel', function (e) {
        if (!scrolling && e.wheelDelta !== 0) {
            if (e.wheelDelta < 0){
                // wheel scroll down
                impressApi.next();
            } else if (e.wheelDelta > 0) {
                // wheel scroll up
                impressApi.prev();
            }
            scrolling = true;
        }
    });
    
    // [TODO:remove]
    // temporarily expose the impress API to the global
    window['impressApi'] = impressApi;
})();