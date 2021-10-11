function attachEventsListeners() {
    let days = document.getElementById('days');
     let hours = document.getElementById('hours');
     let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');

    document.getElementById('secondsBtn').addEventListener('click', () => {convert(Number(seconds.value))});
    document.getElementById('minutesBtn').addEventListener('click', () => {convert(Number(minutes.value)*60)});
    document.getElementById('hoursBtn').addEventListener('click', () => {convert(Number(hours.value)*60*60)});
    document.getElementById('daysBtn').addEventListener('click', () => {convert(Number(days.value)*24*60*60)});


    function convert(sec) {
         days.value= (sec/(24 *60*60));
         hours.value=sec/60/60;
         minutes.value=sec/60;
         seconds.value=sec;
         
    }
}