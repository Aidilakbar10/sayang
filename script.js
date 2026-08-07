// --- KONTROL MUSIK LOKAL ---
const bgMusic = document.getElementById('bg-music');
const btnMusic = document.getElementById('btn-music');
let isPlaying = false;

btnMusic.addEventListener('click', () => {
    if (!isPlaying) {
        bgMusic.play();
        btnMusic.innerHTML = "⏸️ Jeda Lagu";
        btnMusic.classList.add('playing');
        isPlaying = true;
    } else {
        bgMusic.pause();
        btnMusic.innerHTML = "🎵 Putar Lagu";
        btnMusic.classList.remove('playing');
        isPlaying = false;
    }
});


// --- KONTROL TOMBOL "MASIH KESEL" ---
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const mainPhoto = document.getElementById('main-photo');
const title = document.querySelector('.title');
const message = document.getElementById('message');
const actionButtons = document.getElementById('action-buttons');
const card = document.getElementById('main-card');
const sliderWrapper = document.getElementById('memory-slider-wrapper');

const noTexts = [
    "Masih kesel?",
    "Maaf ya..",
    "Jangan marah dong",
    "Coba pikirin lagi?",
    "Plis baikan?",
    "Iya deh, aku tunggu",
    "Masih mau marah ya?"
];
let noClickCount = 0;

const moveNoButton = () => {
    const maxJump = 100; 
    const rect = btnNo.getBoundingClientRect();
    
    let jumpX = (Math.random() - 0.5) * 2 * maxJump;
    let jumpY = (Math.random() - 0.5) * 2 * maxJump;
    
    if (Math.abs(jumpX) < 40) jumpX = (jumpX > 0 ? 40 : -40);
    if (Math.abs(jumpY) < 40) jumpY = (jumpY > 0 ? 40 : -40);
    
    let newX = rect.left + jumpX;
    let newY = rect.top + jumpY;
    
    newX = Math.max(10, Math.min(newX, window.innerWidth - btnNo.offsetWidth - 10));
    newY = Math.max(10, Math.min(newY, window.innerHeight - btnNo.offsetHeight - 10));

    btnNo.style.position = 'fixed';
    btnNo.style.left = `${newX}px`;
    btnNo.style.top = `${newY}px`;

    noClickCount++;
    btnNo.innerText = noTexts[Math.min(noClickCount, noTexts.length - 1)];

    const currentScale = 1 + (noClickCount * 0.03);
    btnYes.style.transform = `scale(${Math.min(currentScale, 1.1)})`; 
};

btnNo.addEventListener('mouseover', moveNoButton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveNoButton();
});


// --- KONTROL TOMBOL "IYA, KITA BAIKAN" ---
btnYes.addEventListener('click', () => {
    
    card.style.transform = "scale(1.02)";
    title.innerHTML = "Makasih ya, Sayangkuu.";
    actionButtons.style.display = 'none';
    
    const finalMessage = "Makasih udah mau nurunin ego dan kasih aku kesempatan. Aku bakal lebih hati-hati lagi ke depannya. Coba deh geser ke samping. We're good now, right? :)";
    
    message.innerHTML = "";
    message.classList.add('typewriter');

    let i = 0;
    const typeWriter = () => {
        if (i < finalMessage.length) {
            message.innerHTML += finalMessage.charAt(i);
            i++;
            setTimeout(typeWriter, 40); 
        } else {
            // SETELAH TEKS SELESAI MENGETIK, SLIDER MUNCUL
            sliderWrapper.style.display = 'block';
            
            // Jeda sedikit untuk rendering CSS
            setTimeout(() => {
                sliderWrapper.style.opacity = '1';
            }, 100);
        }
    };
    
    setTimeout(typeWriter, 300);
    createHeartRain();
});


// --- KONTROL SLIDER VIDEO (GESER) ---
const sliderContainer = document.getElementById('slider-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Tombol Geser Kiri
prevBtn.addEventListener('click', () => {
    // Geser sejauh lebar 1 video
    sliderContainer.scrollBy({ left: -sliderContainer.clientWidth, behavior: 'smooth' });
});

// Tombol Geser Kanan
nextBtn.addEventListener('click', () => {
    // Geser sejauh lebar 1 video
    sliderContainer.scrollBy({ left: sliderContainer.clientWidth, behavior: 'smooth' });
});


// --- EFEK BUNGA/HATI JATUH ---
const createHeartRain = () => {
    const particles = document.getElementById('particles');
    const emojis = ['🤍', '✨']; 

    setInterval(() => {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        element.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        element.style.left = `${Math.random() * 100}vw`;
        element.style.animationDuration = `${Math.random() * 5 + 4}s`;
        element.style.fontSize = `${Math.random() * 10 + 15}px`;

        particles.appendChild(element);

        setTimeout(() => {
            element.remove();
        }, 8000);
    }, 400); 
};
