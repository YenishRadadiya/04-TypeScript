import { validateExpression } from './validate_exp.js';
import { evaluateFunctions } from './eval_advance_function.js';
import { evaluate } from './eval.js';

interface Expression {
    id: number;
    expression: string;
}

class Calculator {
    private displayElement: HTMLInputElement;
    private history: Expression[];
    private count: number = 1;

    constructor(displayElement: HTMLInputElement) {
        this.displayElement = displayElement;
        this.history = [];

        // Retrieve count from localStorage (default to 1 if not set)
        // this.count = Number(localStorage.getItem("calc_count")) || 1;

        this.clearDisplay();
    }
    addHistory(expr: string, count: number) {
        let exp: Expression = {
            id: count,
            expression: expr,
        }
        this.history.push(exp);
        localStorage.setItem('calc_hist', JSON.stringify(this.history))
        // let arr: Expression = localStorage.getItem('calc_hist');

    }

    insertAtCursor(displayElement: HTMLInputElement, data: string): void {
        let text_value: string = displayElement.value;
        let pos_curr: number = displayElement.selectionStart ?? 0;
        let pos_end: number = displayElement.selectionEnd ?? 0;
        displayElement.value = text_value.slice(0, pos_curr) + data + text_value.slice(pos_end);
        displayElement.focus();
        displayElement.setSelectionRange(pos_curr + data.length, pos_curr + data.length);
    }
    appendToDisplay(value: string): void {
        this.insertAtCursor(this.displayElement, value);
    }

    clearDisplay(): void {
        this.displayElement.value = '';
    }

    backspace(): void {
        // this.displayElement.value = this.displayElement.value.slice(0, -1);
        let dis_text: string = this.displayElement.value;
        let curr: number = this.displayElement.selectionStart ?? 0;
        let end: number = this.displayElement.selectionEnd ?? 0;

        // Ensure cursor isn't at the start to prevent negative index issues
        if (curr > 0) {
            this.displayElement.value = dis_text.slice(0, curr - 1) + dis_text.slice(end);
            this.displayElement.setSelectionRange(curr - 1, curr - 1);
        }

        // Keep focus on input field
        this.displayElement.focus();

    }

    calculate(): void {
        let expression: string = validateExpression(this.displayElement.value);
        expression = evaluateFunctions(expression);

        let result: number = evaluate(expression) ?? 0; // Ensure result is never undefined
        let final_res: string;

        if (typeof result === "number") {
            final_res = result.toString(); // Convert number to string
            this.displayElement.value = final_res;
            this.addHistory(expression + " " + "=" + final_res, this.count)
            this.count++;
            // this.history.push(final_res);
            // localStorage.setItem(this.count.toString(), final_res);
            // localStorage.setItem("calc_count", this.count.toString());
            // Update count in localStorage
        }
    }

}

export default Calculator;
