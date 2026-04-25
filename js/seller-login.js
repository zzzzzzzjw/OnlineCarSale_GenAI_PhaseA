document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sellerLoginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const globalError = document.getElementById('globalError');

  // Regex validation rule (At least 6 alphanumeric characters)
  const validationRule = /^[A-Za-z0-9]{6,}$/;
  const formatErrorMsg = 'Must contain at least 6 alphanumeric characters.';

  // Mock database for checking existing accounts
  const mockDatabase = {
    'seller123': 'securePass1',
    'adminUser': 'adminPass'
  };

  /**
   * Validates a single input field against the regex.
   * Updates DOM to show/hide error messages and manage ARIA states.
   */
  const validateField = (inputEl, errorEl) => {
    const val = inputEl.value.trim();
    if (!validationRule.test(val)) {
      inputEl.classList.add('is-invalid');
      inputEl.setAttribute('aria-invalid', 'true');
      errorEl.textContent = formatErrorMsg;
      return false;
    } else {
      inputEl.classList.remove('is-invalid');
      inputEl.setAttribute('aria-invalid', 'false');
      errorEl.textContent = '';
      return true;
    }
  };

  // Immediate validation on blur
  usernameInput.addEventListener('blur', () => {
    validateField(usernameInput, document.getElementById('usernameError'));
    globalError.textContent = ''; 
  });

  passwordInput.addEventListener('blur', () => {
    validateField(passwordInput, document.getElementById('passwordError'));
    globalError.textContent = '';
  });

  // Final validation and mock authentication on Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    globalError.textContent = '';

    const isUsernameValid = validateField(usernameInput, document.getElementById('usernameError'));
    const isPasswordValid = validateField(passwordInput, document.getElementById('passwordError'));

    // Requirement: directly throw an error alert if format validation fails
    if (!isUsernameValid || !isPasswordValid) {
      alert("Validation Error: Please ensure all fields contain at least 6 alphanumeric characters.");
      return;
    }

    const usernameVal = usernameInput.value.trim();
    const passwordVal = passwordInput.value.trim();

    // Check account existence and credentials
    if (!mockDatabase.hasOwnProperty(usernameVal)) {
      globalError.style.color = '#dc3545';
      globalError.textContent = 'Account does not exist. Please sign up first.';
    } else if (mockDatabase[usernameVal] !== passwordVal) {
      globalError.style.color = '#dc3545';
      globalError.textContent = 'Incorrect password. Please try again.';
    } else {
      globalError.style.color = '#28a745'; // Success green
      globalError.textContent = 'Login successful! Redirecting...';
      // Proceed with actual login logic...
    }
  });
});