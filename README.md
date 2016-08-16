# retry.js

Wait for delayed (async) scripts.

Retries checking with increasing delay times until the given condition is satisfied or the given maximum is reached.
If successful, the given callback function will be called with parameter {boolean} true or {boolean} false on failure.


## Parameters

retry(*function* **condition**, *function* **callback**, *number* **delay**, *number* **maximum**);


## Example

The following example checks if an external, asynchronously loaded script has been added to the DOM.

```javascript

    // Tries with default values to check condition in condition()
    // Defaults: delay: 25ms, maximum 5 times
    retry(condition, onCallback);
    
    

    /**
     * Returns true if DOM-Element is found or false if not
     *
     * @returns {boolean}
     */
     function condition() {
        var elementExists = !!($('#asyncExternalDomScript').length);

        return elementExists;
    }


    /*
     * Callback-Function
     *
     * Will be called from retry.js with onCallback(true) if the DOM-Element has benn found
     * or with onCallback(false) if not
     *
     * @param {boolean} allRight - State of retry.js callback - True if whatToDo() returns true 
     *                             or false if returns false 
     */
    function onCallback(allRight) {
        if (allRight) {
            alert('DOM-Element has been loaded!');
        }
        else {
            alert('DOM-Element loading has been failed!');
        }
    }
```
