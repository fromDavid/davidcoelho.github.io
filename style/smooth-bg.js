
gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".container-tg"),
  smooth: true
});

ScrollTrigger.scrollerProxy(".container-tg", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, 
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector(".container-tg").style.transform ? "transform" : "fixed"
});


gsap.to("body", {
  "--color": "blue",
  immediateRender: false,
  scrollTrigger: {
    trigger: ".section-1",
    scroller: ".container-tg",
    scrub: true,
    start:'top bottom',
    end: '+=100%'
  }
});

gsap.to("body", {
  "--color": "red",
  immediateRender: false,
  scrollTrigger: {
    trigger: ".section-2",
    scroller: ".container-tg",
    scrub: true,
    start:'top bottom',
    end: '+=100%'
  }
});

gsap.to("body", {
  "--color": "green",
  immediateRender: false,
  scrollTrigger: {
    trigger: ".section-3",
    scroller: ".container-tg",
    scrub: true,
    start:'top bottom',
    end: '+=100%'  
  }
});



locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();