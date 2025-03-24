<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot - Login</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Estilos personalizados -->
    <link rel="stylesheet" href="css/loginstyles.css">
</head>

<body>
    <!-- Fondo centrado -->
    <div class="container-login">
        <!-- Tarjeta de login -->
        <div class="card-login">
            <div class="text-center mb-3">
                <img src="icons/chatBot.png" alt="Chatbot Logo" class="img-fluid chatbot-logo" width="80px">
                <h3 class="mt-2 fw-bold">Welcome to Chatbot</h3>
                <p class="text-muted">Please log in to continue</p>
            </div>

            <!-- Formulario de login -->
            <form id="loginForm">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">Login</button>
                <div id="loginError" class="text-danger mt-2 text-center"></div>
            </form>

            <hr>

            <!-- Botón de registro -->
            <div class="text-center">
                <p class="mb-2">Don't have an account?</p>
                <button type="button" class="btn btn-outline-success w-100" data-bs-toggle="modal" data-bs-target="#registerModal">
                    Create Account
                </button>
            </div>
        </div>
    </div>

    <!-- Modal de registro -->
    <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-align-modal modal-dialog-centered">
    <div class="modal-content card-login card-modal">
                <div class="modal-header border-0">
                    <h5 class="modal-title" id="registerModalLabel">Register New User</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="registerForm">
                        <div class="mb-3">
                            <label for="newUsername" class="form-label">Username</label>
                            <input type="text" class="form-control" id="newUsername" required>
                        </div>
                        <div class="mb-3">
                            <label for="newPassword" class="form-label">Password</label>
                            <input type="password" class="form-control" id="newPassword" required>
                        </div>
                        <button type="submit" class="btn btn-success w-100">Register</button>
                        <div id="registerError" class="text-danger mt-2 text-center"></div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/main.js"></script>
</body>

</html>