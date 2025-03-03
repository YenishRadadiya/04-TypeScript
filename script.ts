import Calculator from "./util/Calculator.js";
import { handleButtonClick, handleKeyPress } from "./util/eventHandlers.js";
import { handleTheme } from "./util/theme.js";
import { display_history, clear_history } from "./util/history.js";

const display_text: HTMLInputElement = document.getElementById('display') as HTMLInputElement;
const calculator: Calculator = new Calculator(display_text);

// Number and operation buttons
handleButtonClick('calc_content', 'data-number', (e: Event) =>
    calculator.appendToDisplay((e.target as HTMLInputElement).value));


handleButtonClick('calc_content', 'data-opreations', (e: Event) =>
    calculator.appendToDisplay((e.target as HTMLInputElement).value));

handleButtonClick('calc_content', 'data-opreations_so', (e: Event) => {
    let val: string = (e.target as HTMLInputElement).value + '(';
    calculator.appendToDisplay(val);
});


handleButtonClick('calc_content', 'data-opreations_sc', (e: Event) => {
    let value = (e.target as HTMLInputElement).value;
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
handleKeyPress('display', (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        calculator.calculate();
    }
});
