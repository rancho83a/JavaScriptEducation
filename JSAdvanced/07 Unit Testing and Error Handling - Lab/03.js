function solve(input) {

    let res = [];

    const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',]


    const formatSuit = {
        'S': '\u2660',
        'H': '\u2665',
        'D': '\u2666',
        'C': '\u2663',
    }
    let str = '';
A
    input.forEach(card => {
        let suit = card.substring(card.length - 1);
        let face = card.substring(0, card.length - 1);

        if (faces.includes(face) && formatSuit[suit]) {
            res.push(`${face}${formatSuit[suit]}`)
        } else {

            str = `Invalid card: ${face}${suit}`;
            
        }
    });
    if (str) {
        console.log(str);
    } else {
        console.log( res.join(' '));
    }

}

solve(['AS', '10D', 'KH', '2C']);
solve(['5S', '3D', 'QD', '1C']);