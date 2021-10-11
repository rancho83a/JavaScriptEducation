function game(coordinates) {
    let field = Array(3).fill().map(() => Array(3).fill(false))
    // let field = [3];
    // for(let i=0; i<3; i++) {
    //     field[i] = new Array(3).fill(false);
    // }
    let player = 'X';
    let isPlayerWon = false;
    let count = 0;

    for (let xy = 0; xy < coordinates.length; xy++) {
        let x = Number(coordinates[xy].slice(0, 1));
        let y = Number(coordinates[xy].slice(2));
        //  let [x, y] = xy.split(' ').map(num => Number(num)); 
        if (!field[x][y]) {
            field[x][y] = player;
            count++;
        } else {
            console.log('This place is already taken. Please choose another!');
            continue;
        }

        if (count >= 5 && isWon(field, player)) {
            console.log(`Player ${player} wins!`);
            isPlayerWon = true;
            break;
        }
        if (count === 9) {
            break;
        }
        player = (player == 'X') ? 'O' : 'X';
    };

    if (!isPlayerWon) {
        console.log('The game ended! Nobody wins :(');
    }

    field.forEach((row, i) => {
        console.log(row.join('\t'));
    });

    function isWon(field, player) {
        let upLine = (field[0][0] === field[0][1]) && (field[0][0] === field[0][2]) && (field[0][0] != false);
        let downLine = field[2][0] === field[2][1] && field[2][0] === field[2][2] && field[2][0] != false;
        let leftLine = field[0][0] === field[1][0] && field[0][0] === field[2][0] && field[0][0] != false;
        let rightLine = field[0][2] === field[1][2] && field[0][2] === field[2][2] && field[0][2] != false;
        let diagonal = field[0][0] === field[1][1] && field[0][0] === field[2][2] && field[0][0] != false;
        let reverseDiagonal = field[0][2] === field[1][1] && field[0][2] === field[2][0] && field[0][2] != false;

        return upLine || downLine || leftLine || rightLine || diagonal || reverseDiagonal;
    }
}

game(["0 1",
    "0 0",
    "0 2",
    "2 0",
    "1 0",
    "1 2",
    "1 1",
    "2 1",
    "2 2",
    "0 0"]);
