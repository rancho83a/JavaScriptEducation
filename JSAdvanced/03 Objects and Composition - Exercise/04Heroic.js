function hero(input) {
    let store = [];
    input.forEach(row => {
        [name, level, items] = row.split(" / ");
        
       level = Number(level);
        items = (items) ? items.split(', ') : [];      
        store.push({name, level, items});
    });
    return JSON.stringify(store);
}

console.log(hero(['Isacc / 25',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']));