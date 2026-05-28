// TEXTE QUI S'ECRIT
const text = "De la part d’un roi à une reine 👑❤️";
let i = 0;

function typing() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 80);
    }
}
typing();

// PARTICULES
const particles = document.getElementById("particles");

for (let i = 0; i < 150; i++) {
    let p = document.createElement("span");
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = (Math.random() * 5 + 5) + "s";
    particles.appendChild(p);
}

// EXPLOSION + TRANSITION
function explodeAndGo() {
    for (let i = 0; i < 50; i++) {
        let heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.style.position = "absolute";
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.fontSize = "20px";
        heart.style.transition = "1s";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.transform = `translate(${Math.random()*600-300}px, ${Math.random()*600-300}px)`;
            heart.style.opacity = 0;
        }, 50);
    }

    setTimeout(() => {
        window.location.href = "page1.html";
    }, 1200);
}