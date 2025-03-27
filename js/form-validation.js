// Form Validation System
const formValidation = {
  // Regular expressions for validation
  patterns: {
    name: /^[a-zA-Z\s]{2,30}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
    phone: /^\+?[\d\s-]{10,}$/,
  },
  // Error messages
  errorMessages: {
    name: {
      required: "Name is required",
      invalid: "Name should only contain letters and be 2-30 characters long",
    },
    email: {
      required: "Email is required",
      invalid: "Please enter a valid email address",
    },
    password: {
      required: "Password is required",
      invalid:
        "Password must contain at least 8 characters, including uppercase, lowercase, number and special character",
    },
    confirmPassword: {
      required: "Please confirm your password",
      mismatch: "Passwords do not match",
    },
    phone: {
      required: "Phone number is required",
      invalid: "Please enter a valid phone number",
    },
  },

  // Show error message
  showError(input, message) {
    const formGroup = input.parentElement;
    const errorDisplay =
      formGroup.querySelector(".error-message") ||
      this.createErrorElement(formGroup);
    errorDisplay.textContent = message;
    input.classList.add("error");
    input.classList.remove("success");
  },

  // Show success
  showSuccess(input) {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector(".error-message");
    if (errorDisplay) {
      errorDisplay.textContent = "";
    }
    input.classList.add("success");
    input.classList.remove("error");
  },

  // Create error element
  createErrorElement(formGroup) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    formGroup.appendChild(errorDiv);
    return errorDiv;
  },

  // Validate name
  validateName(input) {
    if (!input.value.trim()) {
      this.showError(input, this.errorMessages.name.required);
      return false;
    }
    if (!this.patterns.name.test(input.value.trim())) {
      this.showError(input, this.errorMessages.name.invalid);
      return false;
    }
    this.showSuccess(input);
    return true;
  },

  // Validate email
  validateEmail(input) {
    if (!input.value.trim()) {
      this.showError(input, this.errorMessages.email.required);
      return false;
    }
    if (!this.patterns.email.test(input.value.trim())) {
      this.showError(input, this.errorMessages.email.invalid);
      return false;
    }
    this.showSuccess(input);
    return true;
  },

  // Validate password
  validatePassword(input) {
    if (!input.value.trim()) {
      this.showError(input, this.errorMessages.password.required);
      return false;
    }
    if (!this.patterns.password.test(input.value)) {
      this.showError(input, this.errorMessages.password.invalid);
      return false;
    }
    this.showSuccess(input);
    return true;
  },

  // Validate confirm password
  validateConfirmPassword(passwordInput, confirmInput) {
    if (!confirmInput.value.trim()) {
      this.showError(confirmInput, this.errorMessages.confirmPassword.required);
      return false;
    }
    if (passwordInput.value !== confirmInput.value) {
      this.showError(confirmInput, this.errorMessages.confirmPassword.mismatch);
      return false;
    }
    this.showSuccess(confirmInput);
    return true;
  },

  // Validate phone
  validatePhone(input) {
    if (!input.value.trim()) {
      this.showError(input, this.errorMessages.phone.required);
      return false;
    }
    if (!this.patterns.phone.test(input.value.trim())) {
      this.showError(input, this.errorMessages.phone.invalid);
      return false;
    }
    this.showSuccess(input);
    return true;
  },
};

// Initialize form validation
document.addEventListener("DOMContentLoaded", () => {
  // Signup form validation
  const signupForm = document.querySelector("form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      const confirmPassword = document.getElementById("confirm-password");

      const isNameValid = formValidation.validateName(name);
      const isEmailValid = formValidation.validateEmail(email);
      const isPasswordValid = formValidation.validatePassword(password);
      const isConfirmPasswordValid = formValidation.validateConfirmPassword(
        password,
        confirmPassword
      );

      if (
        isNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid
      ) {
        // Create user object with valid input values
        let user = {
          name: name.value,
          email: email.value,
          password: password.value,
        };

        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);

        // Registration successful
        alert("Registration successful!");
        signupForm.reset();
        window.location.href = "login.html";
      }
    });

    // Real-time validation
    const inputs = signupForm.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        switch (input.id) {
          case "name":
            formValidation.validateName(input);
            break;
          case "email":
            formValidation.validateEmail(input);
            break;
          case "password":
            formValidation.validatePassword(input);
            break;
          case "confirm-password":
            formValidation.validateConfirmPassword(
              document.getElementById("password"),
              input
            );
            break;
        }
      });
    });
  }

  // Login form validation
  const loginForm = document.querySelector(".login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let storedUser = localStorage.getItem("user");

      if (!storedUser) {
        alert("No user found. Please register first.");
        return;
      }

      storedUser = JSON.parse(storedUser); // Convert string back to object
      console.log(storedUser);

      const emailInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");

      if (!emailInput || !passwordInput) {
        console.error("Login form fields not found.");
        return;
      }

      const isEmailValid = formValidation.validateEmail(emailInput);
      const isPasswordValid = formValidation.validatePassword(passwordInput);

      if (isEmailValid && isPasswordValid) {
        // Check if entered credentials match stored ones
        if (
          emailInput.value === storedUser.email &&
          passwordInput.value === storedUser.password
        ) {
          alert("Login successful!");
          window.location.href = "profile.html"; // Redirect after login
        } else {
          alert("Invalid email or password.");
        }

        loginForm.reset();
        window.location.href = 'profile.html'
      }
    });
  }
  // const Profile = document.querySelector('body')
  // if(Profile){
  //   let storedUser = localStorage.getItem("user");

  //   if (storedUser) {
  //     storedUser = JSON.parse(storedUser); // Convert JSON string to object

  //     const userNameSpan = document.getElementById("user-name");
  //     const userEmailSpan = document.getElementById("user-email");
  //     const userProfileSpan = document.getElementById("Profile");
  //     if (userNameSpan) {
  //       userNameSpan.textContent = storedUser.name;
  //       userEmailSpan.textContent = storedUser.email;
  //       userProfileSpan.textContent = storedUser.name;
  //     }
  //   } else {
  //     console.warn("No user found in localStorage.");
  //   }
  // }
});

