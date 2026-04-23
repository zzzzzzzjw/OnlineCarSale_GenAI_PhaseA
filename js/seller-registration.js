// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function(event) {
        // Prevent immediate submission to handle custom validation logic
        event.preventDefault();
        event.stopPropagation();

        // Add the 'was-validated' class to trigger CSS error message visibility
        form.classList.add('was-validated');

        // Check if all fields pass the strict HTML5 pattern regex rules
        if (form.checkValidity()) {
            // Validation Passed
            handleSuccessfulRegistration();
        } else {
            // Validation Failed - The CSS will automatically highlight the specific broken rules
            console.log("Form contains validation errors. Please check the fields.");
        }
    });

    /**
     * Dedicated function for successful form processing (e.g., API calls)
     */
    function handleSuccessfulRegistration() {
        // Here you would typically gather the form data and send it via Fetch/Axios
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        
        console.log("Validation Successful! Payload ready for server:", userData);
        
        // Example UI feedback for the user
        const btn = document.querySelector('.submit-btn');
        btn.textContent = "ACCESS GRANTED";
        btn.style.background = "#d4af37";
        btn.style.color = "#000";
        
        // Reset form or redirect user...
    }
});