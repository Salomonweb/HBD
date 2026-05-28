/* ===== ELEMENTS ===== */
const slides = document.querySelectorAll(".slide");
const audio = document.getElementById("audio");

let started = false;
const totalSlides = slides.length;

let slideDuration = 0;
let currentSlideIndex = -1;

/* ===== MACHINE A ECRIRE ===== */
function typeWriter(element, text, speed = 25) {
    element.innerHTML = "";
    let i = 0;

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}

/* ===== CALCUL DUREE PAR SLIDE ===== */
audio.addEventListener("loadedmetadata", () => {
    slideDuration = audio.duration / totalSlides;
});

/* ===== SYNCHRO AUDIO → SLIDES ===== */
function updateSlides() {
    if (!slideDuration) return;

    let currentTime = audio.currentTime;

    let index = Math.floor(currentTime / slideDuration);

    if (index !== currentSlideIndex && slides[index]) {
        currentSlideIndex = index;

        slides.forEach(s => s.classList.remove("active"));

        let currentSlide = slides[index];
        currentSlide.classList.add("active");

        // effet machine à écrire
        let caption = currentSlide.querySelector(".caption");
        let fullText = caption.innerText;

        typeWriter(caption, fullText, 30);
    }
}

/* ===== START EXPERIENCE ===== */
function startExperience() {
    if (started) return;
    started = true;

    document.getElementById("startScreen").style.display = "none";

    audio.play();

    setInterval(updateSlides, 200);
}

/* ===== REDIRECTION FIABLE ===== */
let hasRedirected = false;

function goToPage3() {
    if (hasRedirected) return;
    hasRedirected = true;

    document.body.style.transition = "2s";
    document.body.style.opacity = 0;

    setTimeout(() => {
        window.location.href = "page3.html";
    }, 2000);
}

/* ===== FIN AUDIO ===== */
audio.addEventListener("ended", goToPage3);

/* ===== BACKUP SI BUG ===== */
audio.addEventListener("timeupdate", () => {
    if (!hasRedirected && audio.duration && audio.currentTime >= audio.duration - 0.5) {
        goToPage3();
    }
});