function validateExpression(expression) {
    expression = expression.toLowerCase().trim(); // Normalize case & remove leading/trailing spaces
    // Disallow invalid sequences like `++`, `--`, `*/`, `^/`, etc.
    if (/[\+\-\*\/%\^]{2,}/.test(expression)) {
        alert("Invalid operator sequence detected!");
        throw new Error("Invalid operator sequence detected!");
    }
    // Ensure valid parentheses usage
    let openBrackets = (expression.match(/\(/g) || []).length;
    let closeBrackets = (expression.match(/\)/g) || []).length;
    if (openBrackets !== closeBrackets) {
        alert("Mismatched parentheses!");
        throw new Error("Mismatched parentheses!");
    }
    // Disallow operators at the start (except leading `-` for negatives)
    if (/^[\+\*\/%\^]/.test(expression)) {
        alert("Expression cannot start with an operator (except `-`).");
        throw new Error("Expression cannot start with an operator (except `-`).");
    }
    // Disallow operators at the end
    if (/[\+\-\*\/%\^]$/.test(expression)) {
        alert("Expression cannot end with an operator.");
        throw new Error("Expression cannot end with an operator.");
    }
    // Ensure valid decimal number format (e.g., prevent `5.6.7` or `..5`)
    if (/\d*\.\d*\./.test(expression)) {
        alert("Invalid decimal format detected!");
        throw new Error("Invalid decimal format detected!");
    }
    // Ensure valid function calls (e.g., `sin(30)`, not `sin30`)
    if (/(sin|cos|tan|log)(\d+)/.test(expression)) {
        alert("Invalid function usage! Use parentheses (e.g., sin(30)).");
        throw new Error("Invalid function usage! Use parentheses (e.g., sin(30)).");
    }
    // Ensure valid use of numbers before functions (e.g., `3sin(30)` is invalid)
    if (/\d+(sin|cos|tan|log)/.test(expression)) {
        alert("Missing operator before function! Use `3*sin(30)`.");
        throw new Error("Missing operator before function! Use `3*sin(30)`.");
    }
    // Prevent operators right before closing parentheses (e.g., `sin(30+)`)
    if (/\([\+\*\/%\^]/.test(expression)) {
        alert("Operator directly after opening parenthesis is invalid!");
        throw new Error("Operator directly after opening parenthesis is invalid!");
    }
    return expression; // If valid, return unchanged
}
export { validateExpression };
