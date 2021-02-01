var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
// c.fillStyle="rgba(255,0,0,0.5)"
// c.fillRect(100,100,100,100);
// c.fillStyle="rgba(0,255,0,0.5)"
// c.fillRect(400,100,100,100);
// c.fillStyle="rgba(0,0,255,0.5)"
// c.fillRect(300,300,100,100);

// //line
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.strokeStyle="blue"
// c.stroke();

//arc/circle
// for(var i=0;i<500;i++){
//     c.beginPath();
//     var x=Math.random()*window.innerWidth;
//     var y=Math.random()*window.innerHeight;
//     c.arc(x,y,30,0,Math.PI*2,false);
//     var a=Math.random()*255;
//     var b=Math.random()*255;
//     var v=Math.random()*255;
//     c.strokeStyle=`rgba(${a},${b},${v},1)`;
//     c.stroke();
// }

// var x=Math.random()*innerWidth;
// var y=Math.random()*innerHeight;
// var radius=30;
// var dx=(Math.random()-0.5)*5;
// var dy=(Math.random()-0.5)*5;
var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var gravity=1;
var friction=0.6;
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener('resize', (event) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    Init();
})
addEventListener("click",()=>{
    Init();
})

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

function getDistance(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}
const colors=[
    "red",
    "blue",
    "orange",
    "green"
]
function randomColor(colors){
    return colors[Math.floor(Math.random()*colors.length)];
}

function Particle(x, y,radius,color) {
    this.x = x;
    this.y = y;
    this.mass=1;
    this.opacity=0;
    this.velocity={
        x:(Math.random()-0.5)*5,
        y:(Math.random()-0.5)*5
    }
    this.color=color;
    this.radius = radius;
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.save();
        c.globalAlpha=this.opacity;
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }
    this.update = (Particles)=>{
        for(let i=0;i<particles.length;i++){
            if(this==particles[i]){continue;}
            if(getDistance(this.x,this.y,particles[i].x,particles[i].y)<2*this.radius){
                resolveCollision(this,particles[i]);
           }
        }
        if(this.y+this.radius>canvas.height||this.y-this.radius<=0){
            this.velocity.y=-this.velocity.y;
        }
        if(this.x+this.radius>canvas.width||this.x-this.radius<=0){
            this.velocity.x=-this.velocity.x;
        }
        //mouse
        if(getDistance(mouse.x,mouse.y,this.x,this.y)<120&&this.opacity<0.5){
            this.opacity+=0.02
        }else if(this.opacity>0){
            this.opacity-=0.02;
            this.opacity=Math.max(0,this.opacity);
        }
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        this.draw();
    }
}


let particles; 
function Init() {
    particles=[]; 
   for(let i=0;i<200;i++){
    const radius=15;
       let x=Math.random()*(innerWidth-2*radius)+radius;
       let y=Math.random()*(innerHeight-2*radius)+radius;
       const color=randomColor(colors);
       if(i!=0){
           for(let j=0;j<i;j++){
               if(getDistance(x,y,particles[j].x,particles[j].y)<2*radius){
                    x=Math.random()*(innerWidth-2*radius)+radius;
                    y=Math.random()*(innerHeight-2*radius)+radius;
                    j=-1;
               }
           }
       }
       particles.push(new Particle(x,y,radius,color));
   }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    particles.forEach(particle=>{
        particle.update(particles);
    });
}

Init();
animate();
