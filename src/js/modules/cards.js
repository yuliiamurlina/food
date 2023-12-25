function cards() {
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
}

export default cards;
