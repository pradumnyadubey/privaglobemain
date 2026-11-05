(function(){
var A={data:"Know your data",notice:"Notice & consent",rights:"Rights & grievance",security:"Security & breach",children:"Children's data",retention:"Retention & erasure",vendors:"Vendors",gov:"Governance"};
var O=["Yes, in place and tested","Partly, or informal","No, or not sure"];
var Q=[
["data","Can you list every system and spreadsheet that holds personal data of customers, employees or users?","Without a data map, every later step is guesswork.","Start with a one-page inventory: system, data fields, owner, vendor."],
["data","Do you know which personal data you collect that you do not actually need?","Collection must be limited to what the stated purpose needs.","Cut fields from forms that no process uses."],
["notice","Does every point where you collect data show a plain-language notice listing the data, purpose and how to withdraw consent? (Rule 3)","Notice and consent are the core of the Act and are enforced from 13 May 2027.","Rewrite notices itemised by purpose, available in English and the Eighth Schedule languages where relevant."],
["notice","Can you prove who consented, when, and to what, and can a person withdraw as easily as they gave it?","Withdrawal must be as easy as giving consent, and you carry the burden of proof.","Store a consent record per person and purpose, with timestamp and notice version."],
["rights","Can you answer an access, correction or erasure request within a defined, documented time? (Rule 14)","Rights requests need a repeatable workflow, not an inbox.","Create one intake route, an owner and a response clock."],
["rights","Have you published a contact for privacy questions and a grievance process? (Rule 9)","Publishing a contact is required even for companies that are not Significant Data Fiduciaries.","Add a named role and email to your site and notices."],
["security","Do you have encryption, access control and one year of retained logs for systems holding personal data? (Rule 6)","Failing reasonable security safeguards carries the highest penalty ceiling, up to ₹250 crore.","Check log retention first; it is the most common gap."],
["security","Do you have a written breach plan that covers telling the Board and each affected person, and a 72-hour report? (Rule 7)","The detailed report to the Board is due within 72 hours of becoming aware.","Draft a one-page run-sheet and run a tabletop test."],
["children","If you handle children's data, do you have verifiable parental consent and no tracking or targeted ads aimed at children? (Rule 10)","Children's data breaches carry up to ₹200 crore. If you never handle it, choose the first option.","Add an age gate and a parent-verification step before collection."],
["retention","Do you delete personal data when its purpose ends, with a retention schedule and a 48-hour pre-erasure notice where required? (Rule 8)","Keeping data indefinitely is itself a violation.","Set retention per data category and automate deletion."],
["vendors","Do your contracts with processors and vendors bind them to DPDP-level safeguards and breach reporting?","You stay accountable for processors acting on your behalf.","List vendors, then add a data-processing addendum to each contract."],
["gov","Does a named person own privacy compliance and report to leadership, and have you decided whether you could be a Significant Data Fiduciary? (Rule 13)","SDFs need an India-based DPO, an independent audit and periodic impact assessments.","Run the five-question DPO decision path and assign an owner."]
];
var i=0,s=[],ans=[];var $=function(id){return document.getElementById(id)};
function show(){var q=Q[i];$('qarea').textContent=A[q[0]]+" · "+(i+1)+" of "+Q.length;$('qtext').textContent=q[1];$('qwhy').textContent=q[2];
$('qbar').style.width=(i/Q.length*100)+"%";var o=$('qopts');o.textContent="";
O.forEach(function(t,k){var b=document.createElement('button');b.type='button';b.className='opt';b.textContent=t;b.onclick=function(){pick(2-k)};o.appendChild(b)});}
function pick(v){ans[i]=v;i++;if(i<Q.length)show();else done();}
function done(){var tot=0,by={};Q.forEach(function(q,k){tot+=ans[k];by[q[0]]=by[q[0]]||{s:0,m:0};by[q[0]].s+=ans[k];by[q[0]].m+=2;});
var p=Math.round(tot/(Q.length*2)*100);var band=p<30?"Starting out":p<55?"Early stage":p<80?"Building well":"Close to ready";
$('qwrap').classList.add('hidden');$('res').classList.remove('hidden');$('qbar').style.width="100%";
$('sc').textContent=p+"%";$('band').textContent=band;
var bars=$('bars');bars.textContent="";Object.keys(by).forEach(function(k){var r=document.createElement('div');r.className='arow';var a=document.createElement('span');a.textContent=A[k];var d=document.createElement('div');var f=document.createElement('i');f.style.width=Math.round(by[k].s/by[k].m*100)+"%";d.appendChild(f);r.appendChild(a);r.appendChild(d);bars.appendChild(r);});
var gaps=Q.map(function(q,k){return{k:k,v:ans[k]}}).filter(function(x){return x.v<2}).sort(function(a,b){return a.v-b.v}).slice(0,3);
var w=$('weak');w.textContent="";if(!gaps.length){w.textContent="No gaps flagged. The next step is evidence: have someone outside the team test your answers.";}
gaps.forEach(function(g){var q=Q[g.k];var d=document.createElement('div');d.className='weak';var b=document.createElement('b');b.textContent=A[q[0]];var p1=document.createElement('p');p1.textContent=q[2];var p2=document.createElement('p');var st=document.createElement('b');st.textContent="First step: ";p2.appendChild(st);p2.appendChild(document.createTextNode(q[3]));d.appendChild(b);d.appendChild(p1);d.appendChild(p2);w.appendChild(d);});
$('summ').value="Score "+p+"% ("+band+"). Gaps: "+(gaps.map(function(g){return A[Q[g.k][0]]}).join(", ")||"none");}
var f=$('lead');if(f)f.addEventListener('submit',function(e){e.preventDefault();var st=$('lead-status');st.textContent="Sending…";
fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(f)))}).then(function(r){return r.json()}).then(function(j){st.textContent=j.success?"Thank you. We will email your detailed report within 2 working days.":"Could not send. Please email contact@privaglobe.com.";if(j.success)f.reset();}).catch(function(){st.textContent="Could not send. Please email contact@privaglobe.com.";});});
if($('qopts'))show();
})();
