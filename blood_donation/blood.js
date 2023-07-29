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


// Finishing
document.addEventListener('DOMContentLoaded',function(){
  console.log('loaded');
})

const bposper = document.querySelector(".bposper");
const aposper = document.querySelector(".aposper");
const anegper = document.querySelector(".anegper");
const oposper = document.querySelector(".oposper");
const onegper = document.querySelector(".onegper");
const abposper = document.querySelector(".abposper");
const bpos = document.querySelector(".bpos");
const apos = document.querySelector(".apos");
const aneg = document.querySelector(".aneg");
const opos = document.querySelector(".opos");
const oneg = document.querySelector(".oneg");
const abpos = document.querySelector(".abpos");


bposper.textContent = `${(parseInt(getComputedStyle(bpos).width)/579.75*100).toFixed(0)} % `;
aposper.textContent = `${(parseInt(getComputedStyle(apos).width)/579.75*100).toFixed(0)} % `;
anegper.textContent = `${(parseInt(getComputedStyle(aneg).width)/579.75*100).toFixed(0)} % `;
// oposper.textContent = `${(parseInt(getComputedStyle(opos).width)/579.75*100).toFixed(0)} % `;
onegper.textContent = `${(parseInt(getComputedStyle(oneg).width)/579.75*100).toFixed(0)} % `;
abposper.textContent = `${(parseInt(getComputedStyle(abpos).width)/579.75*100).toFixed(0)} % `;



