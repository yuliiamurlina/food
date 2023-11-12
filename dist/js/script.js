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
    tabsContent.forEach(el => {
      el.classList.add("hide");
      el.classList.remove("fade", "show");
    });
    tabs.forEach(el => {
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
  tabParent.addEventListener("click", event => {
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
      days = 0, hours = 0, minutes = 0, seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)), hours = Math.floor(t / (1000 * 60 * 60) % 24), minutes = Math.floor(t / (1000 * 60) % 60), seconds = Math.floor(t / 1000 % 60);
    }
    return {
      total: t,
      days,
      hours,
      minutes,
      seconds
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
  buttonModals.forEach(button => {
    button.addEventListener("click", openModal);
  });
  modal.addEventListener("click", event => {
    if (event.target == modal || event.target.getAttribute("data-modalclose") == "") {
      closeModal();
    }
  });
  document.addEventListener("keydown", event => {
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
    err.remove();
  }
  function closeModal() {
    modal.classList.remove("show", "fade");
    modal.classList.add("hide");
    document.body.style.overflow = "";
  }

  //Вызов модального окна при прокрутке страницы
  const modalTimerId = setTimeout(openModal, 5000);
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1 && wasModalOpened == false) {
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
        this.classes.forEach(className => element.classList.add(className));
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
  new Cards("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 7, ".menu__field .container").render();
  new Cards("img/tabs/elite.jpg", "meal", "Меню “Премиум”", "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!", 15, ".menu__field .container").render();
  new Cards("img/tabs/post.jpg", "meat", 'Меню "Постное"', "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.", 9, ".menu__field .container").render();

  //Form

  const forms = document.querySelectorAll("form"),
    message = {
      success: "Спасибо! Скоро мы с вами свяжемся",
      fail: "Произошла ошибка",
      loading: "img/spinner.svg"
    },
    err = document.createElement("div");
  let isErrorValidationMessage = false;
  forms.forEach(item => {
    item.addEventListener("submit", event => {
      event.preventDefault();
      let error = validation(item);
      if (error === 0) {
        postData(item);
        // setTimeout(item.submit, 2000);
      }
    });
  });

  $("input[name=phone]").mask("+38 (999) 999-99-99");
  function validation(form) {
    let error = 0;
    const field = form.querySelectorAll(".modal__input");
    for (let i = 0; i < field.length; i++) {
      const input = field[i];
      removeValidationError(input);
      if (input.classList.contains("name")) {
        if (input.value.trim().length < 2 || /\d/.test(input.value)) {
          getValidationError(input, "Имя пользователя слишком короткое или содержит цифры");
          error++;
        } else {
          removeValidationError(input);
        }
      }
      if (input.classList.contains("phone")) {
        if (input.value.trim().length < 10 || input.value.trim().length > 13 || /[A-Z]/i.test(input.value)) {
          getValidationError(input, "Телефон введен в некорректном формате");
          error++;
        }
      }
      return error;
    }
  }
  function getValidationError(input, message) {
    input.classList.add("invalid");
    if (isErrorValidationMessage === false) {
      err.textContent = message;
      err.style.color = "red";
      input.after(err);
    } else {
      err.remove();
    }
    isErrorValidationMessage = true;
  }
  function removeValidationError(input) {
    input.classList.remove("invalid");
  }

  //Функция для отправки формы
  function postData(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);
      const request = new XMLHttpRequest();
      request.open("POST", "../server.php");
      request.setRequestHeader("Content-type", "application/json; charset=utf-8");
      const formData = new FormData(form);
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      request.send(JSON.stringify(object));
      request.addEventListener("load", () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(message.success);
          statusMessage.remove();
          form.reset();
        } else {
          showThanksModal(message.fail);
        }
      });
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
});
/******/ })()
;
//# sourceMappingURL=script.js.map