const walkTeddy = document.getElementById('teddyImageWalk');
const idleTeddy = document.getElementById('teddyImageIdle');
const hurtTeddy = document.getElementById('teddyImageHurt');
const deadTeddy = document.getElementById('teddyImageDead');

const startBtn = document.getElementById('startBtn');
const controls = document.getElementById('controls');
const statusDiv = document.getElementById('status');
const feedBtn = document.getElementById('feedBtn');
const petBtn = document.getElementById('petBtn');

let energy = 100;
let happiness = 100;
let statusTimeout;

showTeddyGif(idleTeddy);
controls.style.display = 'none';
statusDiv.style.display = 'none';

function showTeddyGif(teddy) {
  idleTeddy.style.display = 'none';
  walkTeddy.style.display = 'none';
  hurtTeddy.style.display = 'none';
  deadTeddy.style.display = 'none';
  if (teddy) teddy.style.display = 'block';
}

function startGame() {
  startBtn.style.display = 'none';
  controls.style.display = 'block';
  statusDiv.style.display = 'block';
  showTeddyGif(walkTeddy);
  updateStatus();
  statusInterval = setInterval(lowerStatus, 5000);
}

//ChatGPT
  // Prompt: Ik wil dat de background music afspeelt wanneert de game start. (want op sommige browsers werkt autoplay niet)
  const bgMusic = new Audio('assets/backgroundmusic.mp3');
  bgMusic.loop = true;
  bgMusic.play().catch(e => {
    console.log("Autoplay failed:", e);
  });

//ChatGPT
//Ik wil dat de happiness en energy status elke 5 seconden omlaag gaat
function updateStatus() {
  document.getElementById('happiness').innerText = `Happiness: ${happiness}`;
  document.getElementById('energy').innerText = `Energy: ${energy}`;
}

function lowerStatus() {
  happiness = Math.max(happiness - 10, 0);
  energy = Math.max(energy - 10, 0);

  if (happiness < 30 || energy < 30) {
    showTeddyGif(hurtTeddy);
  } else if (happiness < 60 || energy < 60) {
    showTeddyGif(idleTeddy);
  } else {
    showTeddyGif(walkTeddy);
  }

  updateStatus();

  //Copilot
  // Ik wil de alert delayen en dat je pas de 'dead teddy' gif ziet als de happiness of energy op 0 is
  if (happiness === 0 || energy === 0) {
    showTeddyGif(deadTeddy);
    clearInterval(statusInterval);

    setTimeout(() => {
      alert("You sadly didn't take good care of Teddy... Restart the game to try again.");
      resetGame();
    }, 800);
  }
}

function feedTeddy() {
  happiness = Math.min(happiness + 10, 100);
  energy = Math.min(energy + 10, 100);
  showTeddyGif(walkTeddy);
  updateStatus();
  clearTimeout(statusTimeout);
  statusTimeout = setTimeout(() => {
    if (happiness < 30 || energy < 30) {
      showTeddyGif(hurtTeddy);
    } else if (happiness < 60 || energy < 60) {
      showTeddyGif(walkTeddy);
    } else {
      showTeddyGif(idleTeddy);
    }
  }, 1000);
}

function petTeddy() {
  happiness = Math.min(happiness + 10, 100);
  showTeddyGif(walkTeddy);
  updateStatus();
  clearTimeout(statusTimeout);
  statusTimeout = setTimeout(() => {
    if (happiness < 30 || energy < 30) {
      showTeddyGif(hurtTeddy);
    } else if (happiness < 60 || energy < 60) {
      showTeddyGif(walkTeddy);
    } else {
      showTeddyGif(idleTeddy);
    }
  }, 1000);
}

//Copilot
//Ik wil dat de game reset als je op de start knop klikt wanneer Teddy dood is
function resetGame() {
  happiness = 100;
  energy = 100;
  showTeddyGif(idleTeddy);
  updateStatus();
  controls.style.display = 'none';
  statusDiv.style.display = 'none';
  startBtn.style.display = 'block';
  clearInterval(statusInterval);
}

startBtn.addEventListener('click', startGame);
feedBtn.addEventListener('click', feedTeddy);
petBtn.addEventListener('click', petTeddy);
