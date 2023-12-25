import { openModal, closeModal } from "./modal";

function form(modalTimerId) {
  const forms = document.querySelectorAll("form"),
    message = {
      success: "Спасибо! Скоро мы с вами свяжемся!",
      fail: "Произошла ошибка",
      loading: "img/spinner.svg",
    };

  $("input[name=phone]").mask("+38 (999) 999-99-99");

  forms.forEach((item) => {
    item.addEventListener("input", () => {
      const input = document.querySelector(".form-name");
      let valid = true;
      const err = item.querySelector(".name_error");
      err.style.color = "red";

      if (/\d/.test(input.value)) {
        err.textContent = "Имя не должно содержать цифры";
        valid = false;
      }

      if (input.value.length <= 1) {
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
    openModal(".modal", modalTimerId);

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
      closeModal(".modal");
    }, 4000);
  }
}

export default form;
