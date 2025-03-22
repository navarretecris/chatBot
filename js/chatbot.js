document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ chatbot.js loaded successfully");

    const sendBtn = document.getElementById('sendBtn');
    const textbox = document.getElementById('textbox');
    const chatContainer = document.getElementById('chatContainer');

    if (!sendBtn || !textbox || !chatContainer) {
        console.error("❌ Chat elements not found.");
        return;
    }

    // ✅ Avatar fijo generado al iniciar la sesión
    const userAvatarUrl = generateUserAvatar();

    // ✅ Saludo inicial del bot
    displayBotMessage("Hello! How can I help you today?");

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

    function sendMessage(messageText) {
        const userMessageWrapper = document.createElement('div');
        userMessageWrapper.classList.add('d-flex', 'justify-content-end', 'align-items-start', 'mb-3');

        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('bg-primary', 'text-white', 'rounded', 'p-2', 'shadow-sm', 'me-2');
        userMessageElement.style.maxWidth = '60%';
        userMessageElement.style.display = 'inline-block';
        userMessageElement.innerHTML = `<div>${messageText}</div>`;

        const userAvatar = document.createElement('img');
        userAvatar.src = userAvatarUrl;
        userAvatar.alt = 'You';
        userAvatar.classList.add('user-avatar');

        userMessageWrapper.appendChild(userMessageElement);
        userMessageWrapper.appendChild(userAvatar);
        chatContainer.appendChild(userMessageWrapper);
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
            console.error("❌ Error getting chatbot response:", error);
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
                            <p><strong>Type:</strong> ${types}</p>
                            <p><strong>Abilities:</strong> ${abilities}</p>
                            <table class="table table-sm table-bordered mb-2">
                                <thead class="table-light">
                                    <tr><th>Stat</th><th>Value</th></tr>
                                </thead>
                                <tbody>${stats}</tbody>
                            </table>
                            <p><strong>Weight:</strong> ${weight} kg</p>
                            <p><strong>Height:</strong> ${height} m</p>
                            <p><strong>Base Experience:</strong> ${baseExperience}</p>
                        </div>
                    </div>
                `;

                displayBotMessage(botResponse);
            })
            .catch(error => {
                console.error("❌ Error fetching Pokémon data:", error);
                displayBotMessage("I couldn't find that Pokémon. Try another one!");
            });
    }

    function displayBotMessage(botResponse) {
        const botMessageWrapper = document.createElement('div');
        botMessageWrapper.classList.add('d-flex', 'align-items-start', 'mb-3');

        const botAvatar = document.createElement('img');
        botAvatar.src = './icons/chatBot.png';
        botAvatar.alt = 'Bot';
        botAvatar.classList.add('bot-avatar');

        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('bg-light', 'text-dark', 'rounded', 'p-2', 'shadow-sm', 'ms-2');
        botMessageElement.style.maxWidth = '60%';
        botMessageElement.style.display = 'inline-block';

        botMessageElement.innerHTML = `<div>${botResponse}</div>`;

        botMessageWrapper.appendChild(botAvatar);
        botMessageWrapper.appendChild(botMessageElement);
        chatContainer.appendChild(botMessageWrapper);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function generateUserAvatar() {
        const randomId = Math.floor(Math.random() * 1000);
        return `https://api.dicebear.com/7.x/bottts/svg?seed=${randomId}`;
    }
});