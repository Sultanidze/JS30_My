const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then( localMediaStream =>{
//        console.log(localMediaStream);
        try {
            video.srcObject = localMediaStream;
        } catch (error){
            video.src = URL.createObjectURL(localMediaSteram);
        }
        video.play();
    })
    .catch(err => {
        console.error(`Error: ${err}`);
    });
}

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    
    return setInterval(() => {
        ctx.drawImage(video, 0, 0);
        
        let pixels = ctx.getImageData(0, 0, width, height);
        greenScreen(pixels);
//        redEffect(pixels);
        rgbSplit(pixels);
        ctx.globalAlpha = 0.8;
        ctx.putImageData(pixels, 0, 0);
//        console.log(pixels);
//        debugger;
        
    }, 16);
}

function redEffect(pixels){
    for (let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i+0] = pixels.data[i+0] + 100;  // r
        pixels.data[i+1] = pixels.data[i+1] - 50;   // g
        pixels.data[i+2] = pixels.data[i+2] * 0.5;  // b
    }
}

function rgbSplit(pixels){
    for (let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i - 150] = pixels.data[i+0];
        pixels.data[i + 100] = pixels.data[i+1];
        pixels.data[i - 150] = pixels.data[i+2];
    }
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }
}

function takePhoto(){
    // play photo audio
    snap.currentTime = 0;
    snap.play();
    
    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", 'handsome');
//    link.textContent = `download photo`;
//    console.log(link);
//    console.dir(link);
//    const img = document.createElement("img");
//    img.src = data;
//    link.append(img);
    link.innerHTML = `<img src="${data}" alt="Handsome man">`;
    strip.insertBefore(link, strip.childNodes[0]);
}

getVideo();

video.addEventListener("canplay", paintToCanvas);