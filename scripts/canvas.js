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
Analyser.prototype.draw = function(){};
BiquadFilter.prototype.draw = function(){};
ConstantSource.prototype.draw = function(){};
Delay.prototype.draw = function(){};
DynamicsCompressor.prototype.draw = function(){};
Gain.prototype.draw = function(){};
Oscillator.prototype.draw = function(){};
StereoPanner.prototype.draw = function(){};
for(let Node of kNodeConstructorList) {
  Node.prototype.erase = function() {}
}


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