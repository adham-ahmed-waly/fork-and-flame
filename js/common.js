"use strict";

const STORAGE_KEY = "forkFlameCart";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\s()-]{8,}$/;

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
const cartCountElement = document.querySelector("#cart-count");
const toast = document.querySelector("#toast");

let cart = loadCart();
let toastTimer;

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!Array.isArray(savedCart)) {
      return [];
    }

    return savedCart.filter(function (item) {
      return (
        item &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        Number.isFinite(item.price) &&
        Number.isInteger(item.quantity) &&
        item.price >= 0 &&
        item.quantity > 0
      );
    });
  } catch (error) {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function cartQuantity() {
  return cart.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);
}

function cartTotal() {
  return cart.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);
}

function updateCartCount() {
  if (cartCountElement) {
    cartCountElement.textContent = String(cartQuantity());
  }
}

function showToast(message) {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}

function setFieldError(field, message) {
  const error = document.querySelector(`[data-error-for="${field.id}"]`);
  field.classList.toggle("invalid", Boolean(message));
  if (error) {
    error.textContent = message;
  }
}

function requiredText(field, label, minLength) {
  const value = field.value.trim();

  if (!value) {
    setFieldError(field, `${label} is required.`);
    return false;
  }

  if (value.length < minLength) {
    setFieldError(field, `${label} is too short.`);
    return false;
  }

  setFieldError(field, "");
  return true;
}

function addToCart(id, name, price) {
  const existingItem = cart.find(function (item) {
    return item.id === id;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: 1,
    });
  }

  saveCart();
  updateCartCount();
  showToast(`${name} added to cart`);
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", function () {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

updateCartCount();
