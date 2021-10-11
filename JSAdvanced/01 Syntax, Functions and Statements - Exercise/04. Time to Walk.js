function timeTowalk(steps, length, speed) {

    let distance = steps * length; //in meters
    let = speedm = speed / 3.6 //in m/s
    let totalTimeRest = Math.floor(distance / 500) * 60;
    let time = (distance / speedm) + totalTimeRest;
    time = Math.ceil(time);

    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60);
    let seconds = time % 60
    //console.log(`${hours < 10 ? 0:''}${hours}:${minutes < 10 ? 0:''}${minutes}:${seconds < 10 ? 0:''}${seconds}`);
    console.log(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);

    function pad(num) {
        return ('0' + num).slice(-2);
    }
}


timeTowalk(4000, 0.60, 5)
timeTowalk(2564, 0.70, 5.5)