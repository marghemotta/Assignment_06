var myData;
var people = [];
var img;
var bgimg;

function preload() {
  myData = loadJSON('assets/peopleinspace.json');
  img = loadImage("assets/astroimg.png");
  bgimg = loadImage("assets/backimg.jpg");
}

function setup() {
  createCanvas(500, 500);
  textFont("Monaco");

  //print(myData);
  for (var i = 0; i < myData.people.length; i++) {
    var astroData = myData.people[i];
    print(astroData);
    var newAstronaut = new Astronaut(astroData.launchdate, astroData.name, astroData.title, astroData.country);
    people.push(newAstronaut);
  }


}

function draw() {
  background(bgimg);

  for (var i = 0; i < people.length; i++) {
    var astronaut = people[i];
    astronaut.move();
    astronaut.display();
  }

  if (frameCount<200){
  fill("#2c9d9b");
  textSize(12);
  text("Press the mouse to know", 240, 40);
  text("about the astronauts", 240,60);}

}

function Astronaut(launchDate, name, title, country) {

  this.name = name;
  this.title = title;
  this.country = country;

  // transform the launch date from String
  // to a date Object calculated in milliseconds
  this.launchDate = Date.parse(launchDate);
  // calculate the time spent in space
  var timeInSpace = Date.now() - this.launchDate;
  // define radius according to the time spent in space
  this.radius = floor(timeInSpace / (1000 * 60 * 60 * 24)) / 5;

  this.x = random(50, width - 100);
  this.y = random(50, height - 100);

  this.incrementX = random(0.5, 1.2);
  this.incrementY = random(0.5, 1.2);

  this.display = function() {

    if (this.title == 'commander') {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    image(img, this.x - 50, this.y - 50);

    textAlign(CENTER);

    if (mouseIsPressed) {
      fill('white');
      textSize(12);
      text(this.name, this.x - 10, this.y - 58);
      fill("#2c9d9b");
      textSize(8);
      text("Home Country: " + this.country, this.x - 10, this.y + 55);

    }

  }

  this.move = function() {

    this.x += this.incrementX;
    this.y += this.incrementY;

    if (this.x > width || this.x < 30) {
      this.incrementX *= -1
      print(this.x);
      print(this.radius);
    }

    if (this.y > height - 30 || this.y < 40) {
      this.incrementY *= -1
      print(this.y);
      print(this.radius);
    }
  }
}