function announce(message) {
  const sr = document.getElementById("sr-announcement");
  sr.textContent = "";

  setTimeout(() => {
    sr.textContent = message;
  }, 50);

  setTimeout(() => {
    sr.textContent = "";
  }, 2000);
}

document.getElementById("announceBtn").addEventListener("click", () => {
  const input = document.getElementById("userInput");
  const value = input.value.trim();

  if (value) {
    announce(`You entered: ${value}`);
  } else {
    announce("No text entered");
  }
});
