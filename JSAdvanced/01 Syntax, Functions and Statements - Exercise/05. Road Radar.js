function radar(speed, location) {
    let output;
    switch (location) {
        case "city":
            if (speed <= 50) {
                output = inZone(speed, 50);
            } else {
                output = overLimit(speed, 50);
            }
            break;
        case "residential":
            if (speed <= 20) {
                output = inZone(speed, 20);
            } else {
                output = overLimit(speed, 20);
            }
            break;
        case "interstate":
            if (speed <= 90) {
                output = inZone(speed, 90);
            } else {
                output = overLimit(speed, 90);
            }
            break;
        case "motorway":
            if (speed <= 130) {
                output = inZone(speed, 130);
            } else {
                output = overLimit(speed, 130);
            }
            break;

            function inZone(speed, limit) {
                return `Driving ${speed} km/h in a ${limit} zone`;
            }


            function overLimit(speed, limit) {
                let dif = speed - limit;
                let status;
                if (dif <= 20) {
                    status = 'speeding';
                } else if (dif <= 40) {
                    status = 'excessive speeding';
                } else {
                    status = 'reckless driving';
                }
                return `The speed is ${dif} km/h faster than the allowed speed of ${limit} - ${status}`;
            }
    }
    console.log(output);
}
radar(40, 'city');
radar(21, 'residential');
radar(120, 'interstate');

