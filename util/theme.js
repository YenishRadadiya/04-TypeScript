function handleTheme() {
    const themeToggle = document.getElementById("checkbox");
    const buttonContainer = document.querySelector(".calc_buttons");
    if (!themeToggle) {
        console.warn("Theme toggle element not found!");
        return;
    }
    // Apply stored theme preference
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
        themeToggle.checked = true;
    }
    // Toggle theme on checkbox change
    themeToggle.addEventListener("change", () => {
        document.body.classList.toggle("light-theme");
        localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
    });
    // Event delegation for buttons
    if (buttonContainer) {
        buttonContainer.addEventListener("click", (event) => {
            const target = event.target;
            if (target.tagName === "BUTTON") {
                console.log("Button Clicked:", target.value);
            }
        });
    }
    else {
        console.warn("Button container not found!");
    }
}
export { handleTheme };
