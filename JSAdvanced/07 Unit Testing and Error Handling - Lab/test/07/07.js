createCalculator = function () {
    let value = 0;
    return {
        add: function(num) { value += num; },
        subtract: function(num) { value -= Number(num); },
        get: function() { return value; }
    }
};

let calc = createCalculator();

calc.add('t');
calc.subtract(1);
console.log(calc.get());



module.exports = createCalculator;
