<?php include 'sessionCheck.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>

    <div class="container">
        <h1 class="text-center">Awesome Chatbot App</h1>



        <div class="d-flex align-items-center justify-content-between px-3" style="background-color: aqua; border-radius: 10px;">
            <div class="d-flex align-items-center">
                <img src="./icons/chatBot.png" class="rounded-circle img-thumbnail" width="75px" alt="Chatbot Icon">
                <div class="ms-3">
                    <h5 class="m-2">Chatbot</h5>
                    <span class="m-2 text-success">Online</span>
                </div>
            </div>

            <!-- Botón de Logout al extremo derecho -->
            <a href="logout.php" class="btn btn-danger">Logout</a>
        </div>

        <!-- Messages container -->
        <div id="chatContainer" class="container border overflow-auto" style="height: 500px; padding: 10px; background-color: antiquewhite; border-radius: 10px; margin-top: 15px;">

            <!-- Mensaje inicial del chatbot -->
            <div class="d-flex justify-content-start mb-3">
                <div class="bg-light rounded p-2 shadow-sm" style="max-width: 60%;">
                    <span><strong>Chatbot:</strong></span>
                    <p class="mb-0">Hello! How can I help you today?</p>
                </div>
            </div>

        </div>

        <!-- Input para escribir mensaje -->
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