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
    className: "slider__button slider__button--prev",
  });

  const nextButton = createElement({
    tagName: "button",
    className: "slider__button slider__button--next",
  });

  const prevIcon = createElement({
    tagName: "i",
    className: "fa-solid fa-arrow-left",
  });

  const nextIcon = createElement({
    tagName: "i",
    className: "fa-solid fa-arrow-right",
  });

  prevButton.appendChild(prevIcon);
  nextButton.appendChild(nextIcon);

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

  let slideInterval = setInterval(nextSlide, 10000);

  slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
  slider.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 10000);
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
  const centerBlock = document.querySelector(".contact-info__block.avatar");

  const existingImage = centerBlock.querySelector("img");
  if (existingImage) {
    existingImage.remove();
  }

  centerBlock.appendChild(slider);
};

document.addEventListener("DOMContentLoaded", initSlider);
