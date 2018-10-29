const visibilityValueConverter = {
    /* A Converter object should have one or two functions (toView and toModel) 
    executed every time when a data should be converted
    */
    
    /* A toView function is called when data will be 
    displayed to the end user as a value of any UI view */
    toView: function (value) {
        if (value) {
            return "collapsed";
        }
        else {
            return "visible";
        }
    },
    /*a toModel function will be called when there is 
    an editable element (like TextField) and the user enters a new value. */
    toModel: function (value) {
        return value;
    }
};

module.exports = visibilityValueConverter;
