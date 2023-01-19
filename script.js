console.log("welcome to spotify");
//Initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Chidiya", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Zara-sa", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Come&get-it", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    { songName: "Dev", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Maiya-mainu", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    { songName: "Slow-down", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Tu-Mileya", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Emptiness", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
];

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
// audioElement.play();

// Handle play/pause click
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //update seeker
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime =
        (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(
        (element) => {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element)=>{
        element.addEventListener("click", (e)=>{
            // console.log(e.target);
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
        });
    }
);

document.getElementById('next').addEventListener("click", () => {
    if (songIndex>=9) {
        songIndex = 0
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', ()=>{
    if (songIndex<=0){
        songIndex = 0
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
});