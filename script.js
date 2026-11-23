const endpoint='https://hood-trust-community-homes.upside-capit-3473.chatgpt.site/api/submit';
for(const form of document.querySelectorAll('.signup-form')){
 const kind=form.getAttribute('aria-label').split(' ')[0];
 if(kind==='contact'){
  const amount=new URLSearchParams(location.search).get('donation');
  if(amount==='custom'||/^\d{1,6}$/.test(amount||'')){form.elements.topic.value='Donation or membership';form.elements.message.value='I would like to discuss a gift of '+(amount==='custom'?'a custom amount':'$'+amount)+' to HOOD Land Trust.';}
 }
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const button=form.querySelector('button[type=submit]'),status=form.querySelector('[role=status]'),label=button.textContent;
  button.disabled=true;button.textContent='Saving…';status.textContent='';status.classList.remove('error');
  try{
   const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...Object.fromEntries(new FormData(form)),kind})});
   const result=await response.json();if(!response.ok)throw new Error(result.error||'Please try again.');
   form.reset();status.textContent=kind==='newsletter'?'You’re on the list. Thank you for staying connected with HOOD.':kind==='membership'?'Your interest is saved. HOOD can follow up when membership payments open. No payment has been collected.':'Thank you. Your submission has been saved for HOOD to review.';
  }catch(error){status.textContent=error.message||'We could not save your submission. Please try again shortly.';status.classList.add('error');}
  finally{button.disabled=false;button.textContent=label;}
 });
}

