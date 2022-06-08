var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var center = {x: canvas.width / 2, y: canvas.height / 2};

window.onload = function()
{
  canvasEvent();
}

var dir= "RIGHT";
var place = 5;
var text = "HELLO";

function canvasEvent()
{
  setInterval("moveIt()", 20)
}

function moveIt() {
  if(place < canvas.width/2)
    {
      place += 10;
    }
}

function Circle(x,y,radius,fillColor){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.fillColor = fillColor;
  
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.fillColor;
  c.fill();
}

function Cloud(x,y,dx,cloudWidth,cloudLength){
  
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.cloudWidth = cloudWidth;
  this.cloudLength = cloudLength;

  
  this.draw = function(){
    c.save();
    c.beginPath();
    c.arc(center.x, center.y, 120, 0, Math.PI * 2, false);
    c.clip();
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineCap = 'round';
    c.lineWidth = this.cloudWidth;
    c.lineTo(this.x + this.cloudLength,this.y);
    c.strokeStyle = 'white';
    c.stroke();
    c.restore();
  }
  this.update = function(){
    if(this.x < (center.x - 240)){
      this.x = center.x+240;
    }
    this.x -= this.dx;
    this.draw();
  }
  
}

function Land(x,y,dx,landWidth,landLength){
  
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.landWidth = landWidth;
  this.landLength = landLength;

  
  this.draw = function(){
    c.save();
    c.beginPath();
    c.arc(center.x, center.y, 120, 0, Math.PI * 2, false);
    c.clip();
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineCap = 'round';
    c.lineWidth = this.landWidth;
    c.lineTo(this.x + this.landLength,this.y);
    c.strokeStyle = '#85cc66';
    c.stroke();
    c.restore();
  }
  this.update = function(){
    if(this.x < (center.x-240)){
      this.x = center.x +240;
    }
    this.x -= this.dx;
    this.draw();
  }
  
}

function SemiCircle(x,y,radius,fillColor){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.fillColor = fillColor;
  
  c.beginPath();
  c.arc(this.x, this.y, this.radius, Math.PI * 1.2, .6, false);
  c.fillStyle = this.fillColor;
  c.fill();
}

//Initial object arrays
var earthWidth = 120;
var clouds = [{x: 20,y:10}];
var land = [{x: 20,y:10}];

function drawClouds(a){
  for (var i = 0; i <= a; ++i) {
    var bestLocation = earthMask(clouds);
    var cloudWidth = Math.floor(Math.random() * 20) + 5;
    var cloudLength = Math.floor(Math.random() * 30) + 18;
    var dx = (Math.random() + 0.2 )* 1;
    clouds.push(new Cloud(bestLocation[0],bestLocation[1],dx,cloudWidth,cloudLength));
  }
}


function drawLand(a){
  for (var i = 0; i <= a; ++i) {
    var bestLocation = earthMask(land);
    var landWidth = Math.floor(Math.random() * 25) + 10;;
    var landLength = Math.floor(Math.random() * 30) + 18;
    dx = 0.5;
    land.push(new Land(bestLocation[0],bestLocation[1],dx,landWidth,landLength));
  }
}

//Use best candidate algorithm to evenly distribute across the canvas
function sample(samples) {
  var bestCandidate, bestDistance = 0;
  for (var i = 0; i < 20; ++i) {
    var c = [Math.random() * canvas.width, Math.random() * canvas.height],
        d = distance(findClosest(samples, c), c);
    if (d > bestDistance) {
      bestDistance = d;
      bestCandidate = c;
    }
  }
  return bestCandidate;
}

//Use best candidate algorithm to evenly distribute across the earth mask
function earthMask(samples) {
  var bestCandidate, bestDistance = 0;
  //The higher the iteration the better the distribution
  //Performance takes a hit with higher iteration
  for (var i = 0; i < 20; ++i) {
    var c = [Math.floor(Math.random() * ((center.x+240) - (center.x-240) + 1)) + (center.x-240), Math.floor(Math.random() * ((center.y+120) - (center.y-120) + 1)) + (center.y-120)],
        d = distance(findClosest(samples, c), c);
    if (d > bestDistance) {
      bestDistance = d;
      bestCandidate = c;
    }
  }
  return bestCandidate;
}

function distance(a, b) {
  var dx = a.x - b[0],
      dy = a.y - b[1];
  return Math.sqrt(dx * dx + dy * dy);
}


function findClosest(points, b) {
  var distance = null;
  var closestPoint;
  for (var i = 0; i < points.length; ++i) {
      var dx = points[i].x - b[0];
      var dy = points[i].y - b[1];
      if(distance == null){
        distance = Math.sqrt(dx * dx + dy * dy);
        closestPoint = points[i];
      } else if(distance > Math.sqrt(dx * dx + dy * dy)){
        distance = Math.sqrt(dx * dx + dy * dy);
        closestPoint = points[i];
      }
  }
  return closestPoint;
}

drawClouds(25);
drawLand(15);

// Animate canvas
function animate(){
  requestAnimationFrame(animate);
  c.fillStyle = c.fillStyle = 'rgba(0, 0, 0, 0)';
// linear-gradient(210deg, #00103a 55%, #334e62 100%)
  c.fillRect(0, 0, canvas.width, canvas.height);
  var earthBorder = new Circle(center.x,center.y, 135,'rgb(12, 20, 56)');
  var earth = new Circle(center.x,center.y, earthWidth,'rgb(25, 118, 181)');
  for (var i = 1; i < land.length; i++){
    land[i].update();
  }
  for (var i = 1; i < clouds.length; i++){
    clouds[i].update();
  }
  var semi = new SemiCircle(center.x,center.y,earthWidth,'rgba(0, 0, 0, 0.4)');
}

animate();
