var record_animation = false;
var name = "image_"
var total_frames = 400;
var frame = 0;
var loop = 0;
var total_time = 4*Math.PI;
var rate = total_time/total_frames;


var N = 50;
var M = 100; 
var F = 4;
var f = 4;
var f_min = 0;
var f_max= 10;
var G = 4;
var g = 4;
var h = 5; 
var h_min = 2;
var h_max = 0.25;

var time = 0;
//var rate = 2*Math.PI/300;

var get_mouse_pos = false;
var get_touch_pos = false;

var stop = false;
var fps, fpsInterval, startTime, now, then, elapsed;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



startAnimating(30);


function draw() {
  
  var W = canvas.width = 500; //window.innerWidth;
  var H = canvas.height = 500; //window.innerHeight;;

  ctx.fillStyle = 'rgba(21,32,43, 1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let i = M; i < 2*M; i++) {
    let p = i*2*Math.PI/N;
    let A = 150 + 30*Math.sin(i*2*Math.PI/G + time)
    let  x_pos = W/2 + A*Math.cos(i*F*Math.PI/M + time/2) ;
    let  y_pos = H/2 + A*Math.sin(i*F*Math.PI/M + time/2); 
    circle(x_pos,
           y_pos,
           Math.max(0, 10*Math.sin(h*p + time) + 10*(1 + Math.sin(f*p + time)) )
          );
  
  } 
  
  
  //time += rate;

  h = h_min + h_max*Math.sin(time);

  //f = 4 + .5*Math.sin(time);
  
  
  
  
  canvas.addEventListener('mousedown', e => {
    get_mouse_pos = true;
    getMousePosition(canvas, e)
  });

  canvas.addEventListener('mouseup', e => {
    get_mouse_pos = false;
  });

  canvas.addEventListener('mousemove', function(e) {
    if(get_mouse_pos) {
      getMousePosition(canvas, e)
    }
  })

  canvas.addEventListener('touchstart', function(e) {
    getTouchPosition(canvas,e);
    event.preventDefault();
  }, false);

  canvas.addEventListener('touchend', function(e) {
    get_touch_pos = false;
  }, false);

  canvas.addEventListener('touchmove', function(e) {
    getTouchPosition(canvas,e);
    event.preventDefault();
  }, false);

}


function startAnimating(fps) {
    
   fpsInterval = 1000 / fps;
   then = window.performance.now();
   startTime = then;
   
   animate();
}


function animate(newtime) {

    requestAnimationFrame(animate);

    now = newtime;
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        draw();
        
        frame = (frame+1)%total_frames;
        time = rate*frame;
        

        if(record_animation) {

            if (loop === 1) { 
            let frame_number = frame.toString().padStart(total_frames.toString().length, '0');
            let filename = name+frame_number+'.png'
                
            dataURL = canvas.toDataURL();
            var element = document.createElement('a');
            element.setAttribute('href', dataURL);
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            }

            if (frame + 1 === total_frames) {
                loop += 1;
            }

            if (loop === 2) { stop_animation = true }
        }
    }
}




function circle(x,y,r) {
  
  ctx.fillStyle = 'rgba(21,32,43, 1)';
  ctx.strokeStyle = 'rgba(200,200,200,1)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(x, y, r, r, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  
}


function getMousePosition(canvas, event) {
  
  f = f_min + f_max*(event.clientY/canvas.height);
  h_min = 4*event.clientX/canvas.width;
       
}

function getTouchPosition(canvas, event) {
    var touch = event.touches[0];
  
    f = f_min + f_max*(touch.clientY/canvas.height);
    h_min = 4*touch.clientX/canvas.width;
       
}

