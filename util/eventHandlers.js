export function handleButtonClick(parent_element_id, element_class, callback) {
    document.getElementById(parent_element_id).addEventListener('click', (e) => {
        if (element_class === '' || e.target.classList.contains(element_class)) {
            callback(e);
        }
    });
}
export function handleKeyPress(element_id, callback // Callback expects a KeyboardEvent parameter
) {
    const element = document.getElementById(element_id);
    if (!element) {
        console.warn(`Element with ID '${element_id}' not found.`);
        return;
    }
    element.addEventListener("keydown", (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            callback(e); // Pass the event to the callback
        }
    });
}
