// SHOW AND HIDE PASSWORDS

document.querySelectorAll(".toggle-password").forEach(button => {

    button.addEventListener("click", function () {

        const targetId = this.getAttribute("data-target");
        const passwordInput = document.getElementById(targetId);

        if (!passwordInput) {
            return;
        }

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            this.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            this.textContent = "Show";
        }

    });

});


// DISPLAY FORM MESSAGES

function showMessage(element, message, type = "info") {

    if (!element) {
        return;
    }

    element.hidden = false;
    element.className = "form-message " + type;
    element.textContent = message;

}