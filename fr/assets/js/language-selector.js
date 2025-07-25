document.addEventListener('DOMContentLoaded', function() {
  // Получаем текущий язык из URL
  const getCurrentLanguage = () => {
    const path = window.location.pathname;
    const langMatch = path.match(/^\/(en|ru|fr)\//);
    return langMatch ? langMatch[1] : 'fr';
  };

  const currentLang = getCurrentLanguage();
  const languageSelector = document.querySelector('.language-selector');
  
  if (!languageSelector) return;

  const currentButton = languageSelector.querySelector('.language-current');
  const dropdown = languageSelector.querySelector('.language-dropdown');
  const languageItems = dropdown.querySelectorAll('li');

  // Устанавливаем текущий язык в селекторе
  currentButton.textContent = currentLang.toUpperCase();

  // Помечаем активный язык в выпадающем списке
  languageItems.forEach(item => {
    item.classList.toggle('active', item.dataset.lang === currentLang);
    
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const newLang = this.dataset.lang;
      
      // Формируем новый URL с учетом выбранного языка
      const newPath = window.location.pathname.replace(/^\/(en|ru|fr)/, `/${newLang}`);
      
      // Переходим на новую страницу
      window.location.href = newPath;
    });
  });
});