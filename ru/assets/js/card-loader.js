document.addEventListener('DOMContentLoaded', function() {
  // Определяем текущий раздел из URL
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  
  // Загрузка и обработка проектов
  fetch('data/projects.json')
    .then(response => response.json())
    .then(projects => {
      // Сортируем все проекты по дате (новые сначала)
      const sortedProjects = sortProjectsByDate(projects);
      
      // В зависимости от страницы фильтруем проекты
      let filteredProjects;
      if (currentPage === 'index') {
        // На главной - только featured
        filteredProjects = getFeaturedProjects(sortedProjects).slice(0, 5);
      } else {
        // На других страницах - по разделу
        filteredProjects = getProjectsBySection(sortedProjects, currentPage);
      }
      
      // Отображаем проекты
      renderProjects(filteredProjects);
      
      // Инициализируем карусели и фильтры
      initCarousels();
    });
    
  // Функция сортировки проектов по дате (новые сначала)
  function sortProjectsByDate(projects) {
    return projects.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  // Получаем featured-проекты
  function getFeaturedProjects(projects) {
    return projects.filter(project => project.featured === true);
  }

  // Получаем проекты для конкретного раздела
  function getProjectsBySection(projects, section) {
    return projects.filter(project => project.section === section);
  }

  // Рендеринг проектов
  function renderProjects(projects) {
    const container = document.querySelector('.project-grid');
    if (!container) return;
    
    container.innerHTML = projects
      .map(project => createProjectCard(project))
      .join('');
  }
  function createProjectCard(project) {
    const isInProgress = project.status === 'in-progress';
  
    // Для проектов в работе используем div вместо ссылки
    const tag = isInProgress ? 'div' : 'a';
    var hrefAttr = isInProgress ? '' : `href="projects/${project.id}/${project.id}.html"`;
    if (project.id === '' || project.id === 'id') hrefAttr = 'href="/404.html"';

    return `
      <${tag} class="project-card" ${hrefAttr}" 
         data-tags="${project.tags}" 
         data-status="${project.status}"
         data-section="${project.section}">
        <h3>${project.title}</h3>
        <span class="project-date">${formatDate(project.date)}</span>
        <p>${project.description}</p>
        <div class="progress-badge"></div>
        <div class="hover-carousel">
          <div class="carousel-images">
          ${project.images.map(img => 
            `<img src="projects/${project.id}/${img}" alt="${project.title}">`).join('')}
          </div>
        </div>
      </${tag}>
    `;
  }
    
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  }
  
  function initCarousels() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
      // Пропускаем карточки "в работе"
      if (card.dataset.status === 'in-progress') return;
      
      const carousel = card.querySelector('.hover-carousel');
      if (!carousel) return;

      // Создаем контейнер для точек, если его нет
      let dotsContainer = carousel.querySelector('.carousel-dots');
      if (!dotsContainer) {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        carousel.appendChild(dotsContainer);
      }

      const images = carousel.querySelectorAll('img');
      if (images.length <= 1) {
        dotsContainer.remove(); // Удаляем точки если изображение одно
        return;
      }

      // Инициализация состояний
      images.forEach((img, index) => {
        img.classList.toggle('active', index === 0);
        img.style.position = 'absolute'; // Добавляем для правильного позиционирования
      });

      // Создаем точки-индикаторы
      dotsContainer.innerHTML = ''; // Очищаем перед созданием
      images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          setActiveSlide(carousel, index);
        });
        dotsContainer.appendChild(dot);
      });

      // Обработка движения мыши
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const segment = Math.floor((x / width) * images.length);
        const activeIndex = Math.min(segment, images.length - 1);
        
        setActiveSlide(carousel, activeIndex);
      });

      // Сброс при уходе мыши
      card.addEventListener('mouseleave', () => {
        setActiveSlide(carousel, 0);
      });
    });

    // Общая функция для переключения слайдов
    function setActiveSlide(carousel, index) {
      const images = carousel.querySelectorAll('img');
      const dots = carousel.querySelectorAll('.carousel-dot');
      
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  }
});

// Filter posts
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-button');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.dataset.filter;
      const allCards = document.querySelectorAll('.project-card');
      
      allCards.forEach(card => {
        const shouldShow = shouldShowCard(card, filterValue);
        
        if (!shouldShow) {
          card.style.transform = 'translateY(0) scale(0.95)';
          card.style.opacity = '0';
          setTimeout(() => card.classList.add('hidden'), 300);
        } else {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        }
      });
    });
  });

  function shouldShowCard(card, filterValue) {
    // Для фильтра "in-progress" проверяем статус
    if (filterValue === 'in-progress') {
      return card.dataset.status === 'in-progress';
    }
    // Для остальных фильтров проверяем теги
    return filterValue === 'all' || card.dataset.tags.split(' ').includes(filterValue);
  }
});