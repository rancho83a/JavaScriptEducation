function solve(...params) {
    function distance(x1, y1, x2, y2) {
        let dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
        const status = Number.isInteger(dist) ? 'valid' : 'invalid';
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${status}`)
    }
    distance(params[0], params[1], 0, 0);
    distance(params[2], params[3], 0, 0);
    distance(params[0], params[1], params[2], params[3]);
}
solve(2, 1, 1, 1);