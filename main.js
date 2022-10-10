// Toggle the dark mode and light mode
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
let lightmode = true
const togglebutton = document.getElementById("toggle");

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme != "light") {lightmode = false}
}

function toggle() {
    if (lightmode == true) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        lightmode = false
        return
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        lightmode = true
        return
    }
}

// Get list of github repositories
async function getRepos() {
    let response = await fetch("https://api.github.com/users/Yoinnkkk/repos");
    let data = await response.json();
    return data
}

class Block {
    constructor(name="Name", description="Description") {
        this.name = name;
        this.description = description;
        this.infowrapper = document.createElement("div");
        this.infowrapper.classList.add("block");
        document.getElementById("blockwrapper").appendChild(this.infowrapper);
        // Making the image
        this.image = document.createElement("img");
        this.image.classList.add("image");
        this.image.src = "";
        this.image.alt = this.name;
        this.infowrapper.appendChild(this.image);
        // Making the description paragraph
        this.descriptionp = document.createElement("p");
        this.descriptionp.textContent = this.description;
        this.descriptionp.classList.add("description");
        this.infowrapper.appendChild(this.descriptionp);
    }
}

function listAllRepos() {
    //let repolist = getRepos()
    let repolist = 40
    document.getElementById("blockwrapper").style.setProperty("--rows", Math.ceil(repolist / 6))
    for (let i=0; i < repolist; i++) {
        console.log("made")
        let block = new Block()
    }
}
window.addEventListener('load', function() {
    listAllRepos();
})