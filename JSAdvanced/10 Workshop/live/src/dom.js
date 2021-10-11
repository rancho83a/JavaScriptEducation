function e(type, attributes = {}, ...content) {
    let result = document.createElement(type);

    for (let attr in attributes) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLowerCase(), attributes[attr]);
        } else {
            result[attr] = attributes[attr];
        }
    }

    content.forEach(parametr => {
        if (typeof parametr === 'string' || typeof parametr === 'number') {
            const node = document.createTextNode(parametr);
            result.appendChild(node);
        } else {
            result.appendChild(parametr);
        }
    });
    return result;

}