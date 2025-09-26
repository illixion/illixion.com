// Modular lightbox for image previews
document.addEventListener('DOMContentLoaded', function() {
  var overlay = document.getElementById('lightbox-overlay');
  var lightboxImg = document.getElementById('lightbox-img');
  var closeBtn = document.getElementById('lightbox-close');

  // Open lightbox on gallery image click
  document.querySelectorAll('.gallery-item img').forEach(function(img) {
    img.addEventListener('click', function(e) {
      e.preventDefault();
      var fullSrc = img.closest('a') ? img.closest('a').getAttribute('href') : img.src;
      lightboxImg.src = fullSrc;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox on overlay or button click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay || e.target === closeBtn) {
      overlay.style.display = 'none';
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }
  });
  closeBtn.addEventListener('click', function() {
    overlay.style.display = 'none';
    lightboxImg.src = '';
    document.body.style.overflow = '';
  });
  // ESC key closes lightbox
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.style.display === 'flex') {
      overlay.style.display = 'none';
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }
  });
});