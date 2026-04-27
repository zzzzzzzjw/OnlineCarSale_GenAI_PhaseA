document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sellerRegistrationForm');
  const globalError = document.getElementById('globalError');

  const rules = {
    sellerName: { regex: /^[A-Za-z\s]+$/, errorMsg: 'Alphabetical characters and spaces only.' },
    sellerAddress: { regex: /^[A-Za-z0-9\s]+$/, errorMsg: 'Alphanumeric characters and spaces only.' },
    sellerPhone: { regex: /^1[3-9]\d{9}$/, errorMsg: 'Enter a valid 11-digit Chinese phone number.' },
    sellerEmail: { regex: /^[^@\s]+@[^@\s]+\.(com|cn)$/, errorMsg: 'Must contain one "@" and end with .com or .cn.' },
    sellerUsername: { regex: /^[A-Za-z0-9]{6,}$/, errorMsg: 'At least 6 alphanumeric characters.' },
    sellerPassword: { regex: /^[A-Za-z0-9]{6,}$/, errorMsg: 'At least 6 alphanumeric characters.' }
  };

  const validateField = (inputId) => {
    const inputEl = document.getElementById(inputId);
    const errorEl = document.getElementById(inputId.replace('seller', '').toLowerCase() + 'Error');
    const rule = rules[inputId];
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

  Object.keys(rules).forEach(inputId => {
    const inputEl = document.getElementById(inputId);
    if (inputEl) {
      inputEl.addEventListener('blur', () => {
        validateField(inputId);
        globalError.textContent = ''; 
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    Object.keys(rules).forEach(inputId => {
      if (!validateField(inputId)) isFormValid = false;
    });

    if (isFormValid) {
      const usernameVal = document.getElementById('sellerUsername').value.trim();
      const passwordVal = document.getElementById('sellerPassword').value.trim();
      const emailVal = document.getElementById('sellerEmail').value.trim();

      // Fetch existing users from LocalStorage
      let users = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if username already exists
      const usernameExists = users.some(u => u.username === usernameVal);
      if (usernameExists) {
        globalError.style.color = '#dc3545';
        globalError.textContent = 'Username is already taken. Please choose another.';
        return;
      }

      // Append new user
      users.push({
        username: usernameVal,
        password: passwordVal,
        email: emailVal
      });
      localStorage.setItem('users', JSON.stringify(users));

      globalError.style.color = '#28a745'; 
      globalError.textContent = 'Registration successful! Redirecting...';
      
      alert('Registration successful! Redirecting to the login page...');
      window.location.href = 'login.html';
      
    } else {
      globalError.style.color = '#dc3545'; 
      globalError.textContent = 'Please correct the errors in the form before submitting.';
    }
  });
});