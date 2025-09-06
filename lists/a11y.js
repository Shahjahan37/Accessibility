console.log("accessible lists");

document.querySelector(".container").setAttribute("role", "list");
document.querySelectorAll(".container > div").forEach(el => {
  el.setAttribute("role", "listitem");
});
