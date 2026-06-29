function initMinistryTabs() {
  const tabs = document.querySelectorAll('.ministry-tab-btn');
  if (!tabs.length) return;

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.ministryTab;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      document.querySelectorAll('.ministry-tabs-body').forEach(pane => {
        pane.classList.add('d-none');
      });

      const activePane = document.getElementById('tab-' + target);
      if (activePane) activePane.classList.remove('d-none');
    });
  });
}

document.addEventListener('partials:loaded', () => {
  initMinistryTabs();
});
