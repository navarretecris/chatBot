document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ chatbot.js cargado correctamente");

    const sendBtn = document.getElementById('sendBtn');
    const textbox = document.getElementById('textbox');
    const chatContainer = document.getElementById('chatContainer');

    if (!sendBtn || !textbox || !chatContainer) {
        console.error("❌ No se encontraron los elementos del chat.");
        return;
    }

    function sendMessage(messageText) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('d-flex', 'justify-content-end', 'mb-3');

        const messageElement = document.createElement('div');
        messageElement.classList.add('bg-primary', 'text-white', 'rounded', 'p-2', 'shadow-sm', 'text-end');
        messageElement.style.maxWidth = '60%';
        messageElement.style.display = 'inline-block';

        messageElement.innerHTML = `<span><strong>You:</strong></span>
                                    <p class="mb-0" style="margin-left: 5px;">${messageText}</p>`;

        messageWrapper.appendChild(messageElement);
        chatContainer.appendChild(messageWrapper);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        textbox.value = "";

        fetch("getResponse.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `message=${encodeURIComponent(messageText)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayBotMessage(data.response);
            } else {
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
        const words = userMessage.split(" ");
        const pokemonName = words[words.length - 1].toLowerCase();

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => {
                if (!response.ok) throw new Error("Pokémon not found");
                return response.json();
            })
            .then(data => {
                const types = data.types.map(t => t.type.name).join(", ");
                const abilities = data.abilities.map(a => a.ability.name).join(", ");
                const stats = data.stats.map(s => `<tr><td>${s.stat.name}</td><td>${s.base_stat}</td></tr>`).join("");
                const weight = (data.weight / 10).toFixed(1);
                const height = (data.height / 10).toFixed(1);
                const baseExperience = data.base_experience;
                const image = data.sprites.front_default;

                const botResponse = `
                    <div class="card shadow-sm">
                        <div class="card-body text-center">
                            <img src="${image}" alt="${pokemonName}" class="pokemon-img mb-3">
                            <h5 class="card-title text-primary">${data.name.toUpperCase()} 🏆</h5>
                            <p><strong>Tipo:</strong> ${types}</p>
                            <p><strong>Habilidades:</strong> ${abilities}</p>
                            <table class="table table-sm table-bordered mb-2">
                                <thead class="table-light">
                                    <tr><th>Estadística</th><th>Valor</th></tr>
                                </thead>
                                <tbody>${stats}</tbody>
                            </table>
                            <p><strong>Peso:</strong> ${weight} kg</p>
                            <p><strong>Altura:</strong> ${height} m</p>
                            <p><strong>Experiencia Base:</strong> ${baseExperience}</p>
                        </div>
                    </div>
                `;

                displayBotMessage(botResponse);
            })
            .catch(error => {
                console.error("❌ Error al obtener datos del Pokémon:", error);
                displayBotMessage("No pude encontrar ese Pokémon. ¡Intenta con otro!");
            });
    }

    function displayBotMessage(botResponse) {
        const botMessageWrapper = document.createElement('div');
        botMessageWrapper.classList.add('d-flex', 'justify-content-start', 'mb-3');

        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('bg-light', 'text-dark', 'rounded', 'p-2', 'shadow-sm', 'text-start');
        botMessageElement.style.maxWidth = '60%';
        botMessageElement.style.display = 'inline-block';

        botMessageElement.innerHTML = `<span><strong>Chatbot:</strong></span>
                                       <div style="margin-left: 5px;">${botResponse}</div>`;

        botMessageWrapper.appendChild(botMessageElement);
        chatContainer.appendChild(botMessageWrapper);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    sendBtn.addEventListener('click', () => {
        const messageText = textbox.value.trim();
        if (messageText !== "") {
            sendMessage(messageText);
        }
    });

    textbox.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            const messageText = textbox.value.trim();
            if (messageText !== "") {
                sendMessage(messageText);
            }
        }
    });
});