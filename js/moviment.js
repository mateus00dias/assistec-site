const images = document.querySelectorAll('.carousel-image');
let current = 0;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

document.getElementById('prevBtn').addEventListener('click', () => {
  current = (current - 1 + images.length) % images.length;
  showImage(current);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  current = (current + 1) % images.length;
  showImage(current);
});
