// Slider
const slidesContainer = document.getElementById('slides');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let slideInterval = setInterval(nextSlide, 10000);

function goToSlide(index){
  slidesContainer.style.transform = `translateX(-${index*100}%)`;
  dots.forEach(d=>d.classList.remove('active'));
  dots[index].classList.add('active');
  currentIndex = index;
}

function nextSlide(){goToSlide((currentIndex+1)%slides.length);}
function prevSlide(){goToSlide((currentIndex-1+slides.length)%slides.length);}

dots.forEach(dot=>{
  dot.addEventListener('click',()=>{
    clearInterval(slideInterval);
    goToSlide(parseInt(dot.dataset.index));
    slideInterval = setInterval(nextSlide,10000);
  });
});

document.querySelector('.prev')?.addEventListener('click',()=>{
  clearInterval(slideInterval);
  prevSlide();
  slideInterval = setInterval(nextSlide,10000);
});
document.querySelector('.next')?.addEventListener('click',()=>{
  clearInterval(slideInterval);
  nextSlide();
  slideInterval = setInterval(nextSlide,10000);
});

goToSlide(0);

// Reveal-on-scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
  });
},{threshold:.2});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
