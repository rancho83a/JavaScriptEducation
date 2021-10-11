function rectangle(width, height, color) {

    let rect = {
        width, height, color: capitalize(color)
    };
    rect.calcArea = () => {
        return rect.width * rect.height;
    };
    return rect;

    function capitalize(text) {
        return text[0].toUpperCase() + text.slice(1);
    }
}

let rect = rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());