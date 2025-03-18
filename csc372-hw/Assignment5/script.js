let GITHUB_TOKEN = localStorage.getItem("github_token");
if (!GITHUB_TOKEN) {
    GITHUB_TOKEN = prompt("Enter your GitHub Token:");
    if (GITHUB_TOKEN) {
        localStorage.setItem("github_token", GITHUB_TOKEN);
    }
}

async function fetchRepos() {
    if (!GITHUB_TOKEN) {
        alert("GitHub token is required!");
        return;
    }
    
    const username = document.getElementById('username').value || 'romei23'; // Default to romei23
    const repoList = document.getElementById('repo-list');
    repoList.innerHTML = '<p>Loading...</p>';
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=20`, {
            headers: { "Authorization": `token ${GITHUB_TOKEN}` }
        });

        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
        }

        const repos = await response.json();
        if (!Array.isArray(repos) || repos.length === 0) {
            throw new Error('No repositories found for this user.');
        }

        repoList.innerHTML = '';
        
        repos.forEach(async repo => {
            const repoDiv = document.createElement('div');
            repoDiv.classList.add('repo');
            repoDiv.innerHTML = `
                <h3><i class='fab fa-github'></i> <a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description available'}</p>
                <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
                <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
                <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
                <p><strong>Languages:</strong> Loading...</p>
                <p><strong>Commits:</strong> Fetching...</p>
            `;
            repoList.appendChild(repoDiv);
            
            // Fetch languages
            try {
                const langResponse = await fetch(repo.languages_url, {
                    headers: { "Authorization": `token ${GITHUB_TOKEN}` }
                });
                const langs = await langResponse.json();
                repoDiv.querySelector("p:nth-child(6)").innerHTML = `<strong>Languages:</strong> ${Object.keys(langs).join(", ") || 'Unknown'}`;
            } catch (langError) {
                repoDiv.querySelector("p:nth-child(6)").innerHTML = '<strong>Languages:</strong> Failed to load';
            }

            // Fetch commit count
            try {
                const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`, {
                    headers: { "Authorization": `token ${GITHUB_TOKEN}` }
                });
                const commits = await commitsResponse.json();
                repoDiv.querySelector("p:nth-child(7)").innerHTML = `<strong>Commits:</strong> ${Array.isArray(commits) ? commits.length : 'Unknown'}`;
            } catch (commitError) {
                repoDiv.querySelector("p:nth-child(7)").innerHTML = '<strong>Commits:</strong> Failed to load';
            }
        });
    } catch (error) {
        repoList.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}