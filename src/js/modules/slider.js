function slider() {
  const slider = document.querySelector(".offer__slider"),
    prevButton = slider.querySelector(".offer__slider-prev"),
    nextButton = slider.querySelector(".offer__slider-next"),
    slides = slider.querySelectorAll(".offer__slide"),
    total = slider.querySelector("#total"),
    current = slider.querySelector("#current"),
    slidesWrapper = slider.querySelector(".offer__slider-wrapper"),
    slidesInner = slidesWrapper.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesInner.style.width = 100 * slides.length + "%";
  slidesInner.style.display = "flex";
  slidesInner.style.transition = ".5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => (slide.style.width = width));

  slider.style.position = "relative";

  function checkCurrentPosition() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function setDot() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  function cutNotNumbers(str) {
    return +str.replace(/\D/g, "");
  }

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    dots.push(dot);

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
  }

  nextButton.addEventListener("click", () => {
    if (offset == cutNotNumbers(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += cutNotNumbers(width);
    }
    slidesInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    checkCurrentPosition();

    setDot();
  });

  prevButton.addEventListener("click", () => {
    if (offset == 0) {
      offset = cutNotNumbers(width) * (slides.length - 1);
    } else {
      offset -= cutNotNumbers(width);
    }
    slidesInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    checkCurrentPosition();
    setDot();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = cutNotNumbers(width) * (slideTo - 1);
      slidesInner.style.transform = `translateX(-${offset}px)`;
      setDot();
      checkCurrentPosition();
    });
  });

  /* FIRST OPTION
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }

  showSlide(slideIndex);

  function showSlide(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => {
      item.style.display = "none";
    });

    slides[slideIndex - 1].style.display = "block";

    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function plusSlide(n) {
    showSlide((slideIndex += n));
  }

  prevButton.addEventListener("click", () => plusSlide(-1));
  nextButton.addEventListener("click", () => plusSlide(1));
  */
}

export default slider;
