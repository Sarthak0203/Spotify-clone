console.log('Welcome to spotify');

//initialize the variables
let songindex=0;
let audioelement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let progressbar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songitem = Array.from(document.getElementsByClassName('songitem'));
let songitemplay = document.getElementsByClassName('songitemplay');


let songs = [
    {songname:"Manali Trance", filePath: "songs/1.mp3", coverpath: "covers/1.jpg"},
    {songname:"Tum Hi Ho", filePath: "songs/2.mp3", coverpath: "covers/2.jpg"},
    {songname:"Splender", filePath: "songs/3.mp3", coverpath: "covers/3.jpg"},
    {songname:"Husn", filePath: "songs/4.mp3", coverpath: "covers/4.jpg"},
    {songname:"Alag Asman", filePath: "songs/5.mp3", coverpath: "covers/5.jpg"},
    {songname:"Baarishein", filePath: "songs/6.mp3", coverpath: "covers/6.jpg"},
]

songitem.forEach((element, i)=> {
    element.getElementsByClassName("coverimg")[0].src= songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
});

//handle pause/play click
masterplay.addEventListener('click', ()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity = 1;
        document.getElementById(songindex).classList.remove('fa-play');
        document.getElementById(songindex).classList.add('fa-pause');
    }
    else{
        audioelement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        gif.style.opacity = 0;
        document.getElementById(songindex).classList.remove('fa-pause');
        document.getElementById(songindex).classList.add('fa-play');
    }  
})


//Listen to events
audioelement.addEventListener('timeupdate', ()=>{
    //update seekbar
    let progress = parseInt((audioelement.currentTime/audioelement.duration)*100);
    progressbar.value = progress;
})

progressbar.addEventListener('change', () =>{
    audioelement.currentTime = progressbar.value * audioelement.duration/100 ;
})

const makeallpause = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}




Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e) => {
        if (audioelement.paused || audioelement.currentTime <= 0 || songindex !== parseInt(e.target.id)) {
            makeallpause();
            let newSongIndex = parseInt(e.target.id);
            if (newSongIndex !== songindex) {
                songindex = newSongIndex;
                audioelement.src = `songs/${songindex+1}.mp3`;
            }
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            mastersongname.innerText=songs[songindex].songname;
            audioelement.play();
            gif.style.opacity = 1;
            masterplay.classList.remove('fa-play')
            masterplay.classList.add('fa-pause')
        } else {
            audioelement.pause();
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            gif.style.opacity = 0;
            masterplay.classList.remove('fa-pause')
            masterplay.classList.add('fa-play')
        }
    })
})

document.getElementById('next').addEventListener('click', ()=> {
    if(!audioelement.paused){
        audioelement.pause();
    }
    if(songindex >= 5){
        songindex = 0;
    }
    else{
        songindex += 1;
    }
    // Update the song item's play/pause icon
    makeallpause();
    document.getElementById(songindex).classList.remove('fa-play');
    document.getElementById(songindex).classList.add('fa-pause');

    // Update the master song name and play the next song
    mastersongname.innerText = songs[songindex].songname;
    audioelement.src = songs[songindex].filePath;
    audioelement.play();
});



document.getElementById('previous').addEventListener('click', ()=> {
    if(songindex<=0){
        songindex=0;
    }
    else{
        songindex -=1;
    }
    audioelement.src = `songs/${songindex+1}.mp3`
    mastersongname.innerText=songs[songindex].songname;
    audioelement.currentTime = 0;
    audioelement.play();
    gif.style.opacity = 1;
    masterplay.classList.remove('fa-play')
    masterplay.classList.add('fa-pause')

    // Update the song item's play/pause icon
    makeallpause();
    document.getElementById(songindex).classList.remove('fa-play');
    document.getElementById(songindex).classList.add('fa-pause');
})


audioelement.addEventListener('ended', ()=> {
    if(songindex >= 5){
        songindex = 0;
    }
    else{
        songindex += 1;
    }
    // Update the song item's play/pause icon
    makeallpause();
    document.getElementById(songindex).classList.remove('fa-play');
    document.getElementById(songindex).classList.add('fa-pause');

    // Update the master song name and play the next song
    mastersongname.innerText = songs[songindex].songname;
    audioelement.src = songs[songindex].filePath;
    audioelement.play();
});


audioelement.addEventListener('timeupdate', () => {
    // Current time in minutes and seconds
    let currentMinutes = Math.floor(audioelement.currentTime / 60);
    let currentSeconds = Math.floor(audioelement.currentTime - currentMinutes * 60);

    // Duration in minutes and seconds
    let durationMinutes = Math.floor(audioelement.duration / 60);
    let durationSeconds = Math.floor(audioelement.duration - durationMinutes * 60);

    // Ensure time values are two digits
    currentMinutes = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes;
    currentSeconds = currentSeconds < 10 ? '0' + currentSeconds : currentSeconds;
    durationMinutes = durationMinutes < 10 ? '0' + durationMinutes : durationMinutes;
    durationSeconds = durationSeconds < 10 ? '0' + durationSeconds : durationSeconds;

    // Update the time display
    document.getElementById('currentTime').innerText = currentMinutes + ':' + currentSeconds;
    document.getElementById('totalDuration').innerText = durationMinutes + ':' + durationSeconds;
});

