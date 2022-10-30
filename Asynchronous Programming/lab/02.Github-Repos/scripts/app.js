async function loadRepos() {

    let username = document.getElementById('username').value;
    let repos = document.getElementById('repos');

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        repos.innerHTML = '';

        for (let repo of data) {
            repos.innerHTML += `<li><a href="${repo.html_url}">${repo.full_name}</a></li>`
        }

    } catch (e) {
        repos.innerHTML = `${e.message}`;
    }
}