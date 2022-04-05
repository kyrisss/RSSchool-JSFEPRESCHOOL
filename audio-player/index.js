const music = ["beyonce", "dontstartnow"];
const songArtists = ["Beyonce", "Dua Lipa"];
const songTitles = ["Don't Hurt Yourself","Don't Start Now"]
let playNum = 0;

const audio = document.querySelector(".audio");
const playBtn = document.querySelector(".play");
const duration = document.querySelector(".duration");
const currentTime = document.querySelector(".current-time");
const progress = document.querySelector(".progress");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const background = document.querySelector(".background");
const cover = document.querySelector(".cover");
const songArtist = document.querySelector(".song-artist");
const songTitle = document.querySelector(".song-title");

function playAudio(){
    if(audio.paused){
        audio.play();
        playBtn.src = "./assets/svg/pause.png";
        cover.classList.add("scale");
    } else {
        audio.pause();
        playBtn.src = "./assets/svg/play.png";
        cover.classList.remove("scale");
    }
}

function setDuration(){
    let min = String(Math.floor(audio.duration / 60));
    let sec = String(Math.floor(audio.duration - Number(min) * 60));
    duration.textContent = `${min.padStart(2,0)}:${sec.padStart(2,0)}`;
}

function changeTime(){
    let min = String(Math.floor(this.currentTime/60));
    let sec = String(Math.floor(this.currentTime - Number(min) * 60));
    currentTime.textContent = `${min.padStart(2,0)}:${sec.padStart(2,0)}`;
}

function progressUpdate(){
    progress.value = this.currentTime * 100 / this.duration;
}

function changeTimeAudio(){
    audio.currentTime = audio.duration * this.value / 100;
}

function playNext(){
    playNum++;
    if(playNum >= music.length){
        playNum = 0;
    }
    audio.src = `./assets/audio/${music[playNum]}.mp3`;
    background.src = `./assets/img/${music[playNum]}.png`;
    cover.src = `./assets/img/${music[playNum]}.png`;
    songArtist.textContent = songArtists[playNum];
    songTitle.textContent = songTitles[playNum];
    playAudio();
}

function playPrev(){
    playNum--;
    if(playNum < 0){
        playNum = music.length - 1;
    }
    audio.src = `./assets/audio/${music[playNum]}.mp3`;
    background.src = `./assets/img/${music[playNum]}.png`;
    cover.src = `./assets/img/${music[playNum]}.png`;
    songArtist.textContent = songArtists[playNum];
    songTitle.textContent = songTitles[playNum];
    playAudio();
}


playBtn.addEventListener("click", playAudio);
audio.addEventListener("timeupdate", changeTime);
audio.addEventListener("timeupdate", progressUpdate);
audio.addEventListener("timeupdate", setDuration);
progress.addEventListener("click", changeTimeAudio);
nextBtn.addEventListener("click", playNext);
prevBtn.addEventListener("click", playPrev);