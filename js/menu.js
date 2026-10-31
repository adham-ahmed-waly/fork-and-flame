"use strict";

const menuSearch = document.querySelector("#menu-search");
const categoryButtons = document.querySelectorAll(".category-filter");
const menuCards = document.querySelectorAll(".menu-card");
const menuResults = document.querySelector("#menu-results");

let selectedCategory = "all";

function filterMenu() {
  const searchTerm = menuSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  menuCards.forEach(function (card) {
    const name = card.querySelector("h2").textContent.toLowerCase();
    const description = card
      .querySelector(".description")
      .textContent.toLowerCase();
    const category = card.dataset.category;
    const matchesSearch =
      name.includes(searchTerm) || description.includes(searchTerm);
    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;
    const shouldShow = matchesSearch && matchesCategory;

    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount += 1;
    }
  });

  if (visibleCount === 0) {
    menuResults.textContent = "No menu items found. Try another search.";
  } else {
    menuResults.textContent = `${visibleCount} item${visibleCount === 1 ? "" : "s"} found`;
  }
}

menuSearch.addEventListener("input", filterMenu);

categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedCategory = button.dataset.category;

    categoryButtons.forEach(function (categoryButton) {
      const isActive = categoryButton === button;
      categoryButton.classList.toggle("active", isActive);
      categoryButton.setAttribute("aria-pressed", String(isActive));
    });

    filterMenu();
  });
});

document.querySelectorAll(".add-to-cart").forEach(function (button) {
  button.addEventListener("click", function () {
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    if (!id || !name || !Number.isFinite(price) || price < 0) {
      return;
    }

    addToCart(id, name, price);
  });
});

filterMenu();
