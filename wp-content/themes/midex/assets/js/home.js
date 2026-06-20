(function () {
	'use strict';

	/* ── Hero slider ── */
	const slider = document.querySelector('[data-midex-slider]');
	if (slider) {
		const panels = slider.querySelectorAll('[data-slide-panel]');
		const contents = slider.querySelectorAll('[data-slide-content]');
		const dots = slider.querySelectorAll('.hero-dot');
		let current = 0;
		let timer;

		function goTo(index) {
			current = index;
			panels.forEach((p, i) => {
				p.classList.toggle('opacity-100', i === index);
				p.classList.toggle('z-10', i === index);
				p.classList.toggle('opacity-0', i !== index);
				p.classList.toggle('z-0', i !== index);
			});
			contents.forEach((c, i) => c.classList.toggle('hidden', i !== index));
			dots.forEach((d, i) => {
				d.classList.toggle('w-8', i === index);
				d.classList.toggle('bg-midex-mint', i === index);
				d.classList.toggle('w-2', i !== index);
				d.classList.toggle('bg-white/40', i !== index);
			});
		}

		function next() {
			goTo((current + 1) % panels.length);
		}

		function startAutoplay() {
			clearInterval(timer);
			timer = setInterval(next, 7000);
		}

		dots.forEach((dot) => {
			dot.addEventListener('click', () => {
				goTo(Number(dot.dataset.slide));
				startAutoplay();
			});
		});

		if (panels.length > 1) startAutoplay();
	}

	/* ── Scroll reveal ── */
	const revealEls = document.querySelectorAll('.mx-reveal');
	if (revealEls.length && 'IntersectionObserver' in window) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
		);
		revealEls.forEach((el) => observer.observe(el));
	}

	/* ── Animated counters ── */
	const counters = document.querySelectorAll('[data-count]');
	if (counters.length && 'IntersectionObserver' in window) {
		const countObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					const el = entry.target;
					const target = parseInt(el.dataset.count, 10);
					const duration = 2000;
					const start = performance.now();

					function tick(now) {
						const progress = Math.min((now - start) / duration, 1);
						const eased = 1 - Math.pow(1 - progress, 3);
						el.textContent = Math.floor(eased * target).toLocaleString();
						if (progress < 1) requestAnimationFrame(tick);
						else el.textContent = target.toLocaleString();
					}

					requestAnimationFrame(tick);
					countObserver.unobserve(el);
				});
			},
			{ threshold: 0.5 }
		);
		counters.forEach((c) => countObserver.observe(c));
	}

	/* ── Event lightbox ── */
	const lightbox = document.querySelector('[data-event-lightbox]');
	const lightboxImg = document.querySelector('[data-event-lightbox-img]');

	if (lightbox && lightboxImg) {
		document.querySelectorAll('[data-event-open]').forEach((btn) => {
			btn.addEventListener('click', () => {
				lightboxImg.src = btn.dataset.eventOpen;
				lightbox.classList.remove('hidden');
				lightbox.classList.add('flex');
				lightbox.setAttribute('aria-hidden', 'false');
				document.body.style.overflow = 'hidden';
			});
		});

		const closeLightbox = () => {
			lightbox.classList.add('hidden');
			lightbox.classList.remove('flex');
			lightbox.setAttribute('aria-hidden', 'true');
			lightboxImg.src = '';
			document.body.style.overflow = '';
		};

		lightbox.querySelector('[data-event-close]')?.addEventListener('click', closeLightbox);
		lightbox.addEventListener('click', (e) => {
			if (e.target === lightbox) closeLightbox();
		});
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox();
		});
	}

	/* ── Mobile nav ── */
	const navToggle = document.querySelector('[data-midex-nav-toggle]');
	const navPanel = document.querySelector('[data-midex-nav-panel]');
	const siteHeader = document.querySelector('[data-midex-header]');

	const closeMobileNav = () => {
		if (!navPanel || !navToggle) return;
		navPanel.classList.add('hidden');
		navToggle.setAttribute('aria-expanded', 'false');
		navToggle.querySelector('[data-icon-open]')?.classList.remove('hidden');
		navToggle.querySelector('[data-icon-close]')?.classList.add('hidden');
		siteHeader?.classList.remove('is-menu-open');
		document.body.classList.remove('overflow-hidden');
	};

	if (navToggle && navPanel) {
		const iconOpen = navToggle.querySelector('[data-icon-open]');
		const iconClose = navToggle.querySelector('[data-icon-close]');

		navToggle.addEventListener('click', () => {
			const isOpening = navPanel.classList.contains('hidden');
			navPanel.classList.toggle('hidden');
			navToggle.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
			iconOpen?.classList.toggle('hidden', isOpening);
			iconClose?.classList.toggle('hidden', !isOpening);
			siteHeader?.classList.toggle('is-menu-open', isOpening);
			document.body.classList.toggle('overflow-hidden', isOpening);
		});

		navPanel.querySelectorAll('[data-mobile-nav-toggle]').forEach((toggle) => {
			toggle.addEventListener('click', () => {
				const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
				const sub = toggle.closest('.midex-mobile-nav__item')?.querySelector('.midex-mobile-nav__sub');
				const chevron = toggle.querySelector('[data-chevron]');

				if (!isExpanded) {
					navPanel.querySelectorAll('[data-mobile-nav-toggle]').forEach((other) => {
						if (other === toggle) return;
						other.setAttribute('aria-expanded', 'false');
						other.closest('.midex-mobile-nav__item')?.querySelector('.midex-mobile-nav__sub')?.classList.add('hidden');
						other.querySelector('[data-chevron]')?.classList.remove('rotate-180');
					});
				}

				toggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
				sub?.classList.toggle('hidden', isExpanded);
				chevron?.classList.toggle('rotate-180', !isExpanded);
			});
		});

		navPanel.querySelectorAll('a').forEach((link) => {
			link.addEventListener('click', closeMobileNav);
		});

		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1024) closeMobileNav();
		});
	}

	const header = siteHeader;
	if (header) {
		const isOverlay = header.classList.contains('midex-header--overlay');

		const updateHeader = () => {
			const scrolled = window.scrollY > 20;

			if (isOverlay) {
				header.classList.toggle('is-scrolled', scrolled);
				return;
			}

			header.classList.toggle('shadow-lg', scrolled);
			header.classList.toggle('shadow-midex-navy/5', scrolled);
		};

		updateHeader();
		window.addEventListener('scroll', updateHeader, { passive: true });
	}
})();
