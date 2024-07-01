const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const images = imageList.querySelectorAll(".image-item");
    const imageCount = images.length;
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
    const scrollAmount = imageList.clientWidth;
    let currentIndex = 0;
    let autoSlideInterval;
  
    const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * maxThumbPosition;
      scrollbarThumb.style.left = `${thumbPosition}px`;
    };
  
    const handleAutoSlide = () => {
      if (currentIndex >= imageCount) {
        currentIndex = 0;
      }
      const newScrollPosition = scrollAmount * currentIndex;
      imageList.scrollTo({ left: newScrollPosition, behavior: "smooth" });
      currentIndex++;
      updateScrollThumbPosition();
    };
  
    const startAutoSlide = () => {
      autoSlideInterval = setInterval(handleAutoSlide, 2000);
    };
  
    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
    };
  
    scrollbarThumb.addEventListener("mousedown", (e) => {
      stopAutoSlide();
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
  
      const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;
        const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
        const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
  
        scrollbarThumb.style.left = `${boundedPosition}px`;
        imageList.scrollLeft = scrollPosition;
      };
  
      const handleMouseUp = () => {
        startAutoSlide();
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
  
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });
  
    imageList.addEventListener("scroll", updateScrollThumbPosition);
  
    window.addEventListener("resize", () => {
      stopAutoSlide();
      startAutoSlide();
    });
  
    startAutoSlide();
  };
  
  window.addEventListener("load", initSlider);
  
  let mybutton = document.getElementById("scrollToTopBtn");

  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          mybutton.style.display = "block";
      } else {
          mybutton.style.display = "none";
      }
  }
  
  mybutton.onclick = function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  }