const header = document.querySelector(".header");
const navbar = document.querySelector('.nav');
const allSections = document.querySelectorAll('.section');

btnScrollTo.addEventListener('click',function(){
    section1.scrollIntoView({behavior:'smooth'});
  })
  const navlinks = document.querySelectorAll('.nav__link');
  for(let i=0;i<3;i++){
    navlinks[i].addEventListener('click',function(e){
      e.preventDefault();
      const id = this.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior:"smooth"});
    })
  }

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
