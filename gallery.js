(() => {
  const dialog = document.querySelector('#image-viewer');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const links = [...document.querySelectorAll('[data-gallery]')];
  const image = document.querySelector('#viewer-image');
  let active = [], index = 0, opener, previousOverflow;
  function show(next) {
    index = (next + active.length) % active.length;
    const link = active[index];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    document.querySelector('#viewer-caption').textContent = image.alt + ' · ' + (index + 1) + ' / ' + active.length;
    document.querySelector('#viewer-original').href = link.href;
  }
  links.forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    active = links.filter(item => item.dataset.gallery === link.dataset.gallery);
    show(active.indexOf(link));
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
  }));
  document.querySelector('#viewer-close').onclick = () => dialog.close();
  document.querySelector('#viewer-prev').onclick = () => show(index - 1);
  document.querySelector('#viewer-next').onclick = () => show(index + 1);
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  }});
  dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; opener?.focus(); });
})();
