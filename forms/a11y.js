(function () {
  const form = document.getElementById("signupForm");
  const firstName = document.getElementById("firstName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const pwdToggle = document.getElementById("togglePwd");
  const pwdStrengthVal = document.getElementById("pwdStrengthVal");
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  // Toggle password visibility
  pwdToggle.addEventListener("click", () => {
    const isPressed = pwdToggle.getAttribute("aria-pressed") === "true";
    pwdToggle.setAttribute("aria-pressed", String(!isPressed));
    if (isPressed) {
      password.type = "password";
      pwdToggle.textContent = "Show";
      pwdToggle.setAttribute("aria-label", "Show password");
    } else {
      password.type = "text";
      pwdToggle.textContent = "Hide";
      pwdToggle.setAttribute("aria-label", "Hide password");
    }
  });

  // Password strength
  password.addEventListener("input", () => {
    const val = password.value;
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    const labels = ["Too weak", "Weak", "Fair", "Strong", "Very strong"];
    pwdStrengthVal.textContent = labels[score];
    document
      .getElementById("passwordStrength")
      .setAttribute("aria-hidden", "false");
  });

  function showError(input, msg) {
    const errEl = document.getElementById(input.id + "Error");
    if (!errEl) return;
    input.classList.add("error");
    errEl.textContent = msg;
    input.setAttribute("aria-invalid", "true");
  }

  function clearError(input) {
    const errEl = document.getElementById(input.id + "Error");
    if (!errEl) return;
    input.classList.remove("error");
    errEl.textContent = "";
    input.removeAttribute("aria-invalid");
  }

  function validateField(input) {
    clearError(input);
    if (input.required && !input.value.trim()) {
      showError(input, "This field is required.");
      return false;
    }
    if (input.type === "email" && input.value) {
      const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!re.test(input.value)) {
        showError(input, "Please enter a valid email address.");
        return false;
      }
    }
    if (input.id === "password" && input.value) {
      if (input.value.length < 8) {
        showError(input, "Password must be at least 8 characters.");
        return false;
      }
    }
    return true;
  }

  [firstName, email, password].forEach((el) => {
    if (el) el.addEventListener("blur", () => validateField(el));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "";
    [firstName, email, password].forEach(clearError);

    let valid = true;
    if (!validateField(firstName)) valid = false;
    if (!validateField(email)) valid = false;
    if (!validateField(password)) valid = false;

    const terms = document.getElementById("terms");
    const termsError = document.getElementById("termsError");
    if (terms && termsError) {
      termsError.textContent = "";
      if (terms.required && !terms.checked) {
        termsError.textContent = "You must accept terms to continue.";
        terms.focus();
        valid = false;
      }
    }

    if (!valid) {
      formStatus.textContent =
        "There are errors in the form. Please review the highlighted fields.";
      if (typeof formStatus.focus === "function") {
        formStatus.focus();
      }
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Creating…";
    setTimeout(() => {
      formStatus.textContent = "Account created successfully.";
      submitBtn.disabled = false;
      submitBtn.textContent = "Create account";
      form.reset();
      pwdStrengthVal.textContent = "—";
    }, 800);
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      [firstName, email, password].forEach(clearError);
      const termsError = document.getElementById("termsError");
      if (termsError) termsError.textContent = "";
      formStatus.textContent = "";
      pwdStrengthVal.textContent = "—";
    }, 0);
  });

  // Allow Enter key on links
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Enter" &&
      document.activeElement &&
      document.activeElement.tagName === "A"
    ) {
      document.activeElement.click();
    }
  });
})();
