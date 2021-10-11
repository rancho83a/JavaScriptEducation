function solve(face, suit){

    const faces = ['2','3','4','5','6','7','8','9','10','J','Q','K','A',]

    
    const formatSuit ={
        'S':'\u2660',
        'H':'\u2665',
        'D':'\u2666',
        'C':'\u2663',
    }
    if(!Object.keys(formatSuit).includes(suit)){
        throw new Error('Error');
    }
    if(!faces.includes(face)){
        throw new  Error('Error')
    }

    return {
        face,
        suit,
        toString() { return `${face}${formatSuit[suit]}`}
    }
}

console.log(solve('5','H').toString())
console.log(solve('5','wH').toString())