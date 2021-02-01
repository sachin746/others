var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');
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


function Circle(x,y,dx,dy,radius,j,k,l){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.draw=function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.strokeStyle=`rgba(${j},${k},${l},1)`;
        c.stroke();
        c.fillStyle=`rgba(${j},${k},${l},1)`;
        c.fill();
    }
    this.update=function(){
        
        if(this.x+this.radius>innerWidth||this.x-this.radius<0){this.dx=-this.dx;}
        if(this.y+this.radius>innerHeight||this.y-this.radius<0){this.dy=-this.dy;}
        this.x+=this.dx;this.y+=this.dy;
        this.draw();
    }
}


var circlearry=[];
for(var i=0;i<255;i++){
    var x=Math.random()*(innerWidth-2*radius)+radius;
    var y=Math.random()*(innerHeight-2*radius)+radius;
    var radius=30;
    var dx=(Math.random()-0.5)*20;
    var dy=(Math.random()-0.5)*20;
    var j=Math.random()*255;
    var k=Math.random()*255;
    var l=Math.random()*255;
    circlearry.push(new Circle(x,y,dx,dy,radius,j,k,l));
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i=0;i<circlearry.length;i++){
        circlearry[i].update();
    }

 }
animate();