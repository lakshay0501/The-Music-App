console.log('Hello World')

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let gif = document.getElementById('gif')
let myProgressBar = document.getElementById('myProgressBar')
let songItems = Array.from(document.getElementsByClassName('songItem'))
let songItemPlay = document.getElementsByClassName('songItemPlay')
let masterSongName = document.getElementById('masterSongName')
let songListPlay = document.getElementById('songListPlay')
let songs = [
    { songName: "Let me Love you", filePath: "songs/11.mp3", coverPath: "covers/1.jpg" },
    { songName: "Apna Banale", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Tu aake dekhle", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Tu jane na", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Hawayein", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Kesariya", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "positions", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "tere sang yaara", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

masterPlay.addEventListener('click', function (e) {  
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        gif.style.opacity = 1
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
    }
    else{
        audioElement.pause()
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
    }
});

audioElement.addEventListener('timeupdate', () => {
//    console.log('timeupdate'); 
   // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}

Array.from(songItemPlay).forEach((element) => {
    element.addEventListener('click', (e) => {
       makeAllPlays();
       e.target.classList.remove('fa-play-circle')
       e.target.classList.add('fa-pause-circle'); 
    //    console.log(e.target.id)
       songIndex = parseInt(e.target.id);
       audioElement.src = `songs/${songIndex+1}.mp3`;
        
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle')
            masterPlay.classList.add('fa-pause-circle')
            gif.style.opacity = 1
    })
});

document.getElementById('next').addEventListener('click', () => {
    if(songIndex>=7){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity = 1
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle') 
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
});

document.getElementById('previous').addEventListener('click', () => {

     if(songIndex<=0){
        songIndex = 7;
     }
        else{
            songIndex -= 1;
        }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1
        makeAllPlays();
        document.getElementById(`${songIndex}`).classList.remove('fa-play-circle')
        document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
});

if(audioElement.currentTime===audioElement.duration){
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity = 1
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle')
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
}




