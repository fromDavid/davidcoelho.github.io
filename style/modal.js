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