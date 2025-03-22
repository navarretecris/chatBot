<?php include 'sessionCheck.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <link rel="stylesheet" href="css/chatbotstyles.css">
</head>

<body>

<div class="container chat-wrapper">
    <h1 class="text-center">Awesome Chatbot App</h1>

    <div class="d-flex align-items-center justify-content-between px-3" style="background-color: aqua; border-radius: 10px;">
        <div class="d-flex align-items-center">
            <div class="logo-container">
                <img src="./icons/chatBot.png" class="chatbot-logo" alt="Chatbot Icon">
            </div>
            <div class="ms-3">
                <h5 class="m-2">Chatbot</h5>
                <span class="m-2 text-success">Online</span>
            </div>
        </div>
        <a href="logout.php" class="btn btn-danger">Logout</a>
    </div>

    <!-- Contenedor de mensajes -->
    <div id="chatContainer" class="container border overflow-auto"
         style="height: 500px; padding: 10px; background-color: antiquewhite; border-radius: 10px; margin-top: 15px;">
        <!-- Mensajes dinámicos se insertan desde JS -->
    </div>

    <!-- Input de mensaje -->
    <div class="input-group mt-3">
        <input id="textbox" type="text" class="form-control" placeholder="Type your message here..." aria-label="User message">
        <button id="sendBtn" type="button" class="btn btn-primary">Send</button>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
<script src="js/chatbot.js"></script>

</body>
</html>