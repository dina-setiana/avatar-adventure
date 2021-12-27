import Sprite from "./Sprite.js";

const sprites = {
  walk: './sprite/SpriteWalkSheet.png',
  died: './sprite/DiedSpriteSheet.png',
}

const canvas = document.querySelector('canvas');
const name = document.querySelector("#name span");
const input = document.querySelector("#name-input input");

const petIns = new Sprite(canvas, sprites);
let speedInterval = 1000;
let totalTime = 0;
let happinessInterval = 1000 * 5;

document.getElementById("reset").addEventListener('click', () => {
  document.querySelector('#game-over').style.display = 'none';
  petIns.delete();
  petIns.resetStatus();
  clearInterval(petIns.currentSprite);
  totalTime = 0;
  _onload();
});
document.getElementById("health").addEventListener('click', () => {
  petIns.increaseHealth = Math.floor(speedInterval / 1000) * 2;
});
document.getElementById("hunger").addEventListener('click', () => {
  petIns.decreaseHunger = Math.floor(speedInterval / 1000) / 2;
});
document.getElementById("happiness").addEventListener('click', () => {
  petIns.increaseHappiness = randomInt();
});
document.querySelector(".edit-icon").addEventListener('click', () => {
  document.getElementById("name-input").style.display = 'flex';
  document.querySelector("#name").style.display = 'none';
  input.value = name.innerText;
});

document.querySelector(".save-icon").addEventListener('click', () => {
  document.getElementById("name-input").style.display = 'none';
  document.querySelector("#name").style.display = 'block';
  name.innerText = input.value;
});

const pet = petIns.create();
const _onload = () => {
  name.innerText = randomName(randomInt(5, 15));
  const petInt = petIns.draw(pet);

  let happiness = setInterval(() => {
    petIns.decreaseHappiness = randomInt();
  }, happinessInterval);

  let life = setInterval(() => {
    totalTime += speedInterval;
    petIns.updateAge = secondToDhms(totalTime);
    petIns.decreaseHealth = Math.floor(speedInterval / 1000) * 2;
    petIns.increaseHunger = Math.floor(speedInterval / 1000) / 2;
    if (petIns.healthStatus <= 0) {
      clearInterval(petInt)
      clearInterval(life);
      clearInterval(happiness);
      document.querySelector('#game-over').style.display = 'block';
      petIns.died();
    }
  }, speedInterval);
}

pet.onload = _onload;

function secondToDhms(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor(seconds % (3600 * 24) / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function randomInt(min = 0, max = 3) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomName(length) {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}