(function(){var d=document.getElementById('clk-d');if(!d)return;var END=Date.parse('2027-05-13T00:00:00+05:30'),h=document.getElementById('clk-h'),m=document.getElementById('clk-m'),s=document.getElementById('clk-s');
function p(n){return n<10?'0'+n:''+n}
function tick(){var l=Math.max(0,END-Date.now()),x=Math.floor(l/1000);d.textContent=Math.floor(x/86400);h.textContent=p(Math.floor(x%86400/3600));m.textContent=p(Math.floor(x%3600/60));s.textContent=p(x%60)}
tick();setInterval(tick,1000)})();
