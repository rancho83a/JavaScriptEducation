function attachEvents() {
    const btn = document.getElementById('submit');
    btn.addEventListener('click', getWeather)
}

attachEvents();

async function getWeather() {
    try {
        const location = document.getElementById('location')
        const city = location.value;
        const code = await getCodeLocation(city);
        //location.value = '';

        let [today, upcoming] = await Promise.all([
            getToday(code),
            getUpcoming(code)
        ]);
        createCurrentDOM(today);
        createUpcomingDOM(upcoming);

        console.log(today);
        console.log(upcoming);
    }
    catch (err) {
        document.getElementById('forecast').style.display = 'block';
        document.getElementById('current').innerHTML = '<div class="label">Error</div>';
        const div = document.getElementById('upcoming').innerHTML="";


        console.log('ERRRRROR');
    }
}

function createCurrentDOM(today) {
    document.getElementById('forecast').style.display = 'block';

    const div = document.getElementById('current');
    div.innerHTML = '<div class="label">Current conditions</div>';
    let card = e('div', { className: 'forecasts' },
        e('span', { className: 'condition symbol', innerHTML: getSymbol(today.forecast.condition) }),
        e('span', { className: 'condition' },
            e('span', { className: 'forecast-data' }, today.name),
            e('span', { className: 'forecast-data' }, `${today.forecast.low}°/${today.forecast.high}°`),
            e('span', { className: 'forecast-data' }, today.forecast.condition),
        )
    );

    div.appendChild(card);
}

function createUpcomingDOM(upcoming) {
    const div = document.getElementById('upcoming');
    div.innerHTML = '<div class="label">Three-day forecast</div>';
    let card = e('div', { className: 'forecast-info' });
    upcoming.forecast.map(createSpanUpcoming).forEach(s=> card.appendChild(s));
    div.appendChild(card);
}

function createSpanUpcoming(day) {
    let span = e('span', { className: 'upcoming' },
        e('span', { className: 'symbol', innerHTML: getSymbol(day.condition) }),
        e('span', { className: 'forecast-data' },`${day.low}°/${day.high}°`),
        e('span', { className: 'forecast-data' },day.condition)
    );
    return span;
}

function getSymbol(text) {
    const symbol = {
        Rain: "☂",
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Degrees: '°'
    }
    return symbol[text];
}

async function getCodeLocation(city) {
    const urlLocation = 'http://localhost:3030/jsonstore/forecaster/locations';
    const responceLocation = await fetch(urlLocation);
    const info = await responceLocation.json();
    return info.find(l => l.name.toLowerCase() == city.toLowerCase()).code;

}

async function getToday(code) {
    const todayURL = 'http://localhost:3030/jsonstore/forecaster/today/';
    const responceToday = await fetch(todayURL + code);
    return await responceToday.json();

}

async function getUpcoming(code) {
    const days3URL = 'http://localhost:3030/jsonstore/forecaster/upcoming/'
    const days3Responce = await fetch(days3URL + code);
    return await days3Responce.json();

}

function e(type, attributes, ...params) {
    let element = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            element.addEventListener(attr.substring(2).toLocaleLowerCase(), value)
        } else {
            element[attr] = value;
        }
    }

    params = params.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    params.forEach(p => {
        if (typeof p == 'string') {
            let content = document.createTextNode(p);
            element.appendChild(content);
        }
        else {
            element.appendChild(p);
        }
    })
    return element;
}