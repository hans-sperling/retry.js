# retry.js

Retries checking with increasing delays until the condition is satisfied or the given maximum is reached.
If successful, the given callback function will be called with parameter {boolean} true or {boolean} false on failure.

## Function

retry(*number* **delay**, *number* **maximum**, *function* **whatToDo**, *function* **callback**);


## Example & Usage
```javascript

    retry(25, 5, whatToDo, onCallback);

    /**
     * Returns true if DOM-Element is found or false if not
     */
     function whatToDo() {
        var myAsyncExternalDomElement = $('#myAsyncExternalDomElement');

        return myAsyncExternalDomElement;
        }
    }

    /*
     * Callback-Function
     */
    function onCallback(ollRight) {
        if (allRight) {
            alert('DOM-Element has been loaded!');
        }
        else {
            alert('DOM-Element loading has been failed!');
        }
    }
```
