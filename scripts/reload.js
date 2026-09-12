// function to open modal by id
function showModal(itemId) {
    document.getElementById(itemId).classList.add("is-open");
    if (itemId === "item1") {
        loadReadme();
    }
    if (itemId === "item3") {
        loadProjects();
    }
}

// function to close modal by id
function closeModal(itemId) {
    document.getElementById(itemId).classList.remove("is-open");
}

// live GitHub profile README, loaded once the PROFILE modal is first opened
var readmeRequested = false;

function loadReadme() {
    if (readmeRequested) return;
    readmeRequested = true;

    var container = document.getElementById("readme-content");
    var status = document.getElementById("readme-status");

    fetch("https://api.github.com/repos/pbarden/pbarden/readme", {
        headers: { Accept: "application/vnd.github.html+json" }
    })
        .then(function (res) {
            if (!res.ok) throw new Error("GitHub API responded with " + res.status);
            return res.text();
        })
        .then(function (html) {
            container.innerHTML = html;
        })
        .catch(function () {
            readmeRequested = false;
            status.innerHTML = "Couldn't load the live profile README right now &mdash; <a href=\"https://github.com/pbarden/pbarden\" target=\"_blank\" rel=\"noopener\">read it directly on GitHub</a>.";
        });
}

// live GitHub project feed, loaded once the PROJECTS modal is first opened
var projectsRequested = false;

function loadProjects() {
    if (projectsRequested) return;
    projectsRequested = true;

    var grid = document.getElementById("projects-grid");
    var status = document.getElementById("projects-status");

    fetch("https://api.github.com/users/pbarden/repos?per_page=100&sort=pushed")
        .then(function (res) {
            if (!res.ok) throw new Error("GitHub API responded with " + res.status);
            return res.json();
        })
        .then(function (repos) {
            var featured = repos
                .filter(function (r) { return !r.fork; });
            if (!featured.length) throw new Error("No repos returned");
            status.remove();
            featured.forEach(function (repo) {
                grid.appendChild(buildProjectCard(repo));
            });
        })
        .catch(function () {
            projectsRequested = false;
            status.innerHTML = "Couldn't load live repo data right now &mdash; <a href=\"https://github.com/pbarden\" target=\"_blank\" rel=\"noopener\">browse them directly on GitHub</a>.";
        });
}

function buildProjectCard(repo) {
    var card = document.createElement("a");
    card.className = "project-card";
    card.href = repo.html_url;
    card.target = "_blank";
    card.rel = "noopener";

    var thumb = document.createElement("img");
    thumb.className = "project-thumb";
    thumb.loading = "lazy";
    thumb.alt = repo.name;
    thumb.src = "https://opengraph.githubassets.com/1/" + repo.full_name;
    thumb.onerror = function () { thumb.style.display = "none"; };
    card.appendChild(thumb);

    var meta = document.createElement("div");
    meta.className = "project-meta";

    var name = document.createElement("span");
    name.className = "project-name";
    name.textContent = repo.name;
    meta.appendChild(name);

    if (repo.language) {
        var lang = document.createElement("span");
        lang.className = "project-lang";
        lang.textContent = repo.language;
        meta.appendChild(lang);
    }

    card.appendChild(meta);
    return card;
}
