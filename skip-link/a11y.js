// document.addEventListener("DOMContentLoaded", () => {
//   const skipLink = document.createElement("a");
//   skipLink.href = "#main";
//   skipLink.textContent = "Skip to main content";
//   skipLink.className = "skip-link";

//   document.body.insertBefore(skipLink, document.body.firstChild);
// });

$(document).ready(function () {
  $("body").prepend('<a href="#main" class="skip-link">Skip to main content</a>');
});