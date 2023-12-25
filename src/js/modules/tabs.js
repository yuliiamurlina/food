function tabs(
  tabsSelector,
  tabsContentSelector,
  tabParentSelector,
  activeClass
) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabParent = document.querySelector(tabParentSelector);

  function hideTabContent() {
    tabsContent.forEach((el) => {
      el.classList.add("hide");
      el.classList.remove("fade", "show");
    });

    tabs.forEach((el) => {
      el.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();
  tabParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
export default tabs;
