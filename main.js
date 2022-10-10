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
