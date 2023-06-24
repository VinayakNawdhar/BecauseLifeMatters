'use strict';
window.addEventListener('load',function(){
  document.querySelector(".preloader").style.display = "none";
  document.querySelector(".preloader-container").style.display = "none";
})
// Modal Window
const header = document.querySelector(".header");
const section1 = document.querySelector('#section--1');
const navbar = document.querySelector('.nav');


//navigation bar animation
const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if(el !== link){
        el.style.opacity = this;
      }
    });
    logo.style.opacity =this;
  }
};

navbar.addEventListener('mouseover',handleHover.bind(0.2));
navbar.addEventListener('mouseout', handleHover.bind(1));
const obsCallback = function(entries,observer){
  const [entry] = entries;
  if(!entry.isIntersecting){
    navbar.classList.add('sticky');
  }else{
    navbar.classList.remove('sticky');
  }
}
const obsOption = {
  root : null,
  threshold : [0],
  rootMargin : '-90px'
}
const observer = new IntersectionObserver(obsCallback,obsOption);
observer.observe(header);

// Finishing
document.addEventListener('DOMContentLoaded',function(){
  console.log('loaded');
})

