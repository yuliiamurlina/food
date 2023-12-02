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
      success: "Спасибо! Скоро мы с вами свяжемся",
      fail: "Произошла ошибка",
      loading: "img/spinner.svg",
    };

  $("input[name=phone]").mask("+38 (999) 999-99-99");

  forms.forEach((item) => {
    item.addEventListener("submit", (event) => {
      event.preventDefault();

      let valid = true;
      const name = item.querySelector(".name"),
        err = item.querySelector(".name_error");

      err.style.color = "red";
      err.classList.add("hide");

      if (/\d/.test(name.value)) {
        err.textContent = "Имя не должно содержать цифры";
        err.classList.remove("hide");
        valid = false;
      }

      if (name.value.length < 2) {
        err.textContent = "Минимальная длина имени - 2 символа";
        err.classList.remove("hide");
        valid = false;
      }
      if (valid) {
        bindpostData(item);
      }
    });
  });

  //Функция для отправки формы

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

  function bindpostData(form) {
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

        statusMessage.remove();
        showThanksModal(message.success);
      })
      .catch(() => {
        showThanksModal(message.fail);
      })
      .finally(() => {
        form.reset();
      });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog"),
      thanks = document.querySelector(".thanks");
    prevModalDialog.classList.add("hide");

    thanks.innerHTML = `
      <div class="modal__content">
          <div class="modal__close" data-modalclose>×</div>
          <div class="modal__title">${message}</div>
      </div>
    `;

    thanks.classList.add("show", "fade");
    thanks.classList.remove("hide");

    setTimeout(() => {
      thanks.classList.add("hide");
      thanks.classList.remove("fade", "show");
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 2000);
  }

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

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      resultCalc.textContent = "_____";
      return;
    }

    if (sex === "female") {
      resultCalc.textContent =
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio;
    } else {
      resultCalc.textContent =
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio;
    }
  }

  calcTotal();

  function getStaticInformation() {}
});

/******/ })()
;
//# sourceMappingURL=bundle.js.map