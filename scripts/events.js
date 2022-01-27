let audioContext;
let appStarted = false;

//
// Initializing the audioContext
window.addEventListener('pointerdown', event => {
  if (!appStarted) {
    appStarted = true;
    audioContext = new AudioContext();
    $('start').style.display = 'none';
    new Destination();
  };
  });
/* 
 You'll see this weird end bracket placement a lot.
 VSCode does code folding strangely. It leaves the end
 bracket visible on another line when it's folded.
 So I do this to force it to fold code Glitch-style.
 Anywho...
 */
// Selecting nodes from the list
let selectedOption = null;
function selectOption (id) {
  $class('nodelist-option')[id].classList.add('nodelist-selected');
  selectedOption = id;
  };
function deselectCurrentOption () {
  Array.from($class('nodelist-selected')).forEach(option => option.classList.remove('nodelist-selected'));
  selectedOption = null;
  };
for(let i = 0; i < $class('nodelist-option').length; ++i) {
  $class('nodelist-option')[i].addEventListener('pointerup', event => {
    event.preventDefault();
    if ($class('nodelist-selected')[0]) deselectCurrentOption();
    selectOption(i);
  });
  };
//  
// Event handlers for node placement
function placeNode(x, y) {
  let newNode = new (kNodeConstructorList[selectedOption])(x, y);
  newNode.draw();
  deselectCurrentOption();
  };
UI.addEventListener('pointerdown', event => {
  //fillCircle(nodeMapContext, event.offsetX, event.offsetY, 50);
  if (selectedOption !== null) placeNode(event.offsetX, event.offsetY);
  });
//
function isWithin(mouseX, mouseY, hitbox) {
  return (mouseX>hitbox[0]?(mouseY>hitbox[1]?(mouseX-hitbox[0]<hitbox[2]?(mouseY-hitbox[1]<hitbox[3]?true:false):false):false):false)
}

let confirmExit = false;
//window.onbeforeunload = function() {
//  if(confirmExit) return 'Are you sure you want to leave? Your nodes will not be saved.';
//}