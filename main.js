const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const {width, height} = canvas;

ctx.fillStyle = 'red';

function draw(rotation = 0) {
  ctx.clearRect(0, 0, 1000, 1000);
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(rotation);
  ctx.translate(-width / 2, -height / 2);
  ctx.beginPath();
  ctx.rect(200, 200, 200, 200);
  ctx.fill();
  ctx.restore();
}

function update(t) {
  draw(t / 500);
  requestAnimationFrame(update);
}
update(0);

const stream = canvas.captureStream();
const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

const data = [];
recorder.ondataavailable = function (event) {
  if (event.data && event.data.size) {
    data.push(event.data);
  }
};

recorder.onstop = () => {
  const url = URL.createObjectURL(new Blob(data, { type: 'video/webm' }));
  document.querySelector("#videoContainer").style.display = "block";
  document.querySelector("video").src = url;
};

recorder.start();

setTimeout(() => {
  recorder.stop();
}, 6000);

