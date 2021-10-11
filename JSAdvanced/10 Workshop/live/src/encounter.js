/*globals e, game*/

Object.assign(window.game, (function () {
    return { encounterController };


    function encounterController(enemySlot, player) {
        let characters = [];
        let initiative;
        enemySlot.addEventListener('click', chooseTarget);
        return {
            enter,
            onPlayerAttack,
            onEnemyAttack,
            chooseTarget
        };

        function onPlayerAttack() {
            enableTargeting(player);
        }

        function onEnemyAttack() {
            enableTargeting();
        }

        function chooseTarget({ target }) {
            while (target && target.classList && target.classList.contains('targettable') == false) {
                target = target.parentNode;
            }
            if (target && target.classList && target.classList.contains('targettable')) {
                const selected = characters.find(t => t.element === target);
                if (selected) {
                    characters[initiative].character.attack(selected.character);
                }
                disableTargeting();
                turn();
            } else {
                disableTargeting();
            }
        }

        function enableTargeting(source) {
            characters
                .filter(t => t.character.alive && t != source)
                .forEach(en => en.element.classList.add('targettable'));
        }
        function disableTargeting() {
            characters.forEach(en => en.element.classList.remove('targettable'));
        }

        function turn() {
            if(player.character.alive==false){
               game.events.onEncounterEnd(false);
            }else if(characters.filter(c=>c.character.alive).length==1) {
                game.events.onEncounterEnd(true);
            }

            do {
                initiative = (initiative + 1) % characters.length;
            } while (characters[initiative].character.alive == false);

            characters.forEach(c => c.element.classList.remove('active'));
            characters[initiative].element.classList.add('active');
            game.events.onBeginTurn(characters[initiative]);
        }


        function enter(enemies) {

            characters = [player, ...enemies];
            initiative = -1;
            turn();
        }

    }

})());