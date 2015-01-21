define(function(){
    'use strict';

    return {
        easeInOutCubic: function easeInOutCubic(t, b, c, d){
            t /= d/2;
            if (t < 1){
                return c/2*t*t + b;
            }
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },

        easeInCubic: function easeInCubic(t, b, c, d){
            t /= d;
            return c*t*t*t + b;
        },

        easeOutCubic: function easeOutCubic(t, b, c, d){
            t /= d;
            t--;
            return c*(t*t*t + 1) + b;
        }
    };

});
