export function initContactForm(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  if (!form) return;

  const statusEl = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const submitBtn = form.querySelector<HTMLButtonElement>('[type="submit"]');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando…';
    }

    fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      .then((res) => res.json() as Promise<{ success: boolean }>)
      .then(({ success }) => {
        if (!success) throw new Error('submit failed');
        if (statusEl) {
          statusEl.textContent = '¡Mensaje enviado! Me pondré en contacto pronto.';
          statusEl.className = 'form-status success';
        }
        form.reset();
      })
      .catch(() => {
        if (statusEl) {
          statusEl.textContent = 'Error al enviar. Inténtalo de nuevo o escríbeme por LinkedIn.';
          statusEl.className = 'form-status error';
        }
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Enviar mensaje';
        }
      });
  });
}
