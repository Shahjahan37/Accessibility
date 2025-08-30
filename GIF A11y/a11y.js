const img = document.getElementById("mapImage");
const btn = document.getElementById("toggleBtn");
const icon = document.getElementById("btnIcon");

let isPlaying = false;

btn.addEventListener("click", () => {
  if (isPlaying) {
    img.src = img.dataset.png;
    btn.setAttribute("aria-label", "Play");
    icon.textContent = "▶";
  } else {
    img.src = img.dataset.gif;
    btn.setAttribute("aria-label", "Pause");
    icon.textContent = "⏸";
  }
  isPlaying = !isPlaying;
});
