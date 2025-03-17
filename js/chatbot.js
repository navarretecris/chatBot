document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ chatbot.js cargado correctamente");

    var sendBtn = document.getElementById('sendBtn');
    var textbox = document.getElementById('textbox');
    var chatContainer = document.getElementById('chatContainer');

    if (!sendBtn || !textbox || !chatContainer) {
        console.error("❌ No se encontraron los elementos del chat.");
        return;
    }

    function sendMessage(messageText) {
        var messageWrapper = document.createElement('div');
        messageWrapper.classList.add('d-flex', 'justify-content-end', 'mb-3');

        var messageElement = document.createElement('div');
        messageElement.classList.add('bg-primary', 'text-white', 'rounded', 'p-2', 'shadow-sm', 'text-end');
        messageElement.style.maxWidth = '60%';
        messageElement.style.display = 'inline-block';

        messageElement.innerHTML = `<span><strong>You:</strong></span>
                                    <p class="mb-0" style="margin-left: 5px;">${messageText}</p>`;

        messageWrapper.appendChild(messageElement);
        chatContainer.appendChild(messageWrapper);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        textbox.value = "";

        // Primero, consultar en la base de datos
        fetch("getResponse.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `message=${encodeURIComponent(messageText)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayBotMessage(data.response); // Respuesta de la base de datos
            } else {
                // Si no hay respuesta en la base de datos, probar con la API de Pokémon
                if (messageText.toLowerCase().includes("pokemon") || messageText.toLowerCase().includes("tell me about")) {
                    fetchPokemonData(messageText);
                } else {
                    displayBotMessage("Sorry, I didn't understand that. Can you rephrase?");
                }
            }
        })
        .catch(error => {
            console.error("❌ Error obteniendo la respuesta del chatbot:", error);
        });
    }

    function fetchPokemonData(userMessage) {
        let words = userMessage.split(" ");
        let pokemonName = words[words.length - 1].toLowerCase(); // Última palabra como nombre del Pokémon

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => {
                if (!response.ok) throw new Error("Pokémon not found");
                return response.json();
            })
            .then(data => {
                const types = data.types.map(t => t.type.name).join(", ");
                const abilities = data.abilities.map(a => a.ability.name).join(", ");
                const stats = data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(", ");
                const weight = data.weight / 10; // Peso en kg
                const height = data.height / 10; // Altura en m
                const baseExperience = data.base_experience;
                
    
                const botResponse = `
                    **${data.name.toUpperCase()}** 🏆
                    - **Tipo**: ${types}
                    - **Habilidades**: ${abilities}
                    - **Estadísticas**: ${stats}
                    - **Peso**: ${weight} kg
                    - **Altura**: ${height} m
                    - **Experiencia Base**: ${baseExperience}
                `;
    
                displayBotMessage(botResponse);
            })
            .catch(error => {
                console.error("Error al obtener datos del Pokémon:", error);
                displayBotMessage("No pude encontrar ese Pokémon. ¡Intenta con otro!");
            });
    }

    function displayBotMessage(botResponse) {
        var botMessageWrapper = document.createElement('div');
        botMessageWrapper.classList.add('d-flex', 'justify-content-start', 'mb-3');

        var botMessageElement = document.createElement('div');
        botMessageElement.classList.add('bg-light', 'text-dark', 'rounded', 'p-2', 'shadow-sm', 'text-start');
        botMessageElement.style.maxWidth = '60%';
        botMessageElement.style.display = 'inline-block';

        botMessageElement.innerHTML = `<span><strong>Chatbot:</strong></span>
                                       <p class="mb-0" style="margin-left: 5px;">${botResponse}</p>`;

        botMessageWrapper.appendChild(botMessageElement);
        chatContainer.appendChild(botMessageWrapper);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    sendBtn.addEventListener('click', function () {
        let messageText = textbox.value.trim();
        if (messageText !== "") {
            sendMessage(messageText);
        }
    });

    textbox.addEventListener('keypress', function (e) {
        if (e.key === "Enter") {
            let messageText = textbox.value.trim();
            if (messageText !== "") {
                sendMessage(messageText);
            }
        }
    });
});