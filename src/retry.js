function retry(delay, multiplier, whatToDo, callback) {
    'use strict';

    delay = delay * multiplier;
    multiplier--;

    var timer = setTimeout(function loop() {
        if (multiplier > 0) {
            timer = null;
            if (whatToDo()) {
                multiplier = 0;
                callback();
                return true;
            }
            else {
                retry(delay, multiplier, whatToDo, callback);
            }
        }
        else {
            callback();
            return true;
        }
    }, delay);
};