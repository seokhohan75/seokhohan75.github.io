(() => {
  const menus = [...document.querySelectorAll('.work-menu')];
  const page = location.pathname.split('/').pop() || 'index.html';
  menus.forEach(menu => {
    menu.querySelectorAll('.work-dropdown a').forEach(link => {
      if (link.getAttribute('href') === page) link.setAttribute('aria-current', 'page');
      link.addEventListener('click', () => { menu.open = false; });
    });
    menu.addEventListener('toggle', () => {
      if (menu.open) menus.forEach(other => { if (other !== menu) other.open = false; });
    });
    menu.addEventListener('focusout', event => {
      if (!menu.contains(event.relatedTarget)) menu.open = false;
    });
  });
  document.addEventListener('click', event => {
    menus.forEach(menu => { if (!menu.contains(event.target)) menu.open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    menus.forEach(menu => {
      if (menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
    });
  });
})();
