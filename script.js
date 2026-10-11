// EFECTO DE CONFETI
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    confetti({ particleCount: 600, spread: 60, origin: { x: 0, y: 0.8 } });
    confetti({ particleCount: 600, spread: 60, origin: { x: 1, y: 0.8 } });
    confetti({ particleCount: 200, spread: 90, origin: { x: 0.5, y: 0.3 } });
  }, 500); // 0.5 segundos después de que la página se haya cargado
});

// CUENTA REGRESIVA
const hoy = new Date();
let anioEvento = hoy.getFullYear();

let fechaEvento = new Date(`October 27, ${anioEvento} 18:00:00`).getTime();
if (hoy.getTime() > fechaEvento) {
  fechaEvento = new Date(`October 27, ${anioEvento + 1} 18:00:00`).getTime();
}

const timer = setInterval(function() {
  const ahora = new Date().getTime();
  const diferencia = fechaEvento - ahora;

  if (diferencia > 0) {
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("dias").innerText = dias.toString().padStart(2, "0");
    document.getElementById("horas").innerText = horas.toString().padStart(2, "0");
    document.getElementById("minutos").innerText = minutos.toString().padStart(2, "0");
    document.getElementById("segundos").innerText = segundos.toString().padStart(2, "0");
  } else {
    clearInterval(timer);
    document.querySelector(".countdown-container").innerHTML = "<p style='margin:0; font-weight:bold; color:#25D366;'>🎉 ¡Llegó el día de la fiesta! 🎉</p>";
  }
}, 1000);

// ENVÍO A WHATSAPP
function confirmarAsistencia(e) {
  e.preventDefault();

  const tuNumero = "5491169320177"; 

  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const acompanantes = document.getElementById('acompanantes').value.trim() || 'Voy solo/a';

  const mensaje = `¡Hola! Confirmo mi asistencia al cumpleaños de Ciro!\n\n` +
                  `*Nombre:* ${nombre}\n` +
                  `*Acompañante:* ${acompanantes}\n` +
                  `*Mi teléfono:* ${telefono}\n`;

  const url = `https://wa.me/${tuNumero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}


// -------------------------------------------------------------
// 4. LÓGICA DE MÚSICA Y REPRODUCCIÓN AUTOMÁTICA
// -------------------------------------------------------------
const audio = document.getElementById('musicaCumple');
const btnAudio = document.getElementById('btnAudio');
const iconoAudio = document.getElementById('iconoAudio');

// Función para activar o pausar con el botón flotante
function toggleAudio() {
  if (audio.paused) {
    audio.play();
    iconoAudio.innerText = "🔊";
    btnAudio.classList.remove('mute');
  } else {
    audio.pause();
    iconoAudio.innerText = "🔇";
    btnAudio.classList.add('mute');
  }
}

// Inicia el audio automáticamente al primer toque en la pantalla
function iniciarAudioAlPrimerContacto() {
  audio.play().then(() => {
    iconoAudio.innerText = "🔊";
    btnAudio.classList.remove('mute');
  }).catch(() => {
    // Si el navegador bloqueó el inicio automático, queda listo para cuando toque el botón
    iconoAudio.innerText = "🔇";
    btnAudio.classList.add('mute');
  });

  // Remueve los escuchadores para que solo se intente una vez
  window.removeEventListener('click', iniciarAudioAlPrimerContacto);
  window.removeEventListener('touchstart', iniciarAudioAlPrimerContacto);
}

window.addEventListener('click', iniciarAudioAlPrimerContacto);
window.addEventListener('touchstart', iniciarAudioAlPrimerContacto);
