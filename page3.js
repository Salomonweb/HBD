const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const audio = document.getElementById("audio3");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ===== BOUTON PLAY ===== */
const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", () => {
    audio.play();

    // disparition bouton
    playBtn.style.opacity = "0";
    setTimeout(() => {
        playBtn.style.display = "none";
    }, 500);
});

/* ===== ETOILES ===== */
let stars = [];
for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        alpha: Math.random()
    });
}

/* ===== ETOILES FILANTES ===== */
let shootingStars = [];

function createShootingStar() {
    shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 80,
        speed: 6
    });
}

setInterval(createShootingStar, 3000);

/* ===== COEURS ===== */
class Heart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 5;
        this.speedY = (Math.random() - 0.5) * 5;
        this.alpha = 1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "pink";

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(
            this.x - this.size,
            this.y - this.size,
            this.x - this.size * 2,
            this.y + this.size,
            this.x,
            this.y + this.size * 2
        );
        ctx.bezierCurveTo(
            this.x + this.size * 2,
            this.y + this.size,
            this.x + this.size,
            this.y - this.size,
            this.x,
            this.y
        );
        ctx.fill();

        ctx.restore();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.015;
    }
}

let hearts = [];

function createFirework() {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height / 2;

    for (let i = 0; i < 40; i++) {
        hearts.push(new Heart(x, y));
    }
}

setInterval(createFirework, 1200);

/* ===== ANIMATION ===== */
function animate() {
    ctx.fillStyle = "rgba(0,0,20,0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* étoiles scintillantes */
    stars.forEach(star => {
        star.alpha += (Math.random() - 0.5) * 0.05;
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = "white";
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    ctx.globalAlpha = 1;

    /* étoiles filantes */
    shootingStars.forEach((s, i) => {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length, s.y + s.length);
        ctx.stroke();

        s.x += s.speed;
        s.y += s.speed;

        if (s.y > canvas.height) {
            shootingStars.splice(i, 1);
        }
    });

    /* coeurs feu d’artifice */
    hearts.forEach((h, i) => {
        h.update();
        h.draw();

        if (h.alpha <= 0) hearts.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

animate();

/* ===== AUDIO RALENTI PROPRE ===== */
audio.onplay = () => {
    let slowEffect = setInterval(() => {
        if (audio.currentTime > audio.duration - 15) {
            if (audio.playbackRate > 0.6) {
                audio.playbackRate -= 0.005;
            } else {
                clearInterval(slowEffect);
            }
        }
    }, 200);
};

/* ===== REDIRECTION FIABLE ===== */
let hasRedirected = false;

function redirectToPage2() {
    if (hasRedirected) return;
    hasRedirected = true;

    document.body.style.transition = "2s";
    document.body.style.opacity = 0;

    setTimeout(() => {
        window.location.href = "page2.html";
    }, 2000);
}

// méthode 1
audio.onended = () => {
    redirectToPage2();
};

// méthode 2 (backup)
audio.addEventListener("timeupdate", () => {
    if (!hasRedirected && audio.currentTime >= audio.duration - 0.5) {
        redirectToPage2();
    }
});