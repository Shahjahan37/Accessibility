// console.log("focus trap");

function createPopup(id, options) {
  let popupNode = document.querySelector(id);
  let overlay = popupNode.querySelector(".overlay");
  let closeBtn = popupNode.querySelector(".close-btn");
  let content = popupNode.querySelector(".popup-content");
  // console.log("elementToFocus: ", options);

  function openPopup() {
    popupNode.classList.add("active");
    // const focusables = content.querySelectorAll(
    //   'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    // );
    // const firstFocus = focusables.length > 0 ? focusables[0] : content;
    trapFocus(content, { elementToFocus: content.querySelector(".close-btn") });
  }

  function closePopup() {
    popupNode.classList.remove("active");
    removeTrapFocus();
    document.querySelector(options.elementToFocus).focus();
    // document.getElementById("open-popup").focus();
  }

  overlay.addEventListener("click", closePopup);
  closeBtn.addEventListener("click", closePopup);
  return openPopup;
}

let popup = createPopup("#popup", { elementToFocus: "#open-popup" });
document.getElementById("open-popup").addEventListener("click", popup);

let newpopup = createPopup("#new-popup", { elementToFocus: "#open-popup2" });
document.getElementById("open-popup2").addEventListener("click", newpopup);