window.addEventListener('load',function(){
    var goTopBtn = document.querySelector('.back_to_top');
    window.addEventListener('scroll', trackScroll);
    goTopBtn.addEventListener('click', backToTop);
    function trackScroll() {
        var scrolled = window.pageYOffset;
        var coords = document.documentElement.clientHeight;
    
        if (scrolled > coords) {
          goTopBtn.classList.add('shown');
        }
        if (scrolled < coords) {
          goTopBtn.classList.remove('shown');
        }
       
    
    
    
      }
    
      function backToTop() {
        if (window.pageYOffset > 0) {
          window.scrollBy(0, -80);
          setTimeout(backToTop, 0);
        }
      }
})


