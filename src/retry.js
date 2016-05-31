/**
 * Retries checking with increasing delays until the condition is satisfied or the given maximum is reached.
 * If successful, the given callback function will be called with parameter {boolean} true or {boolean} false on
 * failure.
 *
 * Delay-Logic:
 *
 * retry(25, 5, function(){}, function(){});
 *
 * 1) (    delay * (maximum - 0))                                                                    //   25 ms * 5 =  125 ms
 * 2) ((   delay * (maximum - 0)) * (maximum - 1))                                                   //  125 ms * 4 =  500 ms
 * 3) (((  delay * (maximum - 0)) * (maximum - 1)) * (maximum - 2))                                  //  500 ms * 3 = 1500 ms
 * 4) (((( delay * (maximum - 0)) * (maximum - 1)) * (maximum - 2)) * (maximum - 3))                 // 1500 ms * 2 = 3000 ms
 * 5) (((((delay * (maximum - 0)) * (maximum - 1)) * (maximum - 2)) * (maximum - 3)) * (maximum - 4) // 3000 ms * 1 = 3000 ms
 *
 * @param   {number}   delay      - Delay in ms to wait for the next retry
 * @param   {number}   maximum - Max retries until aboard and
 * @param   {function} whatToDo   - Function with condition to retry for; should return a boolean
 * @param   {function} callback   - Callback function - Will be called with parameter true if whatToDo() returned true
 *                                  or with false if all retires failed
 */
function retry(delay, maximum, whatToDo, callback) {
    'use strict';

    delay = delay * maximum;
    maximum--;

    var timer = setTimeout(function loop() {
        if (maximum > 0) {
            timer = null;
            if (whatToDo()) {
                maximum = 0;
                callback(true);
            }
            else {
                retry(delay, maximum, whatToDo, callback);
            }
        }
        else {
            callback(false);
        }
    }, delay);
}
