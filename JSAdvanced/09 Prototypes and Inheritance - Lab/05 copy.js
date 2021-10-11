class Figure {
    constructor(unit = 'cm') {
        this.units = unit;
    }

    changeUnits(value) {
        this.units = value
    }

    convert(parametr) {
        const table = {
            'cm': (x) => x,
            'mm': (x) => x * 10,
            'm': (x) => x / 10
        }

        return table[this.units](parametr);
    }

    toString() {
        return `Figures units: ${this.units}`;
    }
}

class Circle extends Figure {
    constructor(radius, unit) {
        super(unit);
        this.radius = radius;
    }
    get area() {
        return this.convert(this.radius) ** 2 * Math.PI;
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
    }
    toString() {
        return `${super.toString()} Area: ${this.area} - radius: ${this.convert(this.radius)}`;
    }
}

class Rectangle extends Figure {
    constructor(width, height, unit) {
        super(unit);
        this.width = width;
        this.height = height;
    }

    get area() {
        return this.convert(this.width) * this.convert(this.height);
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }

    set width(value) {
        this._width = value;
    }


    set height(value) {
        this._height = value;
    }
    toString() {
        return `${super.toString()} Area: ${this.area} - width: ${this.convert(this.width)}, height: ${this.convert(this.height)}`;
    }
}


let c = new Circle(5);
console.log(c.area); // 78.53981633974483
console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new Rectangle(3, 4, 'mm');
console.log(r.area); // 1200 
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits('cm');
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

c.changeUnits('mm');
console.log(c.area); // 7853.981633974483
console.log(c.toString()) // Figures units: mm Area: 7853.981633974483 - radius: 50
