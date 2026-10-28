(function(){
var dds=[].slice.call(document.querySelectorAll('.dd'));
function closeAll(except){dds.forEach(function(d){if(d!==except){d.classList.remove('open');var b=d.querySelector('.ddb');if(b)b.setAttribute('aria-expanded','false');}});}
dds.forEach(function(d){var b=d.querySelector('.ddb');if(!b)return;
b.addEventListener('click',function(e){e.stopPropagation();var o=!d.classList.contains('open');closeAll(d);d.classList.toggle('open',o);b.setAttribute('aria-expanded',o);});});
document.addEventListener('click',function(){closeAll();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll();});
})();
