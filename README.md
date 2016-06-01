# retry.js

Retries checking with increasing delays until the condition is satisfied or the given maximum is reached.
If successful, the given callback function will be called with parameter {boolean} true or {boolean} false on failure.

## Function

retry(*number* **delay**, *number* **maximum**, *function* **whatToDo**, *function* **callback**);


## Example & Usage

The following example checks if an external, asynchronously loaded script has been added to the DOM.

```javascript

    // Tries 5 times to check condition in whatToDo()
    retry(25, 5, whatToDo, onCallback);
    
    

    /**
     * Returns true if DOM-Element is found or false if not
     *
     * @returns {boolean}
     */
     function whatToDo() {
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
