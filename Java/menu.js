document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const menu = document.querySelector(".menu");
    const menuLinks = document.querySelectorAll(".menu-items a");

    if (hamburgerBtn && menu) {
        // Toggle del menú con el botón hamburguesa
        hamburgerBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevenir que el clic se propague
            hamburgerBtn.classList.toggle("active");
            menu.classList.toggle("active");
        });

        // Cerrar menú cuando se hace clic en un enlace
        menuLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburgerBtn.classList.remove("active");
                menu.classList.remove("active");
            });
        });

        // Cerrar menú cuando se hace clic fuera
        document.addEventListener("click", (event) => {
            if (menu.classList.contains("active") && 
                !menu.contains(event.target) && 
                !hamburgerBtn.contains(event.target)) {
                hamburgerBtn.classList.remove("active");
                menu.classList.remove("active");
            }
        });
    }
});