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
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        lightmode = true
    }
    let spans = document.querySelectorAll("span");
    let i = 0;
    let j = 0;
    var interval = setInterval(() => {
        if (i >= spans.length - 1) {
            clearInterval(interval);
        }
        spans[i].style.fontSize = `4rem`;
        spans[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--font-colour');
        setTimeout(() => {
            spans[j].style.fontSize = `3rem`;
            j++
        }, 500)
        i++;
    },50)
}

// Word hover effect
let header = document.getElementById("header")
let chars = header.innerText.split("")
header.innerText = ""
chars.forEach((char) => {
    span = document.createElement("span")
    span.innerHTML = char
    span.onmouseover = (event) => {
        event.target.style.fontSize = `4rem`
        event.target.style.color = `#${Math.floor(Math.random()*16777215).toString(16)}`
    }
    span.onmouseleave = (event) => {
        setTimeout(() => {
            event.target.style.fontSize = `3rem`
            event.target.style.color = getComputedStyle(document.documentElement).getPropertyValue('--font-colour');
        }, 500)
    }
    header.appendChild(span)
})


