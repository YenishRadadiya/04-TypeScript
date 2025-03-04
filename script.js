import Calculator from "./util/Calculator.js";
import { handleButtonClick, handleKeyPress } from "./util/eventHandlers.js";
import { handleTheme } from "./util/theme.js";
import { display_history, clear_history } from "./util/history.js";
const display_text = document.getElementById('display');
const calculator = new Calculator(display_text);
// Number and operation buttons
handleButtonClick('calc_content', 'data-number', (e) => calculator.appendToDisplay(e.target.value));
handleButtonClick('calc_content', 'data-opreations', (e) => calculator.appendToDisplay(e.target.value));
handleButtonClick('calc_content', 'data-opreations_so', (e) => {
    let val = e.target.value + '(';
    calculator.appendToDisplay(val);
});
handleButtonClick('calc_content', 'data-opreations_sc', (e) => {
    let value = e.target.value;
    value = value === '-' ? '+' : '-'; // Toggle sign
    calculator.appendToDisplay(value);
});
// Calculation and display handling
handleButtonClick('calc_content', 'eqals', () => calculator.calculate());
handleButtonClick('calc_content', 'clear', () => calculator.clearDisplay());
handleButtonClick('calc_content', 'back_space', () => calculator.backspace());
// Theme handling
handleButtonClick('calc-header', 'checkbox', handleTheme);
// History management
handleButtonClick('history_header', 'btn_clr_history', clear_history);
handleButtonClick('btn-history', '', display_history);
// Handling keypress (Now properly checking Enter key)
handleKeyPress('display', (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        calculator.calculate();
    }
});
