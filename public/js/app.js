'use strict';

let barIcon = document.getElementById('barIcon');
let nav = document.getElementById('nav');
barIcon.addEventListener('click', function(e){
  e.preventDefault();
  if(nav.style.opacity == 0){
    nav.style.visibility = 'visible';
    nav.style.opacity = 0.8;
  }else{
    nav.style.visibility = 'hidden';
    nav.style.opacity = 0;
  }
});
