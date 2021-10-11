// ------------------- dropdown ----------------------
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".dropdown-trigger");
  var instances = M.Dropdown.init(elems);
});

const reduceCardTitle = () => {
  const cardTitleEls = document.querySelectorAll(".card-title");
  for (const cardTitle of cardTitleEls) {
    if (cardTitle.textContent.length >= 40)
      cardTitle.textContent = cardTitle.textContent.slice(0, 40) + "...";
  }
};

const reduceCardBrief = () => {
  const cardBriefEls = document.querySelectorAll(".card-brief");
  for (const cardBrief of cardBriefEls) {
    if (cardBrief.textContent.length >= 100)
      cardBrief.textContent = cardBrief.textContent.slice(0, 100) + "...";
  }
};
reduceCardTitle();
reduceCardBrief();
