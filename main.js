// Toggle the dark mode and light mode
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
let lightmode = true;
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
async function getRepos(mode="repos", page="") {
    if (mode == "repos") {
        let response = await fetch("https://api.github.com/users/Yoinnkkk/repos");
        let data = await response.json();
        return data;
    } else if (mode == "pagecheck") {
        let response = await fetch(`https://yoinnkkk.github.io/${page}`, { method: 'head'});
        return response.ok;
    }
}

class Card {
    constructor(name="Name", description="Description", start=new Date()) {
        this.name = name;
        this.description = description;
        this.start = start
        this.cardCreator(); 
        
    }
    cardCreator() {
        // Make the card
        this.card = document.createElement("div");
        this.card.classList.add("card");
        document.getElementById("cardwrapper").appendChild(this.card);
        // Making the image
        this.image = document.createElement("img");
        this.image.classList.add("image");
        this.image.src = `screenshots/${this.name}.png`;
        this.image.alt = this.name;
        this.card.appendChild(this.image);
        // Making the description paragraph
        this.descriptionp = document.createElement("p");
        this.descriptionp.textContent = this.description;
        this.descriptionp.classList.add("description");
        this.card.appendChild(this.descriptionp);
        // Making the start date text
        this.date = document.createElement("p");
        this.date.textContent = `Project started on ${this.start}`;
        this.date.classList.add("date");
        this.card.appendChild(this.date);
    }
}

function listAllRepos() {
    getRepos().then(function(response) {
        for (let i=0; i < response.length; i++) {
            let card = new Card(response[i].name, response[i].description, response[i].created_at.split("T")[0]);
            card.card.addEventListener('click', function (){
                getRepos("pagecheck", response[i].name).then(function(eventreturn) {
                    if (eventreturn == false  || response[i].name == "Yoinnkkk.github.io") {
                        location.href = `https://www.github.com/Yoinnkkk/${response[i].name}`;
                    } else {
                        location.href = `https://Yoinnkkk.github.io/${response[i].name}`;
                    }
                    
                })
            })

        }
        cardwrapper = document.getElementById("cardwrapper");
        cardwrapper.style.setProperty("--rows", Math.ceil(response.length / 6));
        cardwrapper.style.setProperty("--columns", Math.floor(window.innerWidth / 320));
        window.onresize = function() {
            cardwrapper.style.setProperty("--columns", Math.floor(window.innerWidth / 320))
        }
    })
}


window.addEventListener('load', function() {
    listAllRepos();
})