const buttons = document.querySelectorAll(".card__dropdown-btn");

buttons.forEach(function (button) {
  const div = button.closest("div");
  const elements = div.querySelectorAll("p, section");
  elements.forEach((el) => el.classList.add("card__hidden-content--hidden"));

  button.addEventListener("click", function () {
    elements.forEach((el) =>
      el.classList.toggle("card__hidden-content--hidden")
    );
  });
});
