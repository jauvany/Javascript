var PocketCalculator = function() {

var allowedOperators = ["+", "-", "*", "/", "="],
    operations = {
        "+": function(a, b) {
            return a + b;
        },
        "-": function(a, b) {
            return a - b;
        },
        "*": function(a, b) {
            return a * b;
        },
        "/": function(a, b) {
            return a / b;
        }
    },
    cache = 0,
    makeOperation = function(b, f) {
        return function() {
            return cache = f(cache, b);
        };
    },
    prevOperation = operations["+"],
    operation = makeOperation(0, prevOperation);
return {
    clear: function() {
        cache = 0;
        prevOperation = operations["+"]
        operation = makeOperation(0, prevOperation);
    },
    push: function(operator, b) {
        if (allowedOperators.indexOf(operator) < 0)
            return;
        if (operator !== "=") {
            prevOperation = operations[operator];
            operation = makeOperation(b, prevOperation);
        } else if (b !== undefined)
            operation = makeOperation(b, prevOperation);
        return operation();
    }
};
};
