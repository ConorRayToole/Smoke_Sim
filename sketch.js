let emitter
let wind;
let img;

function preload() {
  img = loadImage("images/texture.png");
}

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  emitter = new Emitter();
  wind = new createVector();
}

function draw() {
  background(0);
  wind.add((mouseX - width/2) * 0.001,0);
  emitter.addParticle();
  emitter.run();
  wind.mult(0);
  stroke(255);
  line(width/2, height/4, mouseX, height/4);
}

class Particle{
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector();
    this.velocity = createVector(randomGaussian(0, 0.3), randomGaussian(-1, 0.3));
    this.lifespan = 255;
    this.friction = createVector();
  }
  
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(3);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 6.0;
    this.friction = p5.Vector.mult(this.velocity, -0.01);
  }
  
  applyForce(force){
    this.acceleration.add(force);
  }
  
  isDead(){
    return (this.lifespan < 0.0);
  }

  show() {
    imageMode(CENTER);
    tint(255, this.lifespan);
    image(img, this.position.x, this.position.y);
    img.resize(40,40);
    // noStroke();
    // fill(255);
    // circle(this.position.x, this.position.y, 20);
  }
  
  run() {
    this.applyForce(createVector(0, -0.1));
    this.applyForce(wind);
    this.applyForce(this.friction);
    this.update();  
    this.show();
  }
}

class Emitter {
  constructor() {
    this.particles = [];
  }
  
  addParticle() {
    this.particles.push(new Particle(width/2, (height*3)/4));
    //this.particles.push(new Particle(width/2, height/2));
  }
  
  run() {
    for (let i = 0; i < this.particles.length - 1; i++){
      this.particles[i].run();
      if (this.particles[i].isDead()){
        this.particles.splice(i, 1);
      }
    }
  }
}