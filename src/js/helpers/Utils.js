/*eslint no-bitwise: [0] */
export default {

    /**
     * Randomize a number between the passed range
     * @param  {integer} min 
     * @param  {integer} max 
     * @return {integer}     
     */
    rnd: function(min, max) {
        return Math.floor(Math.random() * max) + min;
    },

    /**
     * between - determine if the passed value is between a certain range 
     * @param  {integer} value 
     * @param  {integer} min   
     * @param  {integer} max  
     * @return {integer}       
     */
    between: function(value, min, max) {
        return value >= min && value <= max;
    },

    /**
     * returns whether the given value is numeric or not
     * @param {mixed} val 
     */
    isNumeric: function(val) {
        return Number(parseFloat(val)) === val;
    },

    /**
     * calculateStepTo - Mesasuring how many steps it takes to arrive at the target number by increasing
     * the current index with step 
     * @param  {integer} start  
     * @param  {integer} target 
     * @param  {integer} max    
     * @param  {integer} step   
     * @return {integer}        
     */
    calculateStepTo: function(start, target, max, step) {
        var stepCount = 0;
        while (start !== target && stepCount < max) {
            start = (start + step) % max;
            if (start < 0) {
                start = max - 1;
            }
            stepCount += 1;
        }
        return stepCount;
    },

    /**
     * getColorFromRatio - Returning green, yellow or red according to 
     * the passed ratio
     * @param {float} ratio
     * @param {string} type if equals to 'hex' the result will be formatted into hexadecimals     
     * @return {string} the calculated color
     */
    getColorFromRatio: function(ratio, type) {
        var color = '#00FF00';

        if (ratio < 0.67 && ratio > 0.33) {
            color = '#FFFF6B';
        } else if (ratio < 0.34) {
            color = '#FF0000';
        }

        return 'hex' !== type ? color.replace('#', '0x') : color;
    },

    /**
     * generates GUID 
     * @return {string} the recently generated GUID
     */
    getGUID: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    /**
     * generates a matrix by the given dimension
     * @param  {integer} cols 
     * @param  {integer} rows 
     * @return {object} Array
     */
    matrix: function(cols, rows){
        var arr = [];
        for (var i = 0; i < rows; i += 1){
            var columns = [];
            for (var j = 0; j < cols; j += 1){
                columns[j] = 0;
            }
            arr[i] = columns;
        }
        return arr;
    },

    /**
     * Calls the given callback at intervals acoording to the given rate
     * @param  {Function} callback 
     * @param  {integer}    rate - every n(th) tick at which the callback will be called
     * @param  {object}     ctx - context in which the function is executed
     * @return {Function} Function that checks if the given callback is due to be triggered
     */
    interval: function(callback, rate, ctx) {
        var counter = rate || 0;
        return function(){
            counter +=1;
            if (counter > rate){
                counter = 0;
                callback.apply(ctx || null, Array.prototype.slice.call(arguments));
            }
        };
    },

    /**
     * Calls the given callback at intervals acoording to the given delay
     * @param  {Function} callback 
     * @param  {integer}    rate - every n(th) tick at which the callback will be called
     * @param  {object}     ctx - context in which the function is executed
     * @return {Function} Function that checks if the given callback is due to be triggered
     */
    intervalMilliseconds: function(callback, milliseconds, ctx) {
        var last = new Date().getTime(),
            now;
        return function(){
            now = new Date().getTime();
            if (now - last > milliseconds){
                callback.apply(ctx || null, Array.prototype.slice.call(arguments));
            }
            last = now;
        };
    },

    /**
     * Measures the distance between the given entities
     * @param {object} source first entity
     * @param {object} target second entity
     * @return {integer} distance in pixels 
     */
    distanceBetween: function (source, target) {

        var dx = source.sprite.x - target.sprite.x;
        var dy = source.sprite.y - target.sprite.y;

        return Math.sqrt(dx * dx + dy * dy);

    },

    /**
     * Measures the distance between the given sprites
     * @param {object} source first entity
     * @param {object} target second entity
     * @return {integer} distance in pixels 
     */
    distanceBetweenSprites: function (source, target) {

        var dx = source.x - target.x;
        var dy = source.y - target.y;

        return Math.sqrt(dx * dx + dy * dy);

    },

    /**
     * Measures the distance between the given sprites
     * @param {object} source first entity
     * @param {object} target second entity
     * @return {integer} distance in pixels 
     */
    distanceBetweenEntityAndCoords: function (source, target) {

        var dx = source.sprite.x - target.x;
        var dy = source.sprite.y - target.y;

        return Math.sqrt(dx * dx + dy * dy);

    },

    /**
     * Deep clones the given parameter
     * @param {mixed} o
     * @return {mixed} cloned version of o
     */
    deepClone: function deepClone(o) {
        var output, v, key;
        output = Array.isArray(o) ? [] : {};
        for (key in o) {
            if (Object.prototype.hasOwnProperty.call(o, key)) {
                v = o[key];
                output[key] = (typeof v === 'object') ? deepClone(v) : v;
            }
        }
        return output;
    },

    /**
     * Reveals the map by visiting each of the fog of war tiles
     * @param {object} map - Instance of Map
     */
    revealMap: function(map) {
        const width = map.getWidth();
        const height = map.getHeight();
        const fogOfWar = map.getFogOfWar();

        for (let i = 0; i < width; i += 1) {
            for (let j = 0; j < height; j += 1) {
              fogOfWar.visit(i, j);
            }
        }
    },

    // Eventlistener object
    EventDispatcher: (function() {

        // Inharitable event dispatcher object
        function EventDispatcher() {
            this.events = {};
        }

        EventDispatcher.prototype.events = {};
        EventDispatcher.prototype.addEventListener = function(type, listener) {
            if (!this.events[type]) {
                this.events[type] = [];
            }
            this.events[type].push(listener);
            return this;
        };
        EventDispatcher.prototype.removeEventListener = function(type, listener) {
            if (!this.events[type]) {
                return this;
            }
            var index = this.events[type].indexOf(listener);
            if (!this.events[type][index]) {
                return this;
            }
            this.events[type].splice(index, 1);
            return this;
        };
        EventDispatcher.prototype.dispatch = function(type, event) {
            if (!this.events[type]) {
                return;
            }
            for (var i in this.events[type]) {
                if (typeof this.events[type][i] === 'function') {
                    this.events[type][i](event);
                } else if (typeof this.events[type][i] === 'object') {
                    this.events[type][i][1].call(
                        this.events[type][i][0],
                        event
                    );
                }
            }
        };
        EventDispatcher.prototype.reset = function() {
            this.events = {};
        }

        return EventDispatcher;

    })()
};
