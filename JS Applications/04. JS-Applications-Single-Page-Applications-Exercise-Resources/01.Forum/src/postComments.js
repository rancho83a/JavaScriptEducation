let main;
let section;
let container;

export function setupPostComments(targetMain, targetSection) {
    main = targetMain;
    section = targetSection;
    container = container = document.getElementById('topicContent');
}


function createTitleSection(post) {
    const div = document.createElement('div');
    div.className = "topic-title";

    div.innerHTML = `
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <h2>${post.topicName}</h2>
                <p>Date: <time>${post.time}</time></p>
            </div>
            <div class="subscribers">
                <p>Subscribers: <span>0</span></p>
                <!-- <button class="subscribe">Subscribe</button>
                <button class="unsubscribe">Unsubscribe</button> -->
            </div>
        </div>`;
    return div;

}

const answer = `<div class="answer-comment">
<p><span>currentUser</span> comment:</p>
<div class="answer">
    <form id="postComment">
        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
        <div>
            <label for="username">Username <span class="red">*</span></label>
            <input type="text" name="username" id="username">
        </div>
        <button id="postBtn">Post</button>
    </form>
</div>
</div>`;

export async function showPostComments(id) {
    main.innerHTML = "";
    main.appendChild(section);

    const post = await getPostById(id);
    container.innerHTML = "";
    container.appendChild(createTitleSection(post));

    const comments = await getAllComments();

    const previewComments = Object.values(comments).filter(c => c.postId == id);

    const card = previewComments.map(createCommentPreview);
    let fragment = document.createDocumentFragment();
    card.forEach(c => fragment.appendChild(c));
    container.appendChild(fragment);
    container.innerHTML += answer;
    section.querySelector('#postComment').addEventListener('submit', (ev) => postComment(ev, id));

}

async function postComment(ev, id) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const username = formData.get('username');
    const postText = formData.get("postText");
    if (!username || !postText) {
        return alert('All fields are required')
    }
    const time = new Date().toISOString().slice(0, -5).replace('T', ' ');
    const comment = {
        username: username,
        postText: postText,
        date: time,
        postId: id
    };
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: 'post',
            headers: {
                'Content-Type': 'apllication/json'
            },
            body: JSON.stringify(comment)
        });
        if (response.ok) {
            showPostComments(id);
            ev.target.reset();
        }
    } catch (err) {
        console.error(err.message);
        alert(err.message);
    }

    console.log('click post');
}
function createCommentPreview(comment) {

    const div = document.createElement('div');
    div.className = "comment"
    div.innerHTML = `    <header class="header">
        <p><span>${comment.username}</span> posted on <time>${comment.date}</time></p>
    </header>
    <div class="comment-main">
        <div class="userdetails">
            <img src="./static/profile.png" alt="avatar">
        </div>
        <div class="post-content">
            <p>${comment.postText}</p>
       
        </div>
    </div>
    <div class="footer">
        <p><span>0</span> likes</p>
    </div>`

    return div;

}

async function getAllComments() {

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
    const comments = await response.json();
    return comments;
}

async function getPostById(id) {

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + id);
    const post = await response.json();
    return post;
}