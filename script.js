document.addEventListener("DOMContentLoaded", function() {
    // Todo el código relacionado con la inicialización
    var audio = document.getElementById("audioPlayer");
    var playPauseButton = document.getElementById("playPauseButton");
    var iconoPlayPause = document.getElementById("iconoPlayPause");
    var progressBar = document.getElementById("progress-bar");
    var currentTimeDisplay = document.getElementById("current-time");
    var durationTimeDisplay = document.getElementById("duration-time");
    
    var modal = document.getElementById('photo-modal');
    var seal = document.getElementById("seal");

    let currentSlide = 0;   
    const wishes = [];

    // Función para abrir el sobre y reproducir la música
    function openEnvelopeAndPlayMusic() {
        var envelopeTop = document.getElementById("envelope-top");
        var envelopeBottom = document.getElementById("envelope-bottom");
        var envelope = document.getElementById("envelope");
        var invitation = document.getElementById("invitation");

        envelopeTop.style.transform = 'translateY(-100vh)';
        envelopeBottom.style.transform = 'translateY(100vh)';

        setTimeout(function() {
            envelope.classList.add('hidden');
            invitation.classList.remove('hidden');
        }, 1000); // Ajusta el tiempo según tu animación

        // Reproducir música
        audio.play().then(function() {
            iconoPlayPause.classList.remove("fa-play");
            iconoPlayPause.classList.add("fa-pause");
            updateProgress(); // Iniciar la actualización del progreso
        }).catch(function(error) {
            console.log('Playback failed: ', error);
            iconoPlayPause.classList.add("fa-play");
            iconoPlayPause.classList.remove("fa-pause");
        });
    }

    // Agregar event listener para el sello
    seal.addEventListener("click", function() {
        openEnvelopeAndPlayMusic();
    });

    // Función para reproducir/pausar la música y cambiar el icono
    function togglePlayPause() {
        var audio = document.getElementById("audioPlayer");
        var iconoPlayPause = document.getElementById("iconoPlayPause");
    
        if (!audio || !iconoPlayPause) return;
    
        // 1️⃣ CAMBIO INSTANTÁNEO DEL ICONO (Reduce INP)
        requestAnimationFrame(() => {
            iconoPlayPause.classList.toggle("fa-play");
            iconoPlayPause.classList.toggle("fa-pause");
        });
    
        // 2️⃣ CONTROL DE AUDIO (Se ejecuta en segundo plano)
        setTimeout(() => {
            if (audio.paused) {
                audio.play().catch(console.error);
            } else {
                audio.pause();
            }
        }, 50);
    }
    
    // Actualizar el progreso de la barra y el tiempo
    function updateProgress() {
        audio.addEventListener("timeupdate", function() {
            var progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progress;

            // Actualizar el tiempo transcurrido
            var currentMinutes = Math.floor(audio.currentTime / 60);
            var currentSeconds = Math.floor(audio.currentTime % 60);
            currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;

            // Actualizar el tiempo total (duración de la canción)
            if (!isNaN(audio.duration)) {
                var durationMinutes = Math.floor(audio.duration / 60);
                var durationSeconds = Math.floor(audio.duration % 60);
                durationTimeDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
            }
        });
    }

    // Saltar a una parte de la canción cuando se hace clic en la barra de progreso
    progressBar.addEventListener("input", function() {
        var newTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = newTime;
    });

    // Escuchar el clic del botón de play/pause
    playPauseButton.addEventListener("click", function() {
        togglePlayPause();
    });

    // Inicializar el contador
    const targetDate = new Date('2025-06-14T00:00:00').getTime();
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdown);
            document.querySelector('.countdown').textContent = "Gracias por habernos acompañado en este día tan especial.";
        }
    }, 1000);

    // Funciones para los buenos deseos
    function toggleWishes() {
        const wishesDiv = document.getElementById('wishes');
        wishesDiv.classList.toggle('hidden');
        wishesDiv.innerHTML = wishes.map(wish => `<p><strong>${wish.name}:</strong> ${wish.message}</p>`).join('');
    }

    function toggleWishForm() {
        document.getElementById('wish-form').classList.toggle('hidden');
    }

    function submitWish() {
        const name = document.getElementById('wish-name').value;
        const message = document.getElementById('wish-message').value;
        wishes.push({ name, message });
        document.getElementById('wish-name').value = '';
        document.getElementById('wish-message').value = '';
        toggleWishForm();
        toggleWishes();
    }

