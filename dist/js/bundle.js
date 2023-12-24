/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/


window.addEventListener("DOMContentLoaded", () => {
  //Tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((el) => {
      el.classList.add("hide");
      el.classList.remove("fade", "show");
    });

    tabs.forEach((el) => {
      el.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();
  tabParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer
  const deadline = "2023-11-22T20:55";

  getTimeRemaining(deadline);

  setClock(".timer", deadline);

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    let days, hours, minutes, seconds;

    if (t <= 0) {
      (days = 0), (hours = 0), (minutes = 0), (seconds = 0);
    } else {
      (days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((t / (1000 * 60)) % 60)),
        (seconds = Math.floor((t / 1000) % 60));
    }

    return {
      total: t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(data) {
    return `${data >= 10 ? data : "0" + data}`;
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      minutes = timer.querySelector("#minutes"),
      hours = timer.querySelector("#hours"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  //Modal

  const buttonModals = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");
  let wasModalOpened = false;

  buttonModals.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  modal.addEventListener("click", (event) => {
    if (
      event.target == modal ||
      event.target.getAttribute("data-modalclose") == ""
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  function openModal() {
    modal.classList.add("show", "fade");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
    wasModalOpened = true;
  }

  function closeModal() {
    modal.classList.remove("show", "fade");
    modal.classList.add("hide");
    document.body.style.overflow = "";
  }

  //Вызов модального окна при прокрутке страницы
  const modalTimerId = setTimeout(openModal, 8000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 1 &&
      wasModalOpened == false
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  //Menu cards

  class Cards {
    constructor(img, alt, title, descr, price, parentSelector, ...classes) {
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.parent = document.querySelector(parentSelector);
      this.price = price;
      this.transfer = 28;
      this.changeToUAH();
      this.classes = classes;
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length == 0) {
        element.classList.add("menu__item");
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
        <img src="${this.img}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  const getData = async (url) => {
    const result = await fetch(url);
    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
    return await result.json();
  };

  // getData("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new Cards(img, altimg, title, descr, price, ".menu .container").render();
  //   });
  // });
  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new Cards(img, altimg, title, descr, price, ".menu .container").render();
    });
  });

  //Form

  const forms = document.querySelectorAll("form"),
    message = {
      success: "Спасибо! Скоро мы с вами свяжемся!",
      fail: "Произошла ошибка",
      loading: "img/spinner.svg",
    };

  $("input[name=phone]").mask("+38 (999) 999-99-99");

  forms.forEach((item) => {
    const input = document.querySelector(".form-name");
    input.addEventListener("input", (event) => {
      let valid = true;
      const err = item.querySelector(".name_error");
      err.style.color = "red";

      if (/\d/.test(input.value)) {
        err.textContent = "Имя не должно содержать цифры";
        valid = false;
      }

      if (input.value.length < 2) {
        err.textContent = "Минимальная длина имени - 2 символа";
        valid = false;
      }
      if (valid) {
        err.classList.add("hide");
        bindPostData(item);
      }
    });
  });

  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
    return await result.json();
  };

  async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  // */

  //Slider

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

  //Calc

  const resultCalc = document.querySelector(".calculating__result span");
  let sex, height, weight, age, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((elem) => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activeClass);
      }

      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      resultCalc.textContent = "X  ";
      return;
    }
    if (sex === "female") {
      resultCalc.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      resultCalc.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();

  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (elem.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }

        elements.forEach((elem) => elem.classList.remove(activeClass));
        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    const error = document.createElement("div");
    input.insertAdjacentElement("afterend", error);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "2px solid red";
        error.textContent = "Введите только числа";
        error.style.cssText = `font-size: 14px;
        color: red;`;
      } else {
        input.style.border = "none";
        error.textContent = "";
      }
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }
});

/******/ })()
;
//# sourceMappingURL=bundle.js.map