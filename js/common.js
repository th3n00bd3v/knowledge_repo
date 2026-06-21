const themeToggle =
document.getElementById("themeToggle");

const sidebar =
document.querySelector(".sidebar");

const sidebarHeader =
document.querySelector(".sidebar-header");

if (sidebar && sidebarHeader) {

    const brand =
    document.createElement("div");

    brand.className = "sidebar-brand";

    while (sidebarHeader.firstChild) {
        brand.appendChild(sidebarHeader.firstChild);
    }

    const sidebarToggle =
    document.createElement("button");

    sidebarToggle.className = "sidebar-toggle";
    sidebarToggle.type = "button";
    sidebarToggle.setAttribute("aria-label", "Toggle sidebar");
    sidebarToggle.innerHTML = "<span></span><span></span><span></span>";

    sidebarHeader.appendChild(brand);
    sidebarHeader.appendChild(sidebarToggle);

    const savedSidebarState =
    localStorage.sidebar;

    const shouldStartCollapsed =
    savedSidebarState === "collapsed" ||
    (!savedSidebarState &&
        window.matchMedia("(max-width: 768px)").matches);

    if (shouldStartCollapsed) {
        sidebar.classList.add("is-collapsed");
    }

    sidebarToggle.setAttribute(
        "aria-expanded",
        String(!sidebar.classList.contains("is-collapsed"))
    );

    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("is-collapsed");

        const isExpanded =
        !sidebar.classList.contains("is-collapsed");

        sidebarToggle.setAttribute(
            "aria-expanded",
            String(isExpanded)
        );

        localStorage.sidebar =
        isExpanded ? "expanded" : "collapsed";
    });
}

if(localStorage.theme === "dark"){
    document.documentElement.classList.add("dark");
}

updateThemeButton();

themeToggle?.addEventListener("click", () => {

    document.documentElement.classList.toggle("dark");

    localStorage.theme =
    document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

    updateThemeButton();

});

function updateThemeButton(){

    if(!themeToggle) return;

    themeToggle.innerHTML =
    document.documentElement.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";

}
