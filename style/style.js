window.addEventListener('scroll', function() {
    const header = document.querySelector('.zoom-header');
    const photoBox = document.querySelector('.photo-box');
    const photoBox1 = document.querySelector('.photo-box-2');
    const photoBox2 = document.querySelector('.photo-box-3');
    const headerContent = document.querySelector('.header-content');
    const line = document.querySelector('.scroll-line');
    const scrollPosition = window.scrollY;
    
    let photoBoxPosition = 0 + scrollPosition * 0.01;
    
    const maxTranslate = 18; // Maximum translation in vh
      if (photoBoxPosition > maxTranslate) {
          photoBoxPosition = maxTranslate;
      }
  
    photoBox.style.transform = `translate(0, ${photoBoxPosition}vh)`;
    
    let photoBoxPosition1 = 0 + scrollPosition * 0.01;
    
    const maxTranslate1 = 25; // Maximum translation in vh
      if (photoBoxPosition1 > maxTranslate1) {
          photoBoxPosition1 = maxTranslate1;
      }
  
    photoBox1.style.transform = `translate(0, ${photoBoxPosition1}vh)`;
  
  
    let photoBoxPosition2 = 0 - scrollPosition * 0.01;
    
    const maxTranslate2 = 18; // Maximum translation in vh
      if (photoBoxPosition2 > maxTranslate2) {
          photoBoxPosition2 = maxTranslate2;
      }
  
    photoBox2.style.transform = `translate(0, ${photoBoxPosition2}vh)`;
  
    // Efeito Zoom no background header
    header.style.setProperty('--scale-value', 1 + scrollPosition * 0.0004);
  
    // Efeito parallax no texto do header
    const headerContentPosition = 0 + scrollPosition * 0.1;
    headerContent.style.transform = `translateY(${headerContentPosition}px)`;
  });

  const [red, green, blue] = [244, 244, 244]
  const section1 = document.querySelector('.section-color')
  
  window.addEventListener('scroll', () => {
    const y = 1 + (window.scrollY || window.pageYOffset) / 150
    const [r, g, b] = [red/y, green/y, blue/y].map(Math.round)
    section1.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  })