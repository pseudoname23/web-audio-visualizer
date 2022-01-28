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
  if ($class('nodelist-option')[i].tagName == 'div') break;
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
  newNode.draw(nodeMapContext);
  deselectCurrentOption();
  };
UI.addEventListener('pointerdown', event => {
  //fillCircle(nodeMapContext, event.offsetX, event.offsetY, 50);
  if (selectedOption !== null) placeNode(event.offsetX, event.offsetY);
});
//

let confirmExit = false;
//window.onbeforeunload = function() {
//  if(confirmExit) return 'Are you sure you want to leave? Your nodes will not be saved.';
//}

function detectHover(x, y) {
  for (let box of paramHitboxes) {
    if(isWithin(x, y, box)) return box[4];
  };
  for(let box of nodeHitboxes) {
    if(isWithin(x, y, box)) return box[4];
  };
  return 'none';
};
UI.addEventListener('pointermove', event => {
  if (!nodes[1]) return;
  $('testing').innerHTML = detectHover(event.offsetX, event.offsetY);
});