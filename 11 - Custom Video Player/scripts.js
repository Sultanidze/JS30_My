/* get elements ------------ */
const 
     player = document.querySelector(".player")
    ,video = player.querySelector(".viewer")
    ,progress = player.querySelector(".progress")
    ,progressBar = player.querySelector(".progress__filled")
    
    ,toggle = player.querySelector(".toggle")
    ,skipButtons = player.querySelectorAll("[data-skip]")
    ,ranges = player.querySelectorAll(".player__slider")
    ;


/* build functions ------------ */
function togglePlay(){
//    if (video.paused) {
//        video.play();
//    } else {
//        video.pause();
//    }
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
function updateButton(){
    toggle.textContent = this.paused ? '►' : '❚ ❚';
    
}
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){    
    const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime = scrubTime;
//    console.log(scrubTime);
}

/* add event listeners ------------ */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach(skipBtn => skipBtn.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => {
//    if(mousedown){scrub};
    mousedown && scrub(e)
});
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);