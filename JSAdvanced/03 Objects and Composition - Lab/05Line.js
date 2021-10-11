function createAssemblyLine() {
    const library = {
        hasClima: function (car) {

            car.temp = 21;
            car.tempSettings = 21;
            car.adjustTemp = () => {
                if (car.temp > car.tempSettings) {
                    return car.temp--;
                } else if (car.temp < car.tempSettings) {
                    return car.temp++;
                }
            }
        },

        hasAudio: function (car){    
            car.currentTrack={};      
            car.nowPlaying = () => {
                if(car.currentTrack.name){
                    console.log(`Now playing ${car.currentTrack.name} by ${car.currentTrack.artist}`);
                }
            }
        },

        hasParktronic: function (car){
            car.checkDistance  = (distance) => {
                let out ='';
                if(distance<0.1){
                    out=  "Beep! Beep! Beep!";
                } else if(distance<0.25){
                    out = "Beep! Beep!";
                } else if(distance<0.5){
                    out = "Beep!"
                }
            return console.log(out);
            }
        }

    }
    return library;
}

const assemblyLine = createAssemblyLine();

const myCar = {
    make: 'Toyota',
    model: 'Avensis'
};


assemblyLine.hasParktronic(myCar);
myCar.checkDistance(0.4);
myCar.checkDistance(0.2);

assemblyLine.hasAudio(myCar);
myCar.currentTrack = {
    name: 'Never Gonna Give You Up',
    artist: 'Rick Astley'
};
myCar.nowPlaying();


assemblyLine.hasClima(myCar);
console.log(myCar.temp);
myCar.tempSettings = 21;
myCar.adjustTemp();
console.log(myCar.temp);