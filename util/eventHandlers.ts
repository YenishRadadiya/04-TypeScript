export function handleButtonClick(parent_element_id:string, element_class:string, callback: (event: MouseEvent) =>  void) {
    (document.getElementById(parent_element_id) as HTMLElement).addEventListener('click', (e:MouseEvent) => {
        if (element_class === '' || (e.target as HTMLButtonElement).classList.contains(element_class)) {
            callback(e);
        }
    });
}

export function handleKeyPress(
    element_id: string,
    callback: (event: KeyboardEvent) => void // Callback expects a KeyboardEvent parameter
) {
    const element = document.getElementById(element_id) as HTMLElement | null;

    if (!element) {
        console.warn(`Element with ID '${element_id}' not found.`);
        return;
    }

    element.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            callback(e); // Pass the event to the callback
        }
    });
}

