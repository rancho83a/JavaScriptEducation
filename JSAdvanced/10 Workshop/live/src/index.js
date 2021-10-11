//Start from 2:51:50
/* globals e, game*/

Object.assign(window.game, (function () {
    const playerSlot = document.getElementById('player');
    const enemySlot = document.getElementById('enemies');

    const player = game.createCharacter('player');
    const enemies =
        [
            game.createCharacter('rat'),
            game.createCharacter('skeleton'),
            game.createCharacter('rat')
        ];


    const encounterController = game.encounterController(enemySlot, player);

    const controls =
        e('div', { id: 'controls' }, e('button', { onClick: encounterController.onPlayerAttack }, 'Attack'));
    disableControls();

    playerSlot.appendChild(player.element);
    playerSlot.appendChild(controls);
    enemies.forEach(en => enemySlot.appendChild(en.element));

    game.events.onBeginTurn.subscribe(startGame);
    game.events.onEncounterEnd.subscribe((victory)=>{

        if(victory){
            alert ("Enemies defeated!")
        } else {
            alert('You died!!!');
            disableControls();
        }

    });

    //Begin encounter as player
    encounterController.enter(enemies);


    function startGame(controller) {
        if (controller.character.ai) {
            console.log('AI controlled');
            disableControls();

            setTimeout(()=>{
                encounterController.onEnemyAttack();
                encounterController.chooseTarget({target:player.element});

            },700);
        
        } else {
            enableControls();
        }
    }

    function enableControls() {
        [...controls.children].forEach(c => c.disabled = false);
    }

    function disableControls() {
        [...controls.children].forEach(c => c.disabled = true);
    }
})())


