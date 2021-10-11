async function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;

    const url = `https://api.github.com/repos/${username}/${repo}/commits`
    const ul = document.getElementById('commits');
    ul.innerHTML = '';

    try {

        const responce = await fetch(url);
          if (responce.status==404) {
             throw new Error(`Error: ${responce.status} (${responce.statusText})`);
         }

        const data = await responce.json();

        data.forEach(c => {
            let li = document.createElement('li');
            li.textContent = `${c.commit.author.name}: ${c.commit.message}`;
            ul.appendChild(li);
        });
    }

    catch (err) {
       
        let li = document.createElement('li');
        li.textContent = err.message;
        ul.appendChild(li);

    }
}