//aparicion de textos con scroll
document.addEventListener("DOMContentLoaded", function() {
    const elementsToFade = document.querySelectorAll('.fade-in-element');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elementsToFade.forEach(element => {
        observer.observe(element);
    });
});
//fin de la funcion de scroll

//Inicio de funcion de la galeria
// Función para cambiar la foto principal en la galería
function changePhoto(element) {
    const mainPhoto = document.getElementById('main-photo-modal');
    mainPhoto.src = element.src;
}
});

//galeria
function changePhoto(element) {
    const mainPhotoModal = document.getElementById('main-photo');
    const mainPhoto = document.getElementById('main-photo-modal');

    // Actualizar la imagen del modal y la imagen principal
    mainPhoto.src = element.src; // Imagen del modal
    mainPhotoModal.src = element.src; // Actualizar la imagen principal

     // Si la imagen seleccionada NO es la imagen principal (miniaturas), abrir el modal
     if (element !== mainPhoto) {
        openModal();
    }
}

function openModal() {
    const modal = document.getElementById('photo-modal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('photo-modal');
    modal.style.display = 'none';
}

// Añadir el evento de cierre al botón de cerrar (la 'X')
document.querySelector('.close').addEventListener('click', closeModal);

// También cierra el modal cuando se hace clic fuera de la imagen (en el fondo del modal)
document.getElementById('photo-modal').addEventListener('click', function(event) {
    const modal = document.getElementById('photo-modal');
    if (event.target === this) {
        closeModal();
    }
});

// Asegúrate de que el evento del sello no interactúe con el modal
document.getElementById('seal').addEventListener('click', function(event) {
    // Aquí puedes añadir el comportamiento del sello, pero no debe abrir el modal
    event.stopPropagation(); // Esto evita que el evento de clic afecte al modal.
    openEnvelopeAndPlayMusic();
});

// Evitar que se propague el evento en el modal
document.getElementById('photo-modal').addEventListener('click', function(event) {
    event.stopPropagation(); // Esto evita que el clic fuera del modal lo cierre automáticamente
    closeModal(); // Solo cierra si haces clic en el fondo del modal
});

//termina la funcion de galeria
//buenos deseos
let wishes = [];

function submitWish() {
    const name = document.getElementById('wish-name').value;
    const message = document.getElementById('wish-message').value;

    if (name && message) {
        wishes.push({ name, message });
        document.getElementById('wish-name').value = '';
        document.getElementById('wish-message').value = '';
        toggleWishForm();
        displayWishes();
    }
}

function displayWishes() {
    const wishesDiv = document.getElementById('wishes');
    wishesDiv.innerHTML = wishes.map(wish => `<p><strong>${wish.name}:</strong> ${wish.message}</p>`).join('');
}

function toggleWishForm() {
    document.getElementById('wish-form').classList.toggle('hidden');
}

function toggleWishes() {
    document.getElementById('wishes').classList.toggle('hidden');
}

//fade-in-element
document.addEventListener("DOMContentLoaded", function() {
    const elementsToFade = document.querySelectorAll('.fade-in-element');

    elementsToFade.forEach((element, index) => {
        const delay = index * 0.05; // Calcula el retraso basándote en el índice (0.5 segundos por elemento)
        element.style.transitionDelay = `${delay}s`; // Aplica el retraso dinámico a cada elemento
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elementsToFade.forEach(element => {
        observer.observe(element);
    });
});
//DETALLES TRANSFERENCIA//
function toggleDetails() {
    var details = document.getElementById("accountDetails");
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
}
//OPTIMIZACION DE CODIGO
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".title").classList.add("visible");
});

function toggleDetails(id) {
    var element = document.getElementById(id);
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}
function toggleSection(id) {
    var section = document.getElementById(id);
    if (section.style.display === "none" || section.style.display === "") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}