"use strict";

const cartItemsElement = document.querySelector("#cart-items");
const cartTotalElement = document.querySelector("#cart-total");
const clearCartButton = document.querySelector("#clear-cart");
const checkoutForm = document.querySelector("#checkout-form");
const checkoutError = document.querySelector("#checkout-error");

function renderCart() {
  cartItemsElement.replaceChildren();

  if (cart.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Your cart is empty.";
    cartItemsElement.appendChild(emptyMessage);
  }

  cart.forEach(function (item) {
    const row = document.createElement("div");
    row.className = "cart-item";

    const details = document.createElement("div");
    const name = document.createElement("p");
    name.className = "cart-item-name";
    name.textContent = item.name;

    const meta = document.createElement("p");
    meta.className = "cart-item-meta";
    meta.textContent = `${item.price} EGP each · ${item.price * item.quantity} EGP`;
    details.append(name, meta);

    const quantityControls = document.createElement("div");
    quantityControls.className = "qty-controls";

    const decreaseButton = document.createElement("button");
    decreaseButton.type = "button";
    decreaseButton.textContent = "−";
    decreaseButton.setAttribute("aria-label", `Decrease ${item.name}`);
    decreaseButton.dataset.action = "decrease";
    decreaseButton.dataset.id = item.id;

    const quantity = document.createElement("span");
    quantity.textContent = String(item.quantity);

    const increaseButton = document.createElement("button");
    increaseButton.type = "button";
    increaseButton.textContent = "+";
    increaseButton.setAttribute("aria-label", `Increase ${item.name}`);
    increaseButton.dataset.action = "increase";
    increaseButton.dataset.id = item.id;

    quantityControls.append(decreaseButton, quantity, increaseButton);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-from-cart";
    removeButton.textContent = "Remove";
    removeButton.dataset.action = "remove";
    removeButton.dataset.id = item.id;

    row.append(details, quantityControls, removeButton);
    cartItemsElement.appendChild(row);
  });

  cartTotalElement.textContent = `${cartTotal()} EGP`;
  updateCartCount();
  saveCart();
}

cartItemsElement.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const item = cart.find(function (cartItem) {
    return cartItem.id === button.dataset.id;
  });

  if (!item) {
    return;
  }

  if (button.dataset.action === "increase") {
    item.quantity += 1;
  } else if (button.dataset.action === "decrease") {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart = cart.filter(function (cartItem) {
        return cartItem.id !== item.id;
      });
    }
  } else if (button.dataset.action === "remove") {
    cart = cart.filter(function (cartItem) {
      return cartItem.id !== item.id;
    });
  }

  renderCart();
});

clearCartButton.addEventListener("click", function () {
  cart = [];
  renderCart();
  showToast("Cart cleared");
});

checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();
  checkoutError.textContent = "";
  checkoutError.classList.remove("success");

  const nameValid = requiredText(checkoutForm.elements.name, "Name", 2);
  const phoneValid = PHONE_PATTERN.test(
    checkoutForm.elements.phone.value.trim(),
  );
  const timeValid = Boolean(checkoutForm.elements.time.value);

  setFieldError(
    checkoutForm.elements.phone,
    phoneValid ? "" : "Enter a valid phone number.",
  );
  setFieldError(
    checkoutForm.elements.time,
    timeValid ? "" : "Choose a pickup time.",
  );

  if (!nameValid || !phoneValid || !timeValid) {
    return;
  }

  if (cart.length === 0) {
    checkoutError.textContent =
      "Add at least one item before placing an order.";
    return;
  }

  const orderTotal = cartTotal();
  cart = [];
  renderCart();
  checkoutForm.reset();
  checkoutError.classList.add("success");
  checkoutError.textContent = `Order placed for ${orderTotal} EGP. We will have it ready for pickup.`;
  showToast("Order placed");
});

renderCart();
