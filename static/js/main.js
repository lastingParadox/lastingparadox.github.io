function toggleTheme() {
    let theme = document.getElementsByTagName('link')[2]

    if (theme.getAttribute('href') == 'static/css/mint.css')
        theme.setAttribute('href', 'static/css/pink.css')
    else
        theme.setAttribute('href', 'static/css/mint.css')
}

addEventListener('DOMContentLoaded', async (event) => {
    let box = document.getElementById('projectbox');
    let response = await fetch("static/json/projects.json");
    let json = await response.json();
    for (let project of json.projects) {
        box.innerHTML += `
        <div class="projectitem">
            <div class="item-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            </div>
            <div class="item-source">
                <div class="item-img-box">
                    ${await getImages(project.software_used)}
                </div>
                <a class="btn btn-primary" href="${project.link}" role="button">Repo Link</a>
            </div>
        </div>
        `
    }
})

function getImages(array) {
    let imageString = "";
    for (let name of array) {
        imageString += `<a href=""><img class="${name}" src="static/svg/${name}.svg" alt="${name} Logo" onerror="imgError(this);"/></a>`
    }
    return imageString;
}

function imgError(that) {
    that.onerror = null;
    that.src = "static/svg/unknown.svg";
}
