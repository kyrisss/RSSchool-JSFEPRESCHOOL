import i18nObj from "./translate.js"

let lang;
let theme; 

// local storage



function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
}
  
function getLocalStorage() {
    if(localStorage.getItem('lang')) {
        lang = localStorage.getItem('lang');
        const check = document.querySelector(`#${lang}`)
        check.checked = true;
        let translate = (lang)=> {
            const elements = document.querySelectorAll("[data-i18n]")
            elements.forEach( elem => {
            if(elem.placeholder){
                elem.placeholder = i18nObj[lang][elem.dataset.i18n];
            }
            elem.textContent = i18nObj[lang][elem.dataset.i18n];
            })
        }
        translate(lang);
    }
    if(localStorage.getItem('theme')) {
        theme = localStorage.getItem('theme');
        if(theme == "light"){
            lighter();
        }
    }
}
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

const burger = document.querySelector(".burger");
const nav_list = document.querySelector(".nav-list");
const menu = () =>{
        burger.classList.toggle("is-active");
        nav_list.classList.toggle("is-active");
        if(nav_list.classList.contains("nav-list-light-theme")){
            document.querySelectorAll(".line").forEach(line => line.classList.toggle("light-theme-burger"));
        }
    }
burger.addEventListener("click", menu)

const nav_link = document.querySelectorAll(".nav-link");
nav_link.forEach(item => item.addEventListener("click", menu));

// Portfolio

function preloadImages(){
    const seasons = ["winter","spring","summer","autumn"]
    seasons.forEach(season => {
        for(let i = 0; i < 6; i++){
            const img = new Image();
            img.src = `./assets/${season}/${i+1}.jpg`;
        }
    })
}
preloadImages();

const portfolioBtns = document.querySelector(".portfolio-buttons");
const portfolioImg = document.querySelectorAll(".gallery-pic");
const changeImg = (event) =>{
    if(event.target.classList.contains("black-button")){
        
        portfolioImg.forEach( (img, index) =>{
            img.src = `./assets/${event.target.dataset.season}/${index + 1}.jpg`
        })
    }
}
const changeActive = (event) =>{
    portfolioBtns.querySelectorAll(".black-button")
    .forEach( btn =>{
        btn.classList.remove("active");
    })
    if(event.target.classList.contains("black-button")){
        event.target.classList.add("active");
    }
}
portfolioBtns.addEventListener("click", changeImg);
portfolioBtns.addEventListener("click", changeActive);

// translate


function getTranslate(event){
    
    lang = event.target.value;
    const elements = document.querySelectorAll("[data-i18n]")
    elements.forEach( elem => {
        if(elem.placeholder){
            elem.placeholder = i18nObj[event.target.value][elem.dataset.i18n];
        }
        elem.textContent = i18nObj[event.target.value][elem.dataset.i18n];
    })
}

const language = document.querySelectorAll("input[name = radio]");
language.forEach(item =>{
    item.addEventListener("change", getTranslate);
})

// light theme

function lighter(){
    const sun = document.querySelector(".sun");
    const moon = document.querySelector(".moon");
    const sections = document.querySelectorAll(".section");
    const titles = document.querySelectorAll(".section-title");
    const blackButtons = document.querySelectorAll(".black-button")
    const body = document.querySelector(".body");
    sections.forEach(elem => {
        elem.classList.toggle("light-theme");
    })
    titles.forEach(elem => {
        elem.classList.toggle("section-title-light");
    })
    blackButtons.forEach(elem => {
        
        elem.classList.toggle("black-button-light");
    })
    body.classList.toggle("body-light");

    if(window.screen.availWidth <= 768){
        const nav = document.querySelector(".nav-list");
        nav.classList.toggle("nav-list-light-theme");   
    }
    if(body.classList.contains("body-light")){
        theme = "light";
        sun.classList.toggle("visible");
        moon.classList.toggle("visible");
        
    }
    else{
        theme = "dark";
        sun.classList.toggle("visible");
        moon.classList.toggle("visible");
        
    }
        
}

const sun = document.querySelector(".theme");
sun.addEventListener("click", lighter)


// Video


const poster = document.querySelector(".poster");
const videoBtn = document.querySelector(".video-player-button");
const video = document.querySelector(".viewer");
const playIcon = document.querySelector(".play-icon");
const volumeBtn = document.querySelector(".volume-icon");
const volume = document.querySelector(".volume-progress");
const progress = document.querySelector(".progress");

function playVideo(event){
    if(video.paused){
        video.play()
        video.volume = volume.value;
        videoBtn.classList.toggle("hidden")
        playIcon.classList.toggle("play")
        console.log(video.currentTime)
    } else{
        video.pause()
        videoBtn.classList.toggle("hidden")
        playIcon.classList.toggle("play")
    }
    poster.style.display = "none";
    
}

function volumeChange(){
    video.volume = this.value;
    if(this.value == 0){
        volumeBtn.classList.add("mute");
    }else{
        volumeBtn.classList.remove("mute");
    }
    volume.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%,
        rgb(189, 174, 130) ${this.value * 100}%, rgb(200, 200, 200) ${this.value * 100}%,
        rgb(200, 200, 200) 100%)`;
} 

function changeVolumeIcon(){
    volumeBtn.classList.toggle("mute");
    if(video.volume == 0){
        video.volume = volume.value;
    } else {
        video.volume = 0;
    }
    console.log(video.volume);
}

function changeProgress(){
    progress.value = this.currentTime * 100 / this.duration;
    progress.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%,
        rgb(189, 174, 130) ${progress.value}%, rgb(200, 200, 200) ${progress.value}%,
        rgb(200, 200, 200) 100%)`;
}
function changeTime(){
    video.currentTime = this.value * video.duration / 100;
}

video.addEventListener("click", playVideo);
video.addEventListener("timeupdate", changeProgress);
progress.addEventListener("change", changeTime);
//progress.addEventListener("mousemove", changeTime);

videoBtn.addEventListener("click", playVideo);
playIcon.addEventListener("click", playVideo);
volume.addEventListener("mousemove", volumeChange);
volumeBtn.addEventListener("click", changeVolumeIcon);
