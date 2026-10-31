"use strict";

const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  contactStatus.textContent = "";
  contactStatus.classList.remove("success");

  const nameValid = requiredText(contactForm.elements.name, "Name", 2);
  const emailValue = contactForm.elements.email.value.trim();
  const emailValid = EMAIL_PATTERN.test(emailValue);
  const messageValid = requiredText(
    contactForm.elements.message,
    "Message",
    10,
  );

  setFieldError(
    contactForm.elements.email,
    emailValid ? "" : "Enter a valid email address.",
  );

  if (!nameValid || !emailValid || !messageValid) {
    return;
  }

  contactForm.reset();
  contactStatus.classList.add("success");
  contactStatus.textContent = "Thanks. Your message was recorded in this demo.";
});
