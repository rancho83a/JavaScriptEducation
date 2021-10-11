/* globals e, game*/

Object.assign(window.game, (function () {

    const templates = {
        player: {
            name: 'Player',
            hp: 100,
            dmg: 25,
            img:'player.png'
        },
        rat: {
            name: 'Rat',
            hp: 30,
            dmg: 10,
            img:'rat.png',
            ai:true
        },
        skeleton: {
            name: 'Skeleton',
            hp: 50,
            dmg: 15,
            img:'skeleton.png',
            ai:true
        },

    }

    return { createCharacter };
    function createCharacter(type) {
        const character = Object.assign({
            alive: true,
            attack,
            takeDamage
        },
            templates[type]
        );
        character.maxHp=character.hp;

        let element = createCharachterCard(character);


        return { character, element };

        function attack(target) {
            console.log(`${character.name} attacks ${target.name} for ${character.dmg} damge`)
            target.takeDamage(character.dmg);

        }

        function takeDamage(incomingDmg) {
            console.log(`${character.name} took ${incomingDmg} damage`)
            character.hp = Math.max(character.hp - incomingDmg, 0);
            if (character.hp === 0) {
                character.alive = false;
            }
            element.update();
        }
    }

    function createCharachterCard(character) {
        const stats = {
            hp: e('span', {}, `${character.hp} / ${character.maxHp}`),

        };
        const element = e('article', { className: 'character-card' },
            e('div', { className: 'portrait' }, e('img', { src: 'assets/'+character.img })),
            e('div', { className: 'description' },
                e('h3', {}, character.name),
                e('ul', { className: 'stats' },
                    e('li', {}, 'HP: ', stats.hp),
                    e('li', {}, 'Damage: ', e('span', {}, `${character.dmg}`))
                )
            )
        );

        element.update = update;
        return element;

        function update() {
            stats.hp.textContent = `${character.hp} / ${character.maxHp}`;
            if (!character.alive) {
                element.classList.add('wasted');
            }
        }
    }

})());
