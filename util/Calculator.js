import { validateExpression } from './validate_exp.js';
import { evaluateFunctions } from './eval_advance_function.js';
import { evaluate } from './eval.js';
class Calculator {
    constructor(displayElement) {
        this.count = 1;
        this.displayElement = displayElement;
        this.history = [];
        // Retrieve count from localStorage (default to 1 if not set)
        // this.count = Number(localStorage.getItem("calc_count")) || 1;
        this.clearDisplay();
    }
    addHistory(expr, count) {
        let exp = {
            id: count,
            expression: expr,
        };
        this.history.push(exp);
        localStorage.setItem('calc_hist', JSON.stringify(this.history));
        // let arr: Expression = localStorage.getItem('calc_hist');
    }
    insertAtCursor(displayElement, data) {
        let text_value = displayElement.value;
        let pos_curr = displayElement.selectionStart ?? 0;
        let pos_end = displayElement.selectionEnd ?? 0;
        displayElement.value = text_value.slice(0, pos_curr) + data + text_value.slice(pos_end);
        displayElement.focus();
        displayElement.setSelectionRange(pos_curr + data.length, pos_curr + data.length);
    }
    appendToDisplay(value) {
        this.insertAtCursor(this.displayElement, value);
    }
    clearDisplay() {
        this.displayElement.value = '';
    }
    backspace() {
        // this.displayElement.value = this.displayElement.value.slice(0, -1);
        let dis_text = this.displayElement.value;
        let curr = this.displayElement.selectionStart ?? 0;
        let end = this.displayElement.selectionEnd ?? 0;
        // Ensure cursor isn't at the start to prevent negative index issues
        if (curr > 0) {
            this.displayElement.value = dis_text.slice(0, curr - 1) + dis_text.slice(end);
            this.displayElement.setSelectionRange(curr - 1, curr - 1);
        }
        // Keep focus on input field
        this.displayElement.focus();
    }
    calculate() {
        let expression = validateExpression(this.displayElement.value);
        expression = evaluateFunctions(expression);
        let result = evaluate(expression) ?? 0; // Ensure result is never undefined
        let final_res;
        if (typeof result === "number") {
            final_res = result.toString(); // Convert number to string
            this.displayElement.value = final_res;
            this.addHistory(expression + " " + "=" + final_res, this.count);
            this.count++;
            // this.history.push(final_res);
            // localStorage.setItem(this.count.toString(), final_res);
            // localStorage.setItem("calc_count", this.count.toString());
            // Update count in localStorage
        }
    }
}
export default Calculator;
