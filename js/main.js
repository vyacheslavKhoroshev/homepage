const mainTabButtons = document.querySelectorAll(
  'button[data-tab-type="primary"]'
);
const mainTabPanels = document.querySelectorAll('div[data-tab-type="primary"]');
const skillsTabButtons = document.querySelectorAll(
  'button[data-tab-type="secondary"]'
);
const skillsTabPanels = document.querySelectorAll(
  'div[data-tab-type="secondary"]'
);

const setupTabs = (buttons, panels) => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");

      buttons.forEach((btn) => btn.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(tabId).classList.add("active");

      if (tabId === "skills") {
        const isNotActive = !document.querySelector(".tabs__button.active");
        if (isNotActive) {
          buttons[0].classList.add("active");
          panels[0].classList.add("active");
        }
      }
    });
  });
};
setupTabs(mainTabButtons, mainTabPanels);
setupTabs(skillsTabButtons, skillsTabPanels);
