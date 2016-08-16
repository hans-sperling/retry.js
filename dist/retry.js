/*! retry.js - Retries checking with increasing delay times until the given condition is satisfied or the given maximum of retries is reached - Version: 2.0.0 */
/**
 * Retries checking with increasing delay times until the given condition is satisfied or the given maximum is reached.
 * If successful, the given callback function will be called with parameter {boolean} true or {boolean} false on
 * failure.
 *
 * Delay-Logic:
 *
 * retry(function condition(){}, function callback(){}, 25, 5);
 *
 * 1) (    delay * (maximum - 0))                                                                    //   25 ms * 5 =  125 ms
 * 2) ((   delay * (maximum - 0)) * (maximum - 1))                                                   //  125 ms * 4 =  500 ms
 * 3) (((  delay * (maximum - 0)) * (maximum - 1)) * (maximum - 2))                                  //  500 ms * 3 = 1500 ms
 * 4) (((( delay * (maximum - 0)) * (maximum - 1)) * (maximum - 2)) * (maximum - 3))                 // 1500 ms * 2 = 3000 ms
 * 5) (((((delay * (maximum - 0)) * (maximum - 1)) * (maximum - 2)) * (maximum - 3)) * (maximum - 4) // 3000 ms * 1 = 3000 ms
 *
 * @param   {function} condition - Function with condition to retry for; should return a boolean
 * @param   {function} callback  - Callback function - Will be called with parameter true if whatToDo() returned true
 *                                 or with false if all retires failed
 * @param   {number}   delay     - Delay in ms to wait for the next retry. Default value is 25.
 * @param   {number}   maximum   - Max retries until aboard. Default value is 5.
 */
function retry(condition, callback, delay, maximum) {
    'use strict';

    var timer = null;

    /**
     * Checks if the type of the given parameter is a number.
     *
     * @param  {*} value
     * @return {boolean}
     */
    function isNumber(value) {
        return Object.prototype.toString.call(value) == "[object Number]";
    }

    /**
     * Checks if the type of the given parameter is a function.
     *
     * @param  {*} value
     * @return {boolean}
     */
    function isFunction(value) {
        return Object.prototype.toString.call(value) == "[object Function]";
    }
    
    // Default values
    if (!isFunction(condition)) { condition = function() { return 1;     };  }
    if (!isFunction(callback))  { callback  = function() { return false; };  }
    if (!isNumber(delay))       { delay     = 25; }
    if (!isNumber(maximum))     { maximum   = 5;  }

    delay = delay * maximum;
    maximum--;

    timer = setTimeout(function loop() {
        if (maximum > 0) {
            timer = null;
            if (condition()) {
                maximum = 0;
                callback(true);
            }
            else {
                retry(condition, callback, delay, maximum);
            }
        }
        else {
            callback(false);
        }
    }, delay);
}
