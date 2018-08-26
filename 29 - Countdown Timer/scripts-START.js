let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds){
    clearInterval(countdown);   // kill all previous timers
//    setInterval(function(){
//        seconds--;
//    }, 1000)  // error accumulates (sometimes it's bigger then 1000)
    const now = Date.now(); // static method: currentTime on ms
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
//    console.log({now, then});
    countdown = setInterval(function(){
        const secondsLeft = Math.round((then - Date.now())/1000);
        if (secondsLeft < 0){
            console.log("Task done");
            clearInterval(countdown);
        } else {
//            seconds = secondsLeft;
//            console.log(secondsLeft);
            displayTimeLeft(secondsLeft);
        }
    }, 1000)
}

function displayTimeLeft(seconds){
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
//    console.log({mins, secs});
    const display = `${mins}:${secs < 10 ? '0': ''}${secs}`;
    document.title = display;
    timerDisplay.textContent = display; // innerText more heavy because returns only visible text
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    const seconds = end.getSeconds();
    
    endTime.textContent = `Be Back At ${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
//    console.log(parseInt === Number.parseInt);
    timer(seconds); // window.parseInt === Number.parseInt
}

buttons.forEach(button => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function(e){
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes*60);
    this.reset();
});