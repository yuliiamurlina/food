function openModal(modalSelector, modalTimerId, wasModalOpened) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show", "fade");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
  return (wasModalOpened = true);
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove("show", "fade");
  modal.classList.add("hide");
  document.body.style.overflow = "";
}

function modal(buttonSelector, modalSelector, modalTimerId) {
  const buttonModals = document.querySelectorAll(buttonSelector),
    modal = document.querySelector(modalSelector);
  let wasModalOpened = false;

  buttonModals.forEach((button) => {
    button.addEventListener("click", () => openModal(modalSelector));
  });

  modal.addEventListener("click", (event) => {
    if (
      event.target == modal ||
      event.target.getAttribute("data-modalclose") == ""
    ) {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  //Вызов модального окна при прокрутке страницы

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 1 &&
      wasModalOpened == false
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { openModal, closeModal };
