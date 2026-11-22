
const mockAccounts = [
    {
        email: "admin@eaduan.com",
        password: "admin123",
        role: "admin",
        dashboard: "admin-dashboard.html"
    },
    {
        email: "student@eaduan.com",
        studentId: "2025345678",
        password: "student123",
        role: "student",
        dashboard: "student-dashboard.html"
    },
    {
        email: "technician@eaduan.com",
        password: "tech123",
        role: "technician",
        dashboard: "technician-dashboard.html"
    }
];

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const identity = document.getElementById("identity").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const message = document.getElementById("loginMessage");

    const account = mockAccounts.find(user =>
        (
            user.email.toLowerCase() === identity ||
            user.studentId === identity
        ) && user.password === password
    );

    if (account) {
        window.location.href = account.dashboard;
    } else {
        message.textContent = "Invalid email, student ID or password. Please try again.";
        message.hidden = false;
    }
});
