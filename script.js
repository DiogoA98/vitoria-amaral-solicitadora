document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const sidebar = document.getElementById("sidebar");
    const sidebarClose = document.getElementById("sidebarClose");
    const menuOverlay = document.getElementById("menuOverlay");

    const navigationItems = document.querySelectorAll(".navigation-item");
    const pageSections = document.querySelectorAll(".page-section");
    const openSectionButtons = document.querySelectorAll(
        "[data-open-section]"
    );

    function openMenu() {
        sidebar.classList.add("open");
        menuOverlay.classList.add("visible");
        menuButton.classList.add("open");

        menuButton.setAttribute("aria-expanded", "true");
        sidebar.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        sidebar.classList.remove("open");
        menuOverlay.classList.remove("visible");
        menuButton.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");
        sidebar.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";
    }

    function showSection(sectionId) {
        pageSections.forEach(function (section) {
            section.classList.remove("active");
        });

        navigationItems.forEach(function (item) {
            item.classList.remove("active");
        });

        const selectedSection = document.getElementById(sectionId);

        const selectedNavigationItem = document.querySelector(
            `.navigation-item[data-section="${sectionId}"]`
        );

        if (selectedSection) {
            selectedSection.classList.add("active");
        }

        if (selectedNavigationItem) {
            selectedNavigationItem.classList.add("active");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        closeMenu();
    }

    menuButton.addEventListener("click", function () {
        const menuIsOpen = sidebar.classList.contains("open");

        if (menuIsOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    sidebarClose.addEventListener("click", closeMenu);

    menuOverlay.addEventListener("click", closeMenu);

    navigationItems.forEach(function (item) {
        item.addEventListener("click", function () {
            const sectionId = item.dataset.section;
            showSection(sectionId);
        });
    });

    openSectionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const sectionId = button.dataset.openSection;
            showSection(sectionId);
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
});
