// Progressive enhancement: links and content work before this file runs.
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-navigation');
const mobileViewport = window.matchMedia('(max-width: 800px)');

if (header && menuButton && navigation) {
    const setMenuOpen = (open) => {
        navigation.classList.toggle('is-open', open);
        menuButton.setAttribute('aria-expanded', String(open));
    };

    menuButton.addEventListener('click', () => {
        setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
    });
    navigation.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!link) return;
        if (mobileViewport.matches) {
            // The normal anchor handles scrolling and the URL hash. After that
            // browser action, place keyboard focus on the destination heading.
            const section = document.getElementById(link.hash.slice(1));
            const heading = section?.querySelector('h1, h2');
            if (heading) {
                heading.setAttribute('tabindex', '-1');
                requestAnimationFrame(() => heading.focus({ preventScroll: true }));
            }
        }
        setMenuOpen(false);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
            setMenuOpen(false);
            menuButton.focus();
        }
    });
    document.addEventListener('click', (event) => {
        if (!header.contains(event.target)) setMenuOpen(false);
    });
    mobileViewport.addEventListener('change', () => {
        // Avoid leaving keyboard focus inside navigation when resizing hides it.
        const focusWasInside = navigation.contains(document.activeElement);
        setMenuOpen(false);
        if (mobileViewport.matches && focusWasInside) menuButton.focus();
    });

    // Enable collapsing only after the handlers are attached successfully.
    menuButton.hidden = false;
    header.classList.add('nav-enhanced');
}

// Animate on entry, rather than hiding elements in advance.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            if (!reducedMotion.matches) entry.target.classList.add('reveal-enter');
            revealObserver.unobserve(entry.target);
        }
    }, { threshold: 0.08 });

    document.querySelectorAll('main > section:not(#home)').forEach((section) => {
        revealObserver.observe(section);
    });
    reducedMotion.addEventListener('change', () => {
        if (reducedMotion.matches) {
            document.querySelectorAll('.reveal-enter').forEach((element) => {
                element.classList.remove('reveal-enter');
            });
        }
    });
}
