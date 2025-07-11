document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle-btn');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Быстрое применение темы до загрузки DOM (убирает мерцание)
  function applyInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (initialTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  // Основная функция применения темы
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    themeToggle.setAttribute('aria-label', 
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  // Инициализация
  applyInitialTheme();

  // Обработчик переключения
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Отслеживание системных изменений (только если нет сохраненной темы)
  prefersDarkScheme.addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
});