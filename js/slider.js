const createSlider = (images) => {
    const slider = createElement({ tagName: "div", className: "slider" });
    const container = createElement({
      tagName: "div",
      className: "slider__container",
    });
    const controls = createElement({
      tagName: "div",
      className: "slider__controls",
    });
    const dots = createElement({ tagName: "div", className: "slider__dots" });
  
    images.forEach((image, index) => {
      const slide = createElement({ tagName: "div", className: "slider__slide" });
      const img = createElement({ tagName: "img" });
      img.src = image;
      img.alt = `Slide ${index + 1}`;
      slide.appendChild(img);
      container.appendChild(slide);
  
      const dot = createElement({ tagName: "div", className: "slider__dot" });
      dot.dataset.index = index;
      dots.appendChild(dot);
    });
  
    const prevButton = createElement({
      tagName: "button",
      className: "slider__button",
    });
    prevButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
      </svg>
    `;
  
    const nextButton = createElement({
      tagName: "button",
      className: "slider__button",
    });
    nextButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
      </svg>
    `;
  
    controls.appendChild(prevButton);
    controls.appendChild(nextButton);
  
    slider.appendChild(container);
    slider.appendChild(controls);
    slider.appendChild(dots);
  
    let currentSlide = 0;
    const slides = container.querySelectorAll(".slider__slide");
    const dotElements = dots.querySelectorAll(".slider__dot");
  
    const showSlide = (index) => {
      slides.forEach((slide) => slide.classList.remove("active"));
      dotElements.forEach((dot) => dot.classList.remove("active"));
  
      slides[index].classList.add("active");
      dotElements[index].classList.add("active");
      currentSlide = index;
    };
  
    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };
  
    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    };
  
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);
  
    dotElements.forEach((dot, index) => {
      dot.addEventListener("click", () => showSlide(index));
    });
  
    let slideInterval = setInterval(nextSlide, 5000);
  
    slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
    slider.addEventListener("mouseleave", () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
  
    showSlide(0);
  
    return slider;
  };
  
  const initSlider = () => {
    const images = [
      "assets/img/avatar.jpg",
      "assets/img/avatar2.jpg",
      "assets/img/avatar3.jpg",
      "assets/img/avatar4.jpg",
      "assets/img/avatar5.jpg",
    ];
  
    const slider = createSlider(images);
    const centerBlock = document.querySelector(".contact-info__block--center");
  
    const existingImage = centerBlock.querySelector("img");
    if (existingImage) {
      existingImage.remove();
    }
  
    centerBlock.appendChild(slider);
  };
  
  document.addEventListener("DOMContentLoaded", initSlider);
  