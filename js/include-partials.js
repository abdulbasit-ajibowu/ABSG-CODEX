async function includePartials() {
  const targets = document.querySelectorAll("[data-include]");

  await Promise.all(
    Array.from(targets).map(async (target) => {
      const file = target.getAttribute("data-include");
      if (!file) {
        return;
      }

      try {
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(`Unable to load ${file}`);
        }

        target.innerHTML = await response.text();
      } catch (error) {
        target.innerHTML = `<div class="text-danger small p-3">${error.message}</div>`;
      }
    })
  );

  document.dispatchEvent(new CustomEvent("partials:loaded"));
}

includePartials();
