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

// Skill filters are generated from the real category headings, not a second list.
const skillSection = document.querySelector('#skills');
const filterBar = document.querySelector('.skill-filters');
const skillGroups = [...document.querySelectorAll('#skills .skill-group')];
if (skillSection && filterBar && skillGroups.length) {
    const choices = ['All skills', ...skillGroups.map(group => group.querySelector('h3').textContent)];
    choices.forEach((label, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.setAttribute('aria-pressed', String(index === 0));
        button.addEventListener('click', () => {
            skillGroups.forEach((group, groupIndex) => {
                group.hidden = index !== 0 && groupIndex !== index - 1;
            });
            filterBar.querySelectorAll('button').forEach(control => {
                control.setAttribute('aria-pressed', String(control === button));
            });
            skillSection.dataset.filtered = String(index !== 0);
        });
        filterBar.append(button);
    });
    // Without JavaScript, every skill group remains available in the page.
    filterBar.hidden = false;
}

// Highlight the current chapter and show reading progress without altering scrolling.
const pageSections = [...document.querySelectorAll('main > section[id]')];
const sectionLinks = [...document.querySelectorAll('#main-navigation a')];
let navigationFrame = false;
function updateReadingPosition() {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
    header?.style.setProperty('--reading-progress', progress);
    let current = pageSections[0];
    const marker = (header?.getBoundingClientRect().height || 70) + 80;
    pageSections.forEach(section => {
        if (section.getBoundingClientRect().top <= marker) current = section;
    });
    if (progress > 0.995) current = pageSections[pageSections.length - 1];
    sectionLinks.forEach(link => {
        if (link.hash === '#' + current?.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
    navigationFrame = false;
}
function scheduleNavigationUpdate() {
    if (!navigationFrame) {
        navigationFrame = true;
        requestAnimationFrame(updateReadingPosition);
    }
}
window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
window.addEventListener('load', scheduleNavigationUpdate);
filterBar?.addEventListener('click', scheduleNavigationUpdate);
updateReadingPosition();
