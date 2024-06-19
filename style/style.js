window.addEventListener('scroll', function() {
    const header = document.querySelector('.zoom-header');
    const photoBox = document.querySelector('.photo-box');
    const photoBox1 = document.querySelector('.photo-box-2');
    const photoBox2 = document.querySelector('.photo-box-3');
    const headerContent = document.querySelector('.header-content');
    const panel = document.querySelector('.panel');
    const line = document.querySelector('.scroll-line');
    const scrollPosition = window.scrollY;
    
    //Photo Box 1
    let photoBoxPosition = 0 + scrollPosition * 0.01;
    
    const maxTranslate = 18; // Maximum translation in vh
      if (photoBoxPosition > maxTranslate) {
          photoBoxPosition = maxTranslate;
      }
  
    photoBox.style.transform = `translate(0, ${photoBoxPosition}vh)`;
    
    //Photo Box 2
    let photoBoxPosition1 = 0 + scrollPosition * 0.01;
    
    const maxTranslate1 = 25; // Maximum translation in vh
      if (photoBoxPosition1 > maxTranslate1) {
          photoBoxPosition1 = maxTranslate1;
      }
  
    photoBox1.style.transform = `translate(0, ${photoBoxPosition1}vh)`;
  
    //Photo Box 3
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

  // Mouse houver event

var langmodal = document.querySelectorAll('#ModalToggle');

langmodal.forEach(function(item) {
    window.onload = () => {
        const myModal = new bootstrap.Modal('#ModalToggle');
        myModal.show();
    }
});

var modalhover = document.querySelectorAll('#ModalToggle li');

var elementosComuns = document.querySelectorAll('.modal-body li a');

// Adiciona ou remove uma classe com base no evento de hover para ambos os elementos
elementosComuns.forEach(function(elemento) {
  elemento.addEventListener('mouseenter', function() {
        elementosComuns.forEach(function(outroElemento) {
        outroElemento.classList.remove('active-styled-1');
    });
  });

  elemento.addEventListener('mouseleave', function() {
    elementosComuns.forEach(function(outroElemento) {
      outroElemento.classList.add('active-styled-1');
      outroElemento.classList.add('modal-body li a');
    });
  });
});