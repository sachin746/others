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
    x: canvas.width/2,
    y: canvas.height/2
}

var maxRadius = 40;
var gravity=1;
var friction=0.6;
var radian=0;
const colors=[
    "red",
    "blue",
    "orange",
    "green"
]
function randomColor(colors){
    return colors[Math.floor(Math.random()*colors.length)];
}
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

function ball(x, y,radius, color) {
    this.x = x;
    this.y = y;
    this.color=color;
    this.radian=Math.random()*Math.PI*2;
    this.velocity=0.05;
    this.radius = radius;
    this.rand=Math.random()*50+50;
    this.lastmouse={x:x,y:y}
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function () {
        var lastpoint={
            x:this.x,
            y:this.y
        }
        this.radian+=this.velocity;

        //drag effect
        this.lastmouse.x+=(mouse.x-this.lastmouse.x)*0.05;
        this.lastmouse.y+=(mouse.y-this.lastmouse.y)*0.05;
        this.x=this.lastmouse.x+Math.cos(this.radian)*this.rand;
        this.y=this.lastmouse.y+Math.sin(this.radian)*this.rand;
        this.draw(lastpoint);
    }
    this.draw=(lastpoint)=>{
        c.beginPath();
        c.strokeStyle=this.color;
        c.lineWidth=this.radius;
        c.moveTo(lastpoint.x,lastpoint.y);
        c.lineTo(this.x,this.y);
        c.stroke();
        c.closePath();
    };
}


var particlearry;

function Init() {

        particlearry= [];
    for (var i = 0; i <50; i++) {
        var radius=Math.random()*2+1;
        particlearry.push(new ball(canvas.width/2, canvas.height/2,radius,randomColor(colors)));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle='rgba(255,255,255,0.06)';
    c.fillRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < particlearry.length; i++) {
        particlearry[i].update();
    }

}
Init();
animate();

