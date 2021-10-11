function attachEvents() {
    const btnViewPost = document.getElementById('btnViewPost');
    const postsBtn = document.getElementById('btnLoadPosts');
    postsBtn.addEventListener('click', getPosts);
    btnViewPost.addEventListener('click', getSelectedPost);
    btnViewPost.disabled=true;
}
attachEvents();

async function getPosts() {
    const postsURL = 'http://localhost:3030/jsonstore/blog/posts';
    const select = document.getElementById('posts');
    select.innerHTML='';

    const responce = await fetch(postsURL);
    dataPosts = await responce.json();


    Object.values(dataPosts).map(createOption).forEach(p => select.appendChild(p));
    document.getElementById('btnViewPost').disabled=false;
}

function createOption(p) {
    let option = document.createElement('option');
    option.value = p.id;
    option.textContent = p.title;
    return option
}

function getSelectedPost() {
    const idPost = document.getElementById('posts').value;
    getComments(idPost);
}

async function getComments(idPost) {
    const url = 'http://localhost:3030/jsonstore/blog/posts/' + idPost;
    const commentURL = 'http://localhost:3030/jsonstore/blog/comments/';

    const [responcePost, responceComment] = await Promise.all([
        fetch(url),
        fetch(commentURL)
    ]);

    let data = await responcePost.json();

    document.getElementById('post-title').textContent = data.title;
    document.getElementById('post-body').textContent = data.body;

    data = await responceComment.json();
    const ulComment = document.getElementById('post-comments');
    ulComment.innerHTML = '';

    Object.values(data)
        .filter(c => c.postId == idPost)
        .map(createComment)
        .forEach(c => ulComment.appendChild(c))
}

function createComment(c){
    let li = document.createElement('li');
    li.textContent = c.text;
    li.id= c.id;
    return li;
}
