document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const emailInput = form.querySelector('input[type="email"]');
            const passwordInput = form.querySelector('input[type="password"]');
            const studentIdInput = form.querySelector('input[name="student_id"]');
            const dateInput = form.querySelector('input[name="date"]');
            const statusInput = form.querySelector('input[name="status"]');

            let isValid = true;
            let errorMessage = "";

            // Validate email and password (for login forms)
            if (emailInput && passwordInput) {
                if (!emailInput.value.trim().includes('@')) {
                    errorMessage = "Please enter a valid email.";
                    isValid = false;
                } else if (passwordInput.value.length < 4) {
                    errorMessage = "Password must be at least 4 characters.";
                    isValid = false;
                }
            }

            // Validate attendance form
            if (studentIdInput && dateInput && statusInput) {
                if (!studentIdInput.value.trim()) {
                    errorMessage = "Student ID is required.";
                    isValid = false;
                } else if (!dateInput.value) {
                    errorMessage = "Date is required.";
                    isValid = false;
                } else if (!statusInput.value) {
                    errorMessage = "Status is required.";
                    isValid = false;
                }
            }

            if (!isValid) {
                e.preventDefault(); // stop form submission
                alert(errorMessage);
            }
        });
    });
});