
// REGISTRATION FORM VALIDATION

function handleRegistration(formId, messageId) {

    const form = document.getElementById(formId);

    if (!form) {
        return;
    }

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const password = form.querySelector(
            'input[name="password"]'
        ).value;

        const confirmPassword = form.querySelector(
            'input[name="confirmPassword"]'
        ).value;

        const message = document.getElementById(messageId);

        // CHECK PASSWORD

        if (password !== confirmPassword) {

            showMessage(
                message,
                "Passwords do not match. Please try again.",
                "error"
            );

            return;
        }

        // PASSWORD VALIDATION SUCCESS

        showMessage(
            message,
            "Registration form validated successfully. Database registration will be implemented in the final Java application."
        );

    });

}


// STUDENT REGISTRATION

handleRegistration(
    "registerForm",
    "registerMessage"
);


// TECHNICIAN REGISTRATION

handleRegistration(
    "technicianRegisterForm",
    "technicianRegisterMessage"
);


// ADMIN REGISTRATION

handleRegistration(
    "adminRegisterForm",
    "adminRegisterMessage"
);
