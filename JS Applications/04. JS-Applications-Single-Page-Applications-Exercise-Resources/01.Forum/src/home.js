let main;
let section;
let container;

export function setupHome(targetMain, targetSection) {
    main = targetMain;
    section = targetSection;
    container = document.getElementById('topicSection');
    section.querySelector('#cancel').addEventListener('click', (ev) => {
        ev.preventDefault();
        section.querySelector('form').reset();
    });
    section.querySelector('#post').addEventListener('click', onSubmit);
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(section.querySelector('form'));
    const data = ([...formData.entries()].reduce((data, [k, v]) => (Object.assign(data, { [k]: v })), {}));

    if (data.topicName == '' || data.username == '' || data.postText == '') {
        return alert('All fileds required')
    }
    data.time = new Date().toISOString().slice(0, -5).replace('T',' ');
    try {
        const response = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const post = await response.json();
            postFirstComment(post._id,data)
            showHome();
        }
    } catch (err) {
        console.error(err.message);
        alert(err.message);
    }
    section.querySelector('form').reset();
}
export async function showHome() {
    main.innerHTML = "";
    main.appendChild(section);

    const data = await getPosts();
    const card = Object.values(data).map(createPostPreview);
    let fragment = document.createDocumentFragment();
    card.forEach(c => fragment.appendChild(c));
    container.innerHTML = '';
    container.appendChild(fragment);
}

async function getPosts() {
    const response = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts");
    const data = await response.json();
    return data;
}

function createPostPreview(post) {
    const element = document.createElement('div');

    element.innerHTML = `
    <div class="topic-container">
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <a id="${post._id}" href="#" class="normal">
                <h2 class="homePage">${post.topicName}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${post.time}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${post.username}</span></p>
                    </div>
                </div>
                <div class="subscribers">
                    <!-- <button class="subscribe">Subscribe</button> -->
                    <p>Subscribers: <span>0</span></p>
                </div>
            </div>
        </div>
    </div>
</div>    `
    return element;
}

async function postFirstComment(id, c){
    const comment = {
        username: c.username,
        postText: c.postText,
        date: c.time,
        postId: id
    };
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method:'post',
        headers:{
            'Content-Type': 'apllication/json'
        },
        body:JSON.stringify(comment)
    });
    if (response.ok) {
        return;
    }else{
        const error = response.json();
        alert (error.message);
    }
}