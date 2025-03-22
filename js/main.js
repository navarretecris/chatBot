document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ main.js loaded successfully");

    // Manejo del formulario de login
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        console.log("✅ loginForm found in the DOM");
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let username = document.getElementById("username").value.trim();
            let password = document.getElementById("password").value.trim();

            fetch("authenticate.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
            })
            .then(response => response.json())
            .then(data => {
                console.log("🔄 Response from authenticate.php:", data);
                if (data.success) {
                    window.location.href = "chatbot.php";
                } else {
                    document.getElementById("loginError").textContent = data.message || "Invalid username or password.";
                }
            })
            .catch(error => {
                console.error("❌ Authentication error:", error);
                document.getElementById("loginError").textContent = "Server error. Please try again.";
            });
        });
    } else {
        console.warn("⚠️ loginForm NOT found in the DOM.");
    }

    // Manejo del formulario de registro
    let registerForm = document.getElementById("registerForm");
    if (registerForm) {
        console.log("✅ registerForm found in the DOM");
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let newUsername = document.getElementById("newUsername").value.trim();
            let newPassword = document.getElementById("newPassword").value.trim();

            let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!regex.test(newPassword)) {
                alert("Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.");
                return;
            }

            fetch("register.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `username=${encodeURIComponent(newUsername)}&password=${encodeURIComponent(newPassword)}`
            })
            .then(response => response.json())
            .then(data => {
                console.log("🔄 Response from register.php:", data);
                if (data.success) {
                    alert("✅ User successfully registered. You can now log in.");
                    let registerModal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
                    registerModal.hide();
                    registerForm.reset();
                } else {
                    alert(data.message || "Registration error.");
                }
            })
            .catch(error => {
                console.error("❌ Registration error:", error);
                alert("Server error. Please try again.");
            });
        });
    } else {
        console.warn("⚠️ registerForm NOT found in the DOM.");
    }
});