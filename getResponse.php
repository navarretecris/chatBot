<?php
require 'db.php'; // Conexión a la base de datos

// Habilitar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

function normalize($text) {
    $text = strtolower(trim($text));
    $text = preg_replace("/[^\p{L}\p{N}\s]/u", "", $text); // quitar puntuación y símbolos
    return $text;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_POST["message"])) {
        echo json_encode(["success" => false, "response" => "No message received"]);
        exit;
    }

    $userMessage = normalize($_POST["message"]);

    // Obtener todas las entradas de la base de datos
    $stmt = $pdo->query("SELECT text, response FROM responses");
    $allResponses = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $matchedResponse = null;

    foreach ($allResponses as $row) {
        $possibleTexts = explode("|", strtolower($row["text"])); // frases posibles
        foreach ($possibleTexts as $phrase) {
            $normalizedPhrase = normalize($phrase);

            // Comparación exacta o fuzzy con tolerancia Levenshtein
            if ($userMessage === $normalizedPhrase || levenshtein($userMessage, $normalizedPhrase) <= 2) {
                $responses = explode("|", $row["response"]);
                $matchedResponse = $responses[array_rand($responses)];
                break 2; // rompe ambos foreach
            }
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