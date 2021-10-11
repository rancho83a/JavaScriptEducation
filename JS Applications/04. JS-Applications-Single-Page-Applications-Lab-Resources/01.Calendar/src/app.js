const years = [...document.querySelectorAll('.monthCalendar')].reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
}, {});

console.log(years);

const months = [...document.querySelectorAll('.daysCalendar')].reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
}, {});
console.log(months);

const section = document.getElementById('years');
const body = document.querySelector('body');
displaySection(section);

const yearSelect = document.getElementById('years');
yearSelect.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('day') || ev.target.classList.contains('date')) {
        ev.stopImmediatePropagation();
        let yearId = `year-${ev.target.textContent.trim()}`;
        displaySection(years[yearId]);
    }
});

body.addEventListener('click', (ev) => {
    if (ev.target.tagName == 'CAPTION') {
        let sectionId = ev.target.parentNode.parentNode.id;
        if (sectionId.includes('year-')) {
            displaySection(yearSelect);
        } else if(sectionId.includes('month')){
            const id =sectionId.split('-')[1];
            displaySection(years[`year-${id}`]);
        }
    } else if (ev.target.tagName == 'TD' || ev.target.tagName == 'DIV') {
        const monthName = ev.target.textContent.trim();
        if (monthEnum.hasOwnProperty(monthName)) {
            let parent = ev.target.parentNode;
            while (parent.tagName != 'TABLE') {
                parent = parent.parentNode;
            }
            const year = parent.firstElementChild.textContent;
            const toDisplay = months[`month-${year}-${monthEnum[monthName]}`]
            displaySection(toDisplay);
        }
    }
});

function displaySection(section) {
    body.innerHTML = "";
    body.appendChild(section);

}

const monthEnum = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
}