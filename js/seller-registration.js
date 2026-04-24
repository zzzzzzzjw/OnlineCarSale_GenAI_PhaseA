document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sellerRegistrationForm');
  const globalError = document.getElementById('globalError');

  // Regex validation rules based on requirements
  const rules = {
    sellerName: {
      regex: /^[A-Za-z\s]+$/,
      errorMsg: 'Name must contain only alphabetical characters and spaces.'
    },
    sellerAddress: {
      regex: /^[A-Za-z0-9\s]+$/,
      errorMsg: 'Address must contain only alphanumeric characters and spaces.'
    },
    sellerPhone: {
      regex: /^1[3-9]\d{9}$/,
      errorMsg: 'Please enter a valid 11-digit Chinese phone number.'
    },
    sellerEmail: {
      // Exactly one '@', followed by domain ending in .com or .cn
      regex: /^[^@\s]+@[^@\s]+\.(com|cn)$/,
      errorMsg: 'Email must contain one "@" and end with .com or .cn.'
    },
    sellerUsername: {
      regex: /^[A-Za-z0-9]{6,}$/,
      errorMsg: 'Username must contain at least 6 alphanumeric characters.'
    },
    sellerPassword: {
      regex: /^[A-Za-z0-9]{6,}$/,
      errorMsg: 'Password must contain at least 6 alphanumeric characters.'
    }
  };

  /**
   * Validates a single input field against its regex rule.
   * Updates DOM to show/hide error messages and manage ARIA states.
   */
  const validateField = (inputId) => {
    const inputEl = document.getElementById(inputId);
    const errorEl = document.getElementById(inputId.replace('seller', '').toLowerCase() + 'Error');
    const rule = rules[inputId];
    
    // Trim input for evaluation (optional, but good practice)
    const val = inputEl.value.trim();
    
    if (!rule.regex.test(val)) {
      inputEl.classList.add('is-invalid');
      inputEl.setAttribute('aria-invalid', 'true');
      errorEl.textContent = rule.errorMsg;
      return false;
    } else {
      inputEl.classList.remove('is-invalid');
      inputEl.setAttribute('aria-invalid', 'false');
      errorEl.textContent = '';
      return true;
    }
  };

  // Attach 'blur' event listeners for immediate validation upon leaving a field
  Object.keys(rules).forEach(inputId => {
    const inputEl = document.getElementById(inputId);
    if (inputEl) {
      inputEl.addEventListener('blur', () => {
        validateField(inputId);
        globalError.textContent = ''; // Clear global error on new interaction
      });
    }
  });

  // Final validation check on Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    Object.keys(rules).forEach(inputId => {
      const isFieldValid = validateField(inputId);
      if (!isFieldValid) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      globalError.style.color = '#28a745'; // Success green
      globalError.textContent = 'Registration successful! Proceeding...';
      // Implement actual submission logic here (e.g., fetch API)
    } else {
      globalError.style.color = '#dc3545'; // Error red
      globalError.textContent = 'Please correct the errors in the form before submitting.';
    }
  });
});