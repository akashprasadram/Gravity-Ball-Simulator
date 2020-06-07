var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


var colors=['#C004D9','#AB05F2','#5A13F2','#2745F2','#1B78F2','#A7C8F2','#048ABF','#027368','#025951','#F25116'];

var mouse={
	x: innerWidth/2,
	y: innerHeight/2
}

var gravity=1;
var fraction=0.59;
window.addEventListener('mousemove',function(event){
	//console.log(event);
	mouse.x=event.clientX;
	mouse.y=event.clientY;
	})

window.addEventListener('click',function(){
	init();
})

window.addEventListener('resize',function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
})

function randomIntFromRange(min,max)
{
	return Math.floor(Math.random() *(max-min+1)+min);
}

function randomColors(colors)
{
	return colors[Math.floor(Math.random()*colors.length)]; 
}


//Object
function Ball(x,y,dx,dy,radius,color)
{
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius=radius;
	this.color=color;

	this.update = function()
	{
		if(this.y + this.radius + this.dy> canvas.height)
		{
			this.dy= -this.dy * fraction;
		}
		else
		{
			this.dy += gravity;
		}
		if(this.x + this.radius + this.dx > canvas.width || this.x-this.radius <= 0)
		{
			this.dx= -this.dx ;
		}

		this.x+=this.dx;
		this.y+=this.dy;
		this.draw();
	}
	this.draw = function()
	{
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.fillStyle=this.color;
		c.fill();
		c.stroke();
		c.closePath();
	}
}

//Implementation
var ball;
var ballArray=[];
function init()
{
	ballArray = [];
	for (var i =0; i < 400; i++) {
		var radius = randomIntFromRange(8,20);
		var x=randomIntFromRange(radius,canvas.width - radius);
		var y=randomIntFromRange(0,canvas.height - radius);
		var dx=randomIntFromRange(-2,2);
		var dy=randomIntFromRange(-2,2);
		var color= randomColors(colors);
		ballArray.push(new Ball(x,y,dx,dy,radius,color));
	}
	//ball=new Ball(canvas.width/2, canvas.height/2, 2, 30, "red");
	//console.log(ball);
}

function animate()
{
	requestAnimationFrame(animate);
	c.clearRect(0,0,canvas.width,canvas.height);
	for (var i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	}
	//ball.update();
	//c.fillText("HTML CANVAS BOILERPLATE",mouse.x,mouse.y);
}
init();
animate();

