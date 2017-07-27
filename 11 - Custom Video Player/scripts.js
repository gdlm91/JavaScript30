/**
 * Elements
*/
const player = document.querySelector('.player');
const video = document.querySelector('.player__video');
const toggleBtn = document.querySelector('.player__button.toggle');
const progressBar = document.querySelector('.progress');
const progressBarFill = document.querySelector('.progress__filled');
const skipBtns = document.querySelectorAll('.player__button[data-skip]');
const [volmSlider, velcSlider] = document.querySelectorAll('.player__slider');

let loading = true;

progressBarFill.style.flexBasis = `0%`;
progressBarFill.style.width = `0%`;

/**
 * Functions
 * */
function toggleVideo() {
   if (loading) return;

   if (video.paused) {
      video.play();
   } else {
      video.pause();
   }
}

function updateToggleBtn() {
   toggleBtn.textContent = video.paused ? '►' : '❚ ❚';
}

function updateProgress() {
   if (loading) return;

   let progress = (this.currentTime / video.duration) * 100;
   progressBarFill.style.flexBasis = `${progress}%`;
   progressBarFill.style.width = `${progress}%`;
}

function setBarPosition(e) {
   if (loading) return;

   let newPosition = (e.layerX / this.clientWidth) * video.duration;
   video.currentTime = newPosition;
}

function skipPosition() {
   if (loading) return;

   video.currentTime += Number.parseFloat(this.dataset.skip) || 0;
}

function setVolume() {
   video.volume = this.value;
}

function setVelocity() {
   video.playbackRate = this.value;
}

/**
 * Events
 */
player.addEventListener('dblclick', function () {
   this.webkitRequestFullScreen();
});

video.addEventListener('canplay', () => loading = false);

video.addEventListener('seeking', () => loading = true);

video.addEventListener('play', updateToggleBtn);

video.addEventListener('pause', updateToggleBtn);

video.addEventListener('timeupdate', updateProgress);

video.addEventListener('click', toggleVideo);

toggleBtn.addEventListener('click', toggleVideo);

progressBar.addEventListener('click', setBarPosition);

skipBtns.forEach(skipBtn => skipBtn.addEventListener('click', skipPosition));

volmSlider.addEventListener('change', setVolume);

velcSlider.addEventListener('change', setVelocity);