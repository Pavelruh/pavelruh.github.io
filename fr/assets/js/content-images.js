document.addEventListener('DOMContentLoaded', function() {
  // Создаем контейнер для полноэкранного режима
  const fullscreenContainer = document.createElement('div');
  fullscreenContainer.className = 'content-image-fullscreen';
  
  const fullscreenImage = document.createElement('img');
  const closeButton = document.createElement('button');
  closeButton.className = 'content-image-close';
  closeButton.innerHTML = '&times;';
  
  fullscreenContainer.appendChild(fullscreenImage);
  fullscreenContainer.appendChild(closeButton);
  document.body.appendChild(fullscreenContainer);
  
  // Обработчики для всех контентных изображений
  document.querySelectorAll('.content-image').forEach(img => {
    img.addEventListener('click', function() {
      fullscreenImage.src = this.src;
      fullscreenImage.alt = this.alt;
      fullscreenContainer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Закрытие по кнопке
  closeButton.addEventListener('click', function() {
    fullscreenContainer.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Закрытие по клику вне изображения
  fullscreenContainer.addEventListener('click', function(e) {
    if (e.target === fullscreenContainer) {
      fullscreenContainer.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Закрытие по ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && fullscreenContainer.classList.contains('active')) {
      fullscreenContainer.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});