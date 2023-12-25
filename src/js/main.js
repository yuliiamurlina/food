"use strict";

import tabs from "./modules/tabs";
import timer from "./modules/timer";
import modal from "./modules/modal";
import cards from "./modules/cards";
import form from "./modules/form";
import slider from "./modules/slider";
import calc from "./modules/calc";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => openModal(".modal"), 8000);
  tabs();
  timer();
  modal("[data-modal]", ".modal");
  cards();
  form(modalTimerId);
  slider();
  calc();
});
