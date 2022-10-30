async function loadCommits() {

    let username = document.getElementById('username').value;
    let userRepo = document.getElementById('repo').value;
    let commits = document.getElementById('commits');

    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${userRepo}/commits`);

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const items = data.map(data => {
            const li = document.createElement('li');
            li.textContent = `${data.commit.author.name}: ${data.commit.message}`;

            return li;
        });

        commits.replaceChildren(...items);

    } catch (e) {
        commits.textContent = e.message;
    }
}
