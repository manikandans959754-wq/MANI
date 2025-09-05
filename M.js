// script.js - modal, nav toggle, form handling

document.addEventListener('DOMContentLoaded', () => {
  // NAV TOGGLE (mobile)
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Modal elements
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalHeader = document.getElementById('modalHeader');
  const modalFooter = document.getElementById('modalFooter');
  const modalClose = document.getElementById('modalClose');

  // Open modal function (exposed globally)
  window.openModal = function (src, title = '', type = 'image', externalLink = '') {
    // Show modal
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');

    modalHeader.textContent = title || '';
    modalBody.innerHTML = ''; // reset
    modalFooter.innerHTML = '';

    if (type === 'project' && externalLink) {
      // show screenshot and link to live site
      const img = document.createElement('img');
      img.src = src;
      img.alt = title || 'Project preview';
      modalBody.appendChild(img);

      const visit = document.createElement('a');
      visit.href = externalLink;
      visit.target = '_blank';
      visit.rel = 'noopener noreferrer';
      visit.className = 'btn primary';
      visit.style.marginTop = '12px';
      visit.textContent = 'Open Live Project';
      modalFooter.appendChild(visit);
    } else {
      // default – show an image
      const img = document.createElement('img');
      img.src = src;
      img.alt = title || 'Preview';
      img.onload = () => {
        // nothing special
      };
      img.onerror = () => {
        // fallback: if src is likely a webpage URL, show iframe
        modalBody.innerHTML = `<iframe src="${src}" title="${title}"></iframe>`;
      };
      modalBody.appendChild(img);

      // If it's a large image (resume) provide download link
      if (title && /resume|cv|curriculum/i.test(title)) {
        const dl = document.createElement('a');
        dl.href = src;
        dl.download = title.replace(/\s+/g,'_') + '.png';
        dl.className = 'btn outline';
        dl.textContent = 'Download';
        dl.style.marginLeft = '8px';
        modalFooter.appendChild(dl);
      }
    }

    // close on overlay click
    modal.addEventListener('click', overlayClose);
    // close on ESC
    document.addEventListener('keydown', escClose);
  };

  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modalBody.innerHTML = '';
    modalHeader.innerHTML = '';
    modalFooter.innerHTML = '';
    modal.removeEventListener('click', overlayClose);
    document.removeEventListener('keydown', escClose);
  }

  function overlayClose(e) {
    if (e.target === modal) closeModal();
  }

  function escClose(e) {
    if (e.key === 'Escape') closeModal();
  }

  modalClose?.addEventListener('click', closeModal);

  // PROFILE IMAGE click -> open larger view
  const homePhoto = document.getElementById('homePhoto');
  const aboutPhoto = document.getElementById('aboutPhoto');
  [homePhoto, aboutPhoto].forEach(img => {
    if (!img) return;
    img.addEventListener('click', () => {
      window.openModal(img.src, 'Profile photo (click outside or Esc to close)');
    });
  });

  // FORM handling (client form)
  const clientForm = document.getElementById('clientForm');
  const formNote = document.getElementById('formNote');
  clientForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // simple validation
    const name = clientForm.clientName.value.trim();
    const email = clientForm.clientEmail.value.trim();
    const phone = clientForm.clientPhone.value.trim();
    const desc = clientForm.projectDesc.value.trim();

    if (!name || !email) {
      formNote.textContent = 'Please provide at least your name and email.';
      formNote.style.color = '#ffbaba';
      return;
    }

    // Simulate sending (you can hook to an API or email provider)
    const payload = { name, email, phone, desc, time: new Date().toISOString() };
    console.log('Client request:', payload);

    formNote.textContent = 'Thanks! Your message has been received (demo). I will contact you soon.';
    formNote.style.color = '#b9f5d0';
    clientForm.reset();
  });

  // Smooth reveal on scroll (basic)
  const revealEls = document.querySelectorAll('section, .card, .skill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });

});

