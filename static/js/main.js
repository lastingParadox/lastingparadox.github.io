function toggleTheme() {
    let theme = document.getElementsByTagName('link')[2]

    if (theme.getAttribute('href') == 'static/css/mint.css')
        theme.setAttribute('href', 'static/css/pink.css')
    else
        theme.setAttribute('href', 'static/css/mint.css')
}

addEventListener('DOMContentLoaded', async (event) => {
    console.log(event);
    let box = document.getElementById('projectbox');
    console.log(box);
    let response = await fetch("static/json/projects.json");
    let json = await response.json(); 
    console.log(json)
    for (let project of json.projects) {
        console.log(project);
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

async function getImages(array) {
    let imageString = "";
    for (let name of array) {
        await fetch(`static/svg/${name}.svg`, { method: "HEAD" })
            .then(response => {
                if (response.ok) {
                    imageString += `<a href=""><img class="${name}" src="static/svg/${name}.svg" alt="${name} Logo"/></a>`
                }
                else {
                    imageString += `<img class="invert" src="static/svg/unknown.svg" alt="Question Mark"/>`
                }
            })
        .catch(error => {
            console.log(error);
        });
    }
    return imageString;
}
