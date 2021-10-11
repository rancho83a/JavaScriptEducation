async function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    try {
        const responce = await fetch(url);
        const data = await responce.json();

        createProfiles(data);
        controlButtons();
    }
    catch (err) {
        const main = document.getElementById('main');
        main.innerHTML = "Something Went Wrong!";
    }
}

function controlButtons() {
    document.getElementById('container').addEventListener('click', onclick);
    function onclick(ev) {
        let btn = ev.target;
        if (btn.tagName !== 'BUTTON' || btn.parentNode.querySelector('input').checked) {
            return
        }
        const info = btn.parentNode.querySelector('div');
        info.style.display = info.style.display === 'block' ? 'none' : 'block';
        btn.textContent = btn.textContent === 'Show more' ? 'Hide it' : 'Show more';
    }
}

function createProfiles(data) {
    const main = document.getElementById('main');
    main.innerHTML = "";

    Object.values(data).forEach((info) => {
        main.innerHTML = main.innerHTML +
            `<div class="profile">
        <img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name='${info._id}' value="lock" checked>
        <label>Unlock</label>
        <input type="radio" name='${info._id}' value="unlock"><br>
        <hr>
        <label>${info.username}</label>
        <input type="text" name="${info.username}" value="" disabled readonly />
        <div id="user1HiddenFields">
            <hr>
            <label>Email:</label>
            <input type="email" name='${info.email}' value=${info.email} disabled readonly />
            <label>Age:</label>
            <input type="email" name='${info.age}' value=${info.age} disabled readonly />
        </div>
        <button>Show more</button>
    </div>`;
    });
}
