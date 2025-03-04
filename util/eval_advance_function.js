function evaluateFunctions(expression) {
    expression = expression.replace(/\bpi\b/g, Math.PI.toString());
    expression = expression.replace(/\be\b/g, Math.E.toString());
    return expression.replace(/(sin|cos|tan|log|sqrt)\((-?\d+(\.\d+)?)\)/g, (match, func, num) => {
        let num1 = parseFloat(num) ?? 0;
        switch (func) {
            case "sin": return Math.sin(num1 * Math.PI / 180).toFixed(4);
            case "cos": return Math.cos(num1 * Math.PI / 180).toFixed(4);
            case "tan": return Math.tan(num1 * Math.PI / 180).toFixed(4);
            case "log": return (Math.log(num1) / Math.LN10).toFixed(4);
            case "sqrt": return Math.sqrt(num1).toFixed(4);
            default: return match;
        }
    });
}
export { evaluateFunctions };
