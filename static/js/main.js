function toggleTheme() {
    let theme = document.getElementsByTagName('link')[2]

    if (theme.getAttribute('href') == 'static/css/mint.css')
        theme.setAttribute('href', 'static/css/pink.css')
    else
        theme.setAttribute('href', 'static/css/mint.css')
}

addEventListener('DOMContentLoaded', (event) => {
    let box = document.getElementById('projectbox');
    let json = fetch("../../projects.json").then(response => response.json());
    for (let project in json) {
        box.innerHTML += `
        <div class="projectitem">
            <div class="item-info">
                <h3>${json[project].name}</h3>
                <p>${json[project].description}</p>
            </div>
            <div class="item-link">
                ${getImages(json[project].software_used)}
                <a class="btn btn-primary" href="${json[project].link}" role="button">Repo Link</a>
            </div>
        </div>
        `
    }
})

function getImages(array) {
    let imageString = "";
    for (let name in array) {
        let temp = new File(`../svg/${name}.svg`);
        if (temp.exists()) {
            imageString += `<a href=""><img class="invert" src="static/svg/${name}.svg" alt="${name} Logo"/></a>`
        }
        else {
            imageString += `<img class="invert" src="static/svg/unknown.svg" alt="Question Mark"/>`
        }
    }
    return imageString;
}
