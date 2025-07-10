document.addEventListener('DOMContentLoaded', function() {
  const galleries = document.querySelectorAll('.project-gallery');
  
  galleries.forEach(gallery => {
    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'gallery-container';
    
    const mainImageContainer = document.createElement('div');
    mainImageContainer.className = 'gallery-main';
    
    const mainImage = document.createElement('img');
    mainImage.className = 'gallery-main-image';
    mainImage.style.cursor = 'pointer';
    
    // Кнопки навигации
    const prevButton = document.createElement('button');
    prevButton.className = 'gallery-nav gallery-prev';
    prevButton.innerHTML = '&lt;';
    prevButton.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateGallery(-1);
    });
    
    const nextButton = document.createElement('button');
    nextButton.className = 'gallery-nav gallery-next';
    nextButton.innerHTML = '&gt;';
    nextButton.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateGallery(1);
    });
    
    // Миниатюры
    const thumbnailsContainer = document.createElement('div');
    thumbnailsContainer.className = 'gallery-thumbnails';
    
    // Полноэкранный контейнер
    const fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.className = 'gallery-fullscreen-overlay';
    fullscreenOverlay.style.display = 'none';
    
    const fullscreenWrapper = document.createElement('div');
    fullscreenWrapper.className = 'gallery-fullscreen-wrapper';
    
    const fullscreenImage = document.createElement('img');
    fullscreenImage.className = 'gallery-fullscreen-image';
    
    // Кнопки навигации для полноэкранного режима
    const fsPrevButton = document.createElement('button');
    fsPrevButton.className = 'gallery-nav gallery-prev';
    fsPrevButton.innerHTML = '&lt;';
    fsPrevButton.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateGallery(-1);
    });
    
    const fsNextButton = document.createElement('button');
    fsNextButton.className = 'gallery-nav gallery-next';
    fsNextButton.innerHTML = '&gt;';
    fsNextButton.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateGallery(1);
    });
    
    const closeButton = document.createElement('button');
    closeButton.className = 'gallery-close-btn';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFullscreen();
    });
    
    fullscreenWrapper.appendChild(fullscreenImage);
    fullscreenOverlay.appendChild(fullscreenWrapper);
    fullscreenOverlay.appendChild(fsPrevButton);
    fullscreenOverlay.appendChild(fsNextButton);
    fullscreenOverlay.appendChild(closeButton);
    
    // Собираем структуру
    mainImageContainer.appendChild(mainImage);
    mainImageContainer.appendChild(prevButton);
    mainImageContainer.appendChild(nextButton);
    
    galleryContainer.appendChild(mainImageContainer);
    galleryContainer.appendChild(thumbnailsContainer);
    galleryContainer.appendChild(fullscreenOverlay);
    
    // Заменяем оригинальную галерею
    const images = Array.from(gallery.querySelectorAll('.project-image'));
    gallery.replaceWith(galleryContainer);
    
    let currentIndex = 0;
    
    // Клик по основному изображению для полноэкранного режима
    mainImageContainer.addEventListener('click', toggleFullscreen);
    
    // Инициализация галереи
    function initGallery() {
      if (images.length === 0) return;
      
      mainImage.src = images[0].src;
      mainImage.alt = images[0].alt;
      
      images.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.alt = img.alt;
        thumb.className = 'gallery-thumbnail';
        if (index === 0) thumb.classList.add('active');
        
        thumb.addEventListener('click', (e) => {
          e.stopPropagation();
          setCurrentIndex(index);
        });
        
        thumbnailsContainer.appendChild(thumb);
      });
    }
    
    function navigateGallery(direction) {
      let newIndex = currentIndex + direction;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      setCurrentIndex(newIndex);
    }
    
    function setCurrentIndex(index) {
      currentIndex = index;
      const imgSrc = images[index].src;
      mainImage.src = imgSrc;
      mainImage.alt = images[index].alt;
      fullscreenImage.src = imgSrc;
      
      document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
      });
    }
    
    function toggleFullscreen() {
      if (fullscreenOverlay.style.display === 'none') {
        fullscreenOverlay.style.display = 'flex';
        fullscreenImage.src = mainImage.src;
        document.body.style.overflow = 'hidden';
      } else {
        fullscreenOverlay.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
    
    document.addEventListener('keydown', function(e) {
      if (fullscreenOverlay.style.display === 'flex') {
        if (e.key === 'Escape') {
          toggleFullscreen();
        } else if (e.key === 'ArrowLeft') {
          navigateGallery(-1);
        } else if (e.key === 'ArrowRight') {
          navigateGallery(1);
        }
      }
    });
    
    initGallery();
  });
});