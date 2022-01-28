window.onerror = function(a, b, c, d, err) {
  alert(err.stack);
}
const $ = id => document.getElementById(id);
const $class = name => document.getElementsByClassName(name);

function crash() {
  for(;;){};
}
function HEXtoRGBA(hex, a) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`
};
function isWithin(mouseX, mouseY, hitbox) {
  return (mouseX>hitbox[0]?(mouseY>hitbox[1]?(mouseX-hitbox[0]<hitbox[2]?(mouseY-hitbox[1]<hitbox[3]):false):false):false)
} // Why does this work. I hate myself