<?php
require 'db.php'; // Conexión a la base de datos

// Habilitar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_POST["message"])) {
        echo json_encode(["success" => false, "response" => "No message received"]);
        exit;
    }

    $userMessage = trim($_POST["message"]);
    $userMessage = strtolower($userMessage);

    // Obtener todas las respuestas y comparar los textos posibles
    $stmt = $pdo->query("SELECT text, response FROM responses");
    $allResponses = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $matchedResponse = null;

    foreach ($allResponses as $row) {
        $possibleTexts = explode("|", strtolower($row["text"])); // Separa las frases posibles
        if (in_array($userMessage, $possibleTexts)) { // Si el mensaje coincide con alguna frase
            $responses = explode("|", $row["response"]); // Divide las respuestas en array
            $matchedResponse = $responses[array_rand($responses)]; // Elige una respuesta aleatoria
            break; // Sale del bucle al encontrar una coincidencia
        }
    }

    if ($matchedResponse) {
        echo json_encode(["success" => true, "response" => $matchedResponse]);
    } else {
        echo json_encode(["success" => false, "response" => "Sorry, I didn't understand that. Can you rephrase?"]);
    }
    exit;
}

echo json_encode(["success" => false, "response" => "Invalid request."]);
