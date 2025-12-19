const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("song-title");
const progress = document.getElementById("progress");

const songs = [
  { name: "Song 1", file: "assets/music/song1.mp3" },
  { name: "Song 2", file: "assets/music/song2.mp3" },
  { name: "Song 3", file: "assets/music/song3.mp3" }
];

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(index) {
  title.textContent = songs[index].name;
  audio.src = songs[index].file;
}

loadSong(songIndex);

// Play / Pause
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶";
  } else {
    audio.play();
    playBtn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
});

// Next song
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
});

// Previous song
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
});

// Progress bar
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});
