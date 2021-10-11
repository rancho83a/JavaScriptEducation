class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x(){
        return this._x;
    }
    get y(){
        return this._y;
    }

    set x(value){
        if( typeof value != 'number'){
            throw new TypeError('value must be number')
        }
        this._x=value;
    }

    static distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    }

}

let myPoint  = new Point(0,0);
let myPoint2  = new Point(4,3);

//myPoint.x=5;
console.log(myPoint.x);
console.log(Point.distance(myPoint,myPoint2));