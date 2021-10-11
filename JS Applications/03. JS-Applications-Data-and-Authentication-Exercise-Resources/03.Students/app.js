function solution() {
    load();
    document.querySelector('form').addEventListener('submit', onsubmit)
}
solution();

async function onsubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('number');
    const grade = formData.get('grade');

    if (!firstName || !lastName || !grade || !facultyNumber) {
        alert('required all fields');
        throw new Error('required all fields')
    }

    if (isNaN(grade)) {
        alert('grade must be a digit only');
        throw new Error('grade must be a digit only')
    }

    if (!/^\d+$/.test(facultyNumber)) {
        alert('faculty Number must be a string of numbers');
        throw new Error('faculty Number must be a string of numbers')
    }

    await request('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, facultyNumber, grade })
    })
    ev.target.reset();
    load();
}

async function load(ev) {
    const students = await request('http://localhost:3030/jsonstore/collections/students');
    const renderedRow = Object.values(students).map(renderStudent).join('');
    document.querySelector('tbody').innerHTML=renderedRow;
}

function renderStudent(student){
    return `<tr>
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td> ${student.facultyNumber}</td>
    <td> ${student.grade}</td>
</tr>`
}

async function request(url, option) {
    const response = await fetch(url, option);
    if (!response.ok) {
        const err = await response.json();
        alert(err.message);
        throw new Error(err.message);
    }
    return await response.json();
}