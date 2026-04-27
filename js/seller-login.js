document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sellerLoginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const globalError = document.getElementById('globalError');

  // Regex validation rule (At least 6 alphanumeric characters)
  const validationRule = /^[A-Za-z0-9]{6,}$/;
  const formatErrorMsg = 'Must contain at least 6 alphanumeric characters.';

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

  usernameInput.addEventListener('blur', () => {
    validateField(usernameInput, document.getElementById('usernameError'));
    globalError.textContent = ''; 
  });

  passwordInput.addEventListener('blur', () => {
    validateField(passwordInput, document.getElementById('passwordError'));
    globalError.textContent = '';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    globalError.textContent = '';

    const isUsernameValid = validateField(usernameInput, document.getElementById('usernameError'));
    const isPasswordValid = validateField(passwordInput, document.getElementById('passwordError'));

    if (!isUsernameValid || !isPasswordValid) {
      alert("Validation Error: Please ensure all fields contain at least 6 alphanumeric characters.");
      return;
    }

    const usernameVal = usernameInput.value.trim();
    const passwordVal = passwordInput.value.trim();

    // Fetch existing users from LocalStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const matchedUser = users.find(u => u.username === usernameVal);


    /* Modified part start */

    if (!matchedUser) {
      globalError.style.color = '#dc3545';
      globalError.textContent = 'Account does not exist. Please sign up first.';
    } else if (matchedUser.password !== passwordVal) {
      globalError.style.color = '#dc3545';
      globalError.textContent = 'Incorrect password. Please try again.';
    } else {
      // Success State Retention
      globalError.style.color = '#28a745'; 
      globalError.textContent = 'Login successful! Redirecting...';
      
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('currentUser', usernameVal);
      
      // Default redirect to index.html post-login
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }

    /* Modified part end */

    
  });
});