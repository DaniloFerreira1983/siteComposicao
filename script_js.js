function getYouTubeID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function addVideo(cardNumber) {
    const input = document.querySelector(`input[data-card="${cardNumber}"]`);
    const videoUrl = input.value.trim();
    
    if (!videoUrl) {
        alert('Por favor, cole um link do YouTube válido.');
        return;
    }

    const videoId = getYouTubeID(videoUrl);
    
    if (!videoId) {
        alert('Link do YouTube inválido. Por favor, verifique o URL.');
        return;
    }

    const card = document.getElementById(`card${cardNumber}`);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    
    card.innerHTML = `
        <iframe 
            class="video-frame" 
            src="${embedUrl}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
        <button class="add-video-btn" onclick="resetCard(${cardNumber})" style="margin-top: 15px; background: #dc3545;">
            Alterar Vídeo
        </button>
    `;
}

function resetCard(cardNumber) {
    const card = document.getElementById(`card${cardNumber}`);
    card.innerHTML = `
        <div class="video-placeholder">🎵 Vídeo ${cardNumber}</div>
        <input type="url" class="video-input" placeholder="Cole aqui o link do YouTube..." data-card="${cardNumber}">
        <button class="add-video-btn" onclick="addVideo(${cardNumber})">Adicionar Vídeo</button>
    `;
}

function loadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageContainer = document.querySelector('.image-container');
            imageContainer.innerHTML = `
                <img src="${e.target.result}" alt="Ferreira Luiz" class="composer-image" onclick="document.getElementById('imageInput').click()">
                <input type="file" id="imageInput" accept="image/*" onchange="loadImage(event)" style="display: none;">
            `;
        };
        reader.readAsDataURL(file);
    }
}

function submitForm(event) {
    event.preventDefault();
    
    // Coleta os dados do formulário
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Simula envio do formulário
    alert(`Obrigado pelo contato, ${data.name}!\n\nSua mensagem foi enviada com sucesso. Entraremos em contato em breve através do e-mail ${data.email} ou telefone ${data.phone}.`);
    
    // Limpa o formulário
    event.target.reset();
}