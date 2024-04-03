const images = document.querySelectorAll('.image');
const overlay = document.getElementById('image-overlay');

images.forEach(function(image) {
    image.addEventListener('mouseover', function() {
        const sourceText = image.src;
        overlay.textContent = sourceText;
    });
});