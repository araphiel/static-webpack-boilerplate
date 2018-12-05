// A place for helper functions

/**
 * bodyClass Function
 * If the body has this class, return true. Used for page specific javascript
 * @param {string} classname - Expects a classname (i.e. .foobar)
*/

const bodyClass = classname => {
    if (document.body.classList.contains(classname))
        return true
}

export { bodyClass };
