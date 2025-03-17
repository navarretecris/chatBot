document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ main.js cargado correctamente");

    // Manejo del formulario de login
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        console.log("✅ loginForm encontrado en el DOM");
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
                console.error("❌ Error en la autenticación:", error);
                document.getElementById("loginError").textContent = "Server error. Please try again.";
            });
        });
    } else {
        console.warn("⚠️ loginForm NO encontrado en el DOM.");
    }

    // Manejo del formulario de registro
    let registerForm = document.getElementById("registerForm");
    if (registerForm) {
        console.log("✅ registerForm encontrado en el DOM");
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let newUsername = document.getElementById("newUsername").value.trim();
            let newPassword = document.getElementById("newPassword").value.trim();

            let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!regex.test(newPassword)) {
                alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo especial.");
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
                    alert("✅ Usuario registrado exitosamente. Ahora puedes iniciar sesión.");
                    let registerModal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
                    registerModal.hide();
                    registerForm.reset();
                } else {
                    alert(data.message || "Error en el registro.");
                }
            })
            .catch(error => {
                console.error("❌ Error en el registro:", error);
                alert("Server error. Please try again.");
            });
        });
    } else {
        console.warn("⚠️ registerForm NO encontrado en el DOM.");
    }
});

