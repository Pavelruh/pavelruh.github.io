document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (currentPage === linkPage || 
        (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.dataset.filter;
      const allCards = document.querySelectorAll('.project-card');
      
      // Анимация исчезновения
      allCards.forEach(card => {
        if (!(filterValue === 'all' || card.dataset.tags.includes(filterValue))) {
          card.style.transform = 'translateY(0) scale(0.95)';
          card.style.opacity = '0';
          setTimeout(() => card.classList.add('hidden'), 300);
        }
      });
      
      // Анимация появления
      setTimeout(() => {
        allCards.forEach(card => {
          if (filterValue === 'all' || card.dataset.tags.includes(filterValue)) {
            card.classList.remove('hidden');
            const carousel = card.querySelector('.card-carousel');
            if (carousel) {
                carousel.querySelector('.carousel-track').style.transform = 'translateX(0)';
                const dots = carousel.querySelectorAll('.carousel-dot');
                dots.forEach((dot, i) => dot.classList.toggle('active', i === 0));
            }
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          }
        });
      }, 300);
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    const carousel = card.querySelector('.hover-carousel');
    if (!carousel) return;
    
    const images = carousel.querySelectorAll('.carousel-images img');
    if (images.length <= 1) return;
    
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const cardWidth = card.offsetWidth;
    const segmentWidth = cardWidth / images.length;
    
    // Создаем точки-индикаторы
    images.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    });
    
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const segment = Math.floor(x / segmentWidth);
      const activeIndex = Math.min(segment, images.length - 1);
      
      // Переключаем изображения
      images.forEach((img, index) => {
        img.classList.toggle('active', index === activeIndex);
      });
      
      // Переключаем точки
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    });
    
    // Возвращаем к первому изображению при уходе курсора
    card.addEventListener('mouseleave', () => {
      images.forEach((img, index) => {
        img.classList.toggle('active', index === 0);
      });
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
      });
    });
    
    // Клик по точкам для переключения (опционально)
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        
        images.forEach((img, i) => {
          img.classList.toggle('active', i === index);
        });
        
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === index);
        });
      });
    });
  });
});