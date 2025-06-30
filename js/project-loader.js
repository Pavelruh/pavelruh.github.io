document.addEventListener('DOMContentLoaded', function() {
  const projectId = new URLSearchParams(window.location.search).get('id');
  
  if (!projectId) {
    window.location.href = '/404.html';
    return;
  }

  fetch('/data/projects.json')
    .then(response => response.json())
    .then(projects => {
      const project = projects.find(p => p.id === projectId);
      if (!project) {
        window.location.href = '/404.html';
        return;
      }
      // Устанавливаем title
      document.title = `${project.title}`;

      renderProjectPage(project);
      updateNavigation();
    });

  function renderProjectPage(project) {
    const container = document.getElementById('project-content');
    
    container.innerHTML = `
      <h1 class="project-title">${project.title}</h1>

      <div class="project-gallery">
        ${project.images.map(img => `
          <img src="${img}" alt="${project.title}" class="project-image">
        `).join('')}
      </div>

      <div class="project-details">
        <section class="project-description">
          <h2>Описание проекта</h2>
          <p>${project.post[0].description}</p>
        </section>

        <section class="project-realisation">
          <h2>Реализация</h2>
          <p>${project.post[0].realisation}</p>
        </section>

        <section class="project-skills">
          <h2>Скиллы</h2>
          <div class="skills-list">
            ${project.post[0].skills.map(skill => `
              <span class="skill-tag">${skill}</span>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  }

  function updateNavigation() {
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.toggle('active', link.href === window.location.href);
    });
  }
});