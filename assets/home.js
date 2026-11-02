var R=[["DPDP","India","Digital Personal Data Protection Act","Applies to digital personal data processed in India, and to offerings made to people in India.","We cover notice, consent, Data Fiduciary duties and breach response."],
["GDPR","Europe","General Data Protection Regulation","Applies if you offer goods or services to, or monitor, people in the EU or EEA.","We cover lawful basis, DPIAs, transfers and rights handling."],
["CCPA","United States","California Consumer Privacy Act and CPRA","Applies to many businesses handling California residents' data.","We cover disclosures, opt-outs, rights requests and contracts."],
["PDPA","Singapore, Malaysia, Thailand","Personal Data Protection Acts","Each country has its own act, regulator and breach rules.","We align one programme to all three."],
["PDPL","Saudi Arabia","Personal Data Protection Law","Applies to processing of personal data of individuals in the Kingdom.","We cover controller duties, transfers and documentation."]];
var t=document.getElementById('tabs');
function show(i){var r=R[i];rn.textContent=r[2];rw.textContent=r[0]+" | "+r[1];rd.textContent=r[3];rs.textContent=r[4];
[].forEach.call(t.children,function(b,j){b.setAttribute('aria-selected',j==i)})}
R.forEach(function(r,i){var b=document.createElement('button');b.textContent=r[0];b.setAttribute('role','tab');b.onclick=function(){show(i)};t.appendChild(b)});
show(0);
var TT=["Management dashboard","DSAR workflow","Data inventory","Data discovery","Consulting report"],tt=document.getElementById('tt'),P=document.querySelectorAll('#tour .pn');
TT.forEach(function(n,i){var b=document.createElement('button');b.textContent=n;b.setAttribute('role','tab');b.onclick=function(){P.forEach(function(p,j){p.classList.toggle('on',i==j)});[].forEach.call(tt.children,function(x,j){x.setAttribute('aria-selected',i==j)})};tt.appendChild(b)});tt.children[0].click();

(function(){var f=document.getElementById('contact-form');if(!f)return;var b=f.querySelector('button[type="submit"]'),s=document.getElementById('form-status');
f.addEventListener('submit',function(e){e.preventDefault();
if(!f.reportValidity()){return}
var label=b.textContent;b.textContent='Sending...';b.disabled=true;s.style.color='#D9D3F5';s.textContent='';
fetch(f.action,{method:'POST',body:new FormData(f),headers:{'Accept':'application/json'}})
.then(function(r){return r.json().then(function(d){return{ok:r.ok&&d.success!==false,d:d}})})
.then(function(x){if(x.ok){s.style.color='#3DDC97';s.textContent='Thank you. Your request has been sent and our team will reply shortly.';f.reset()}else{throw new Error(x.d&&x.d.message||'failed')}})
.catch(function(){s.style.color='#FFB4C0';s.textContent='Sorry, your message could not be sent. Please WhatsApp us on +91 70210 17952 or email contact@privaglobe.com.'})
.then(function(){b.textContent=label;b.disabled=false})});})();
