const slider = document.querySelector("#slider");
const slides = document.querySelectorAll(".slider__section");
const indicatorContainer = document.querySelector("#indicators");

let currentSlide = 0;
const numSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });

    const indicators = indicatorContainer.querySelectorAll(".indicator");
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === index);
    });
}

function createIndicators() {
    for (let i = 0; i < numSlides; i++) {
        const indicator = document.createElement("div");
        indicator.classList.add("indicator");
        indicator.addEventListener("click", () => showSlide(i));
        indicatorContainer.appendChild(indicator);
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % numSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + numSlides) % numSlides;
    showSlide(currentSlide);
}

// cada 5 segundos se cambia la imagen
setInterval(nextSlide, 5000);

// mostrara la imagen en el inicio
showSlide(currentSlide);

createIndicators();
