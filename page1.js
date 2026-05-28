const slides = document.querySelectorAll(".slide");
let index = 0;
let started = false;

// SLIDER
function showSlides() {
    slides.forEach(s => s.classList.remove("active"));
    slides[index].classList.add("active");

    index = (index + 1) % slides.length;
    setTimeout(showSlides, 3000);
}

showSlides();

// PETALES
const petalsContainer = document.createElement("div");
petalsContainer.classList.add("petals");
document.body.appendChild(petalsContainer);

for (let i = 0; i < 40; i++) {
    let petal = document.createElement("span");
    petal.innerHTML = Math.random() > 0.5 ? "🌸" : "❤️";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (Math.random() * 5 + 5) + "s";
    petalsContainer.appendChild(petal);
}

// EXPERIENCE
function startExperience() {
    if (started) return;
    started = true;

    let music = document.getElementById("music");
    let voice = document.getElementById("voice");

    music.volume = 0;
    music.play();

    // FADE IN MUSIQUE
    let fadeIn = setInterval(() => {
        if (music.volume < 1) {
            music.volume += 0.05;
        } else {
            clearInterval(fadeIn);
        }
    }, 200);

    // APRES 45s → VOIX
    setTimeout(() => {
        let fadeOut = setInterval(() => {
            if (music.volume > 0) {
                music.volume -= 0.05;
            } else {
                clearInterval(fadeOut);
                music.pause();
                voice.play();
            }
        }, 200);
    }, 45000);

    // FIN VOIX → PAGE 2
    voice.onended = () => {
        document.body.style.transition = "2s";
        document.body.style.opacity = 0;

        setTimeout(() => {
            window.location.href = "page2.html";
        }, 2000);
    };
}