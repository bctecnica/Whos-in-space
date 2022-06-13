// Initial smoke values.
let options = {
    spread: 25,
    puff_size: 100,
    speed: 1.5,
    puff_increase: .2,
    dissipation: .005
  };
  
  
//   Create canvas.
  var canvas3 = document.querySelector('#smoke');
  const ctx = canvas3.getContext('2d');
  document.body.appendChild(canvas3);
//   Set canvas to the size of the viewable window.
  canvas3.width = window.innerWidth;
  canvas3.height = window.innerHeight;
  
  const origin = [
    canvas.width/2,
    canvas.height/2
  ];
  let particles = [];
  
  
  // Draw loop.
  drawing();
  
  function drawing () {
    particles.push(new Particle({
      pos: [origin[0] + rand(-10, 10), origin[1]],
      size: 1,
      speed: options.speed,
      color: '#CCC',
      borderColor: 'rgba(0,0,0,0)',
      angle: rand(180 + (90-options.spread), 360 - (90-options.spread))
    }));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(particle => {
      particle.move();
      particle.size += options.puff_increase;
      particle.alpha -= options.dissipation;
      particle.draw();
      if (particle.pos[0] > canvas.width
         || particle.pos[1] > canvas.height
         || particle.size > options.puff_size
         || particle.alpha < .01) {
        return false;
      }
      return true;
    });
    
    
    
    setTimeout(() => {
      window.requestAnimationFrame(drawing);
    }, 1);
  }
  
  function Particle (options) {
    this.angle = 0;
    this.curve = 0;
    this.pos = [0,0];
    this.size = 100;
    this.speed = 1;
    this.color = 'rgba(255,64,64,.95)';
    this.borderColor = this.color;
    this.waveX = false;
    this.waveY = false;
    this.index = 0;
    this.alpha = .5;
    
    // Override defaults.
    for (var i in options) {
      this[i] = options[i];
    }
    
    this.move = function () {
      this.angle += this.curve;
      var radians = this.angle*Math.PI/180;
      this.pos[0] += Math.cos(radians)*this.speed,
      this.pos[1] += Math.sin(radians)*this.speed;
      
      if (this.waveX) {
        this.pos[0] += Math.cos(this.index);
      }
      if (this.waveY) {
        this.pos[1] += Math.sin(this.index);
      }
    }
    this.draw = function () {
      ctx.globalAlpha = this.alpha || .00001;
      ctx.strokeStyle = this.borderColor;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.pos[0],this.pos[1],this.size,0,2*Math.PI);
      ctx.stroke();
      ctx.fill();
    }
  }
  
  function rand(min, max) {
    return Math.random()*(max-min)+min;
  }