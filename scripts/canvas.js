window.onerror = function(a,b,c,d , error) {
  alert(error.stack);
  }
const $ = id => document.getElementById(id);
const $class = name => document.getElementsByClassName(name);
  
function line (ctx , x1,y1 , x2,y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  };
// context.strokeRect(x, y, width, height)
// context.fillRect  (x, y, width, height)
// context.clearRect (x, y, width, height)
function strokeCircle(ctx , centerX,centerY , radius) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI*2);
  ctx.stroke();};
function fillCircle  (ctx , centerX,centerY , radius) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI*2);
  ctx.fill();};
function clearCircle (ctx , centerX,centerY , radius) {
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();
  };
//


/////////////////
// GRID CANVAS //
/////////////////

let grid = $('grid');
let gridContext = grid.getContext('2d');

gridImage: {
  let patternCanvas = document.createElement('canvas');
  patternCanvas.width = 20;
  patternCanvas.height = 20;
  
  let patternContext = patternCanvas.getContext('2d');
  patternContext.fillStyle = 'rgb(255, 255, 255)';
  patternContext.fillRect(0, 0, 20, 20);
  patternContext.fillStyle = 'rgba(0, 0, 0, 0.01)';
  patternContext.lineWidth = 1;
  line(patternContext, 0, 0, 20, 0);
  line(patternContext, 0, 0, 0, 20);
  
  gridContext.fillStyle = gridContext.createPattern(patternCanvas, 'repeat');
  gridContext.fillRect(0, 0, grid.width, grid.height);
  }
//


//////////////////
// NODES CANVAS //
//////////////////

let nodeMap = $('nodes');
let nodeMapContext = nodeMap.getContext('2d');
nodeMapContext.fillStyle = '#FF0000';
function drawParam (context, color, x, y){
  context.save();
  context.fillStyle = color;
  fillCircle(context, x, y, 20);
  context.fillStyle = '#000000';
  context.lineWidth = 3;
  context.stroke(); // POTENTIAL PROBLEM LINE
  context.lineWidth = 5;
  fillCircle(context, x, y, 10);
  line(context, x,    y-14, x,    y+14);
  line(context, x-14, y,    x+14, y   );
  line(context, x-10, y-10, x+10, y+10);
  line(context, x+10, y-10, x-10, y+10);
  context.fillStyle = color;
  fillCircle(context, x, y, 5);
  context.restore();
};
Analyser.prototype.draw = function(){
  // 3 base circles
  nodeMapContext.fillStyle = this.color;
  fillCircle(nodeMapContext, this.center[0], this.center[1], this.bounds[3]/2);
  fillCircle(nodeMapContext, this.bounds[0]+15, this.center[1], 15);
  fillCircle(nodeMapContext, this.bounds[0]+this.bounds[2]-15, this.center[1], 15);

  // Eye
  nodeMapContext.fillStyle = '#FFFFFF';
  nodeMapContext.beginPath();
  nodeMapContext.arc(this.center[0], this.bounds[1]+15, 50, 0.75, 2.35); // These were carefully measured.
  nodeMapContext.arc(this.center[0], this.bounds[1]+this.bounds[3]-15, 50, 3.93, 5.5); // DO NOT TOUCH!!!!
  nodeMapContext.fill(); // White
  nodeMapContext.fillStyle = '#000000';
  nodeMapContext.lineWidth = 3;
  nodeMapContext.stroke(); // Border
  fillCircle(nodeMapContext, this.center[0], this.center[1], 15); // Pupil

  // In/out text and border
  line(nodeMapContext, this.bounds[0]+15, this.center[1]-9, this.bounds[0]+15, this.center[1]+9);
  strokeCircle(nodeMapContext, this.bounds[0]+this.bounds[2]-15, this.center[1], 8);
  strokeCircle(nodeMapContext, this.center[0], this.center[1], this.bounds[3]/2);
};
BiquadFilter.prototype.draw = function(){
  nodeMapContext.fillStyle = this.color; // Base of node and I/O ports
  nodeMapContext.fillRect(this.innerBounds[0], this.innerBounds[1], this.innerBounds[2], this.innerBounds[3]);
  fillCircle(nodeMapContext, this.bounds[0]+15, this.center[1], 15);
  fillCircle(nodeMapContext, this.bounds[0]+this.bounds[2]-15, this.center[1], 15);

  nodeMapContext.fillStyle = '#000000';
  nodeMapContext.lineWidth = 3; // Node borders and I/O text
  line(nodeMapContext, this.bounds[0]+15, this.center[1]-9, this.bounds[0]+15, this.center[1]+9);
  strokeCircle(nodeMapContext, this.bounds[0]+this.bounds[2]-15, this.center[1], 8);
  nodeMapContext.strokeRect(this.innerBounds[0], this.innerBounds[1], this.innerBounds[2], this.innerBounds[3]);

  // Params
  drawParam(nodeMapContext, this.color, this.center[0]+25, this.bounds[1]+20);
  drawParam(nodeMapContext, this.color, this.center[0]-25, this.bounds[1]+this.bounds[3]-20);
  drawParam(nodeMapContext, this.color, this.center[0]-75, this.bounds[1]+20);
  drawParam(nodeMapContext, this.color, this.center[0]+75, this.bounds[1]+this.bounds[3]-20);
};
ConstantSource.prototype.draw = function(){};
Delay.prototype.draw = function(){};
DynamicsCompressor.prototype.draw = function(){};
Gain.prototype.draw = function(){};
Oscillator.prototype.draw = function(){};
StereoPanner.prototype.draw = function(){};
/*for(let Node of kNodeConstructorList) {
  Node.prototype.erase = function() {}
}*/


////////////////////////
// CONNECTIONS CANVAS //
////////////////////////

let connections = $('connections');
let connectionsContext = connections.getContext('2d');



///////////////////////////
// USER INTERFACE CANVAS //
///////////////////////////
// (note: this canvas is the target of all PointerEvents)

let UI = $('UI');
let UIContext = UI.getContext('2d');