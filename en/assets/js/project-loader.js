document.addEventListener('DOMContentLoaded', function() {
  const pageName = window.location.pathname.split('/').pop().replace(/\.[^/.]+$/, '');
  
  if (!pageName) {
    window.location.href = '/404.html';
    return;
  }

  fetch('../../data/projects.json')
    .then(response => response.json())
    .then(projects => {
      const project = projects.find(p => p.id === pageName);
      if (!project) {
        window.location.href = '/404.html';
        return;
      }
      // Устанавливаем title
      document.title = `${project.title}`;
      
      const container = document.getElementById('skills-list');
      container.innerHTML = `
        <h2>Скиллы</h2>
        <div class="skills-list">
          ${project.skills.map(skill => `
            <span class="skill-tag">${skill}</span>
          `).join('')}
        </div>`
    });
});