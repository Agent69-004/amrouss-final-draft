window.addEventListener('load',()=>document.querySelector('.loader').classList.add('done'));
const toast=document.querySelector('.toast');
function notify(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3500)}
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();notify(f.id?'Availability request received — select your preferred room to continue.':'Thank you for joining our mountain letters.')}));
document.querySelectorAll('[data-view]').forEach(el=>el.addEventListener('click',()=>{const admin=el.dataset.view==='admin';document.querySelector('#site').classList.toggle('hidden',admin);document.querySelector('#admin').classList.toggle('hidden',!admin);document.querySelector('header').classList.toggle('hidden',admin);document.querySelector('footer').classList.toggle('hidden',admin);window.scrollTo(0,0)}));
