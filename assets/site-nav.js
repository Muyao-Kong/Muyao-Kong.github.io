const navbar = document.querySelector("#navbar");

if (navbar) {
    const menuToggle = navbar.querySelector(".menu-toggle");
    const navMenu = navbar.querySelector(".nav-menu");
    const dropdownItems = navbar.querySelectorAll(".nav-item--dropdown");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const closeDropdowns = () => {
        dropdownItems.forEach(item => {
            item.classList.remove("is-open");
            item.querySelector(".nav-group-toggle")?.setAttribute("aria-expanded", "false");
        });
    };

    const closeMenu = () => {
        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Open navigation");
        navMenu?.classList.remove("is-open");
        closeDropdowns();
    };

    menuToggle?.addEventListener("click", () => {
        const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
        menuToggle.setAttribute("aria-expanded", String(willOpen));
        menuToggle.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
        navMenu?.classList.toggle("is-open", willOpen);

        if (!willOpen) {
            closeDropdowns();
        }
    });

    dropdownItems.forEach(item => {
        const toggle = item.querySelector(".nav-group-toggle");

        toggle?.addEventListener("click", event => {
            event.stopPropagation();
            const willOpen = !item.classList.contains("is-open");

            closeDropdowns();
            item.classList.toggle("is-open", willOpen);
            toggle.setAttribute("aria-expanded", String(willOpen));

            if (!willOpen && !mobileQuery.matches) {
                toggle.blur();
            }
        });
    });

    navbar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            if (mobileQuery.matches) {
                closeMenu();
            }
        });
    });

    document.addEventListener("click", event => {
        if (!navbar.contains(event.target)) {
            closeDropdowns();
            if (mobileQuery.matches) {
                closeMenu();
            }
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            const wasMobile = mobileQuery.matches;
            closeMenu();

            if (wasMobile) {
                menuToggle?.focus();
            } else if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        }
    });

    if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", closeMenu);
    } else {
        mobileQuery.addListener(closeMenu);
    }
}
