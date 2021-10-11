function factory(car) {

    const {
        model, power, carriage,  color, wheelsize
    } = car;

    function getEngine(power) {
        engine = { power: 90, volume: 1800 };
        if (power > 90 & power <= 120) {
            engine = { power: 120, volume: 2400 };
        } else if (power > 120) {
            engine = { power: 200, volume: 3500 };
        }
        return engine;
    }

    function getWheels(size){
        if(size%2==0){
             size-=1;
        }
        return [size,size,size,size];
    }


    return {
        model,
        engine: getEngine(power),
        carriage: {
            type: carriage,
            color: color
        },
        wheels : getWheels(wheelsize)

    }
}

    console.log(factory({
        model: 'Opel Vectra',
        power: 121,
        color: 'grey',
        carriage: 'coupe',
        wheelsize: 16
    }));

