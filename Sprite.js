const SPRITE_WIDTH = 160;
const SPRITE_HEIGHT = 220;
const BORDER_WIDTH = 20;
const SPACING_WIDTH = 20;

class Sprite {
  canvas = null;
  sprites = {};
  health = document.querySelector('#health-bar');
  hunger = document.querySelector('#hunger-bar');
  happiness = document.querySelector('#happiness-bar');
  age = document.querySelector('#age');
  cycleLength = 30;
  currentCycle = 0;
  currentSprite = null;

  constructor(canvas, sprites) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.sprites = sprites;
    for (let key in sprites) {
      this.sprites[key] = createImage(sprites[key]);
    }
  }

  set updateAge(val) {
    this.age.innerText = `${val} old`;
  }

  set decreaseHealth(val) {
    this.health.value -= val;
  }

  set increaseHealth(val) {
    this.health.value += val;
  }

  get healthStatus() {
    return this.health.value;
  }

  set decreaseHunger(val) {
    this.hunger.value -= val;
  }

  set increaseHunger(val) {
    this.hunger.value += val;
  }

  get hungerStatus() {
    return this.hunger.value;
  }

  set decreaseHappiness(val) {
    this.happiness.value -= val;
  }

  set increaseHappiness(val) {
    this.happiness.value += val;
  }

  get happinessStatus() {
    return this.happiness.value;
  }

  create() {
    this.resetStatus();
    clearImage(this.canvas, this.context);
    return this.sprites.walk;
  }

  delete() {
    clearImage(this.canvas, this.context);
  }

  draw(image) {
    return this.currentSprite = setInterval(() => {
      if (this.currentCycle === this.cycleLength) {
        this.currentCycle = 0;
      }
      const position = spritePositionToImagePosition(0, this.currentCycle);
      clearImage(this.canvas, this.context);
      this.context.drawImage(
        image,
        position.x,
        position.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        0,
        0,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
      );
      this.currentCycle++;
    }, 50);

  }

  died() {
    clearInterval(this.currentSprite);
    clearImage(this.canvas, this.context);
    this.draw(this.sprites.died);
  }

  resetStatus() {
    this.updateAge = 0;
    this.health.value = 100;
    this.hunger.value = 0;
    this.happiness.value = 100;
  }
}

export default Sprite;

function createImage(src) {
  const image = new Image();
  image.src = src;
  image.crossOrigin = true;
  return image;
}

function clearImage(canvas, context) {
  context.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
}

// converts a row and column of the spritesheet
// to coordinates in an image
function spritePositionToImagePosition(row, col) {
  return {
    x: (
      BORDER_WIDTH +
      col * (SPACING_WIDTH + SPRITE_WIDTH)
    ),
    y: (
      BORDER_WIDTH +
      row * (SPACING_WIDTH + SPRITE_HEIGHT)
    )
  }
}
