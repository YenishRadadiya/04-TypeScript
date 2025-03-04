const history_button = document.getElementById('btn-history');
const history_div = document.getElementById('display_history');
const history_content = document.getElementById('history_content');
function load_history() {
    if (!history_content) {
        console.warn("History content element not found!");
        return;
    }
    history_content.innerHTML = ''; // Clear previous history
    // Retrieve and parse history from localStorage
    let hist = localStorage.getItem('calc_hist');
    if (hist) {
        let historyArray = JSON.parse(hist); // Convert back to array
        historyArray.forEach((exp) => {
            let p = document.createElement('p');
            p.textContent = exp.expression; // Display only the expression
            history_content.appendChild(p);
        });
    }
}
function display_history() {
    if (!history_button || !history_div) {
        console.warn("History button or display container not found!");
        return;
    }
    history_button.addEventListener('click', () => {
        if (history_div.style.display === 'none' || history_div.style.display === '') {
            history_div.style.display = 'block';
            load_history(); // Always load history when opening
        }
        else {
            history_div.style.display = 'none';
        }
    });
}
function clear_history() {
    if (!history_content) {
        console.warn("History content element not found!");
        return;
    }
    // Remove only history-related items from localStorage (keep 'theme')
    Object.keys(localStorage).forEach(key => {
        if (key !== 'theme') {
            localStorage.removeItem(key);
        }
    });
    load_history(); // Refresh the history display
}
export { clear_history, display_history };
