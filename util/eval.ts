function prec(c: string) {
    if (c === "^") return 3;
    else if (c === "/" || c === "*" || c === "%") return 2;
    else if (c === "+" || c === "-") return 1;
    else return -1;
}

// Function to perform infix to postfix conversion
function infixToPostfix(s: string) {
    let st: string[] = [];
    let result: string = "";
    let number: string = "";
    let prevChar: string = "";

    for (let i = 0; i < s.length; i++) {
        let c: string = s[i];

        // Handle negative numbers, including cases like (-5)
        if (c === "-" && (i === 0 || /[\+\-\*\/\^\(\%]/.test(prevChar))) {
            number = "-";
            i++;
            while (i < s.length && ((s[i] >= "0" && s[i] <= "9") || s[i] === ".")) {
                number += s[i];
                i++;
            }
            result += number + " ";
            i--;
        }
        // Handle numbers
        else if ((c >= "0" && c <= "9") || c === ".") {
            number = c;
            while (i + 1 < s.length && ((s[i + 1] >= "0" && s[i + 1] <= "9") || s[i + 1] === ".")) {
                number += s[i + 1];
                i++;
            }
            result += number + " ";
        }
        // Handle operators and parentheses
        else if (c === "(") {
            st.push(c);
        } else if (c === ")") {
            while (st.length && st[st.length - 1] !== "(") {
                result += st.pop() + " ";
            }
            st.pop(); // Remove '('
        } else {
            while (st.length && prec(c) <= prec(st[st.length - 1])) {
                result += st.pop() + " ";
            }
            st.push(c);
        }

        prevChar = c;
    }

    // Pop remaining operators
    while (st.length) {
        result += st.pop() + " ";
    }

    return result.trim();
}

// Function to evaluate postfix expression
function evaluatePostfix(exp: string) {
    let stack: number[] = [];
    let tokens: string[] = exp.split(/\s+/);

    for (let token of tokens) {
        if (!isNaN(Number(token))) {
            stack.push(parseFloat(token));
        } else {
            let val1: number = stack.pop() ?? 0;
            let val2: number = stack.pop() ?? 0;

            switch (token) {
                case "+":
                    stack.push(val2 + val1);
                    break;
                case "-":
                    stack.push(val2 - val1);
                    break;
                case "/":
                    if (val1 === 0) {
                        alert("Error: Division by zero");
                        // return "Error";
                    }
                    stack.push(val2 / val1);
                    break;
                case "*":
                    stack.push(val2 * val1);
                    break;
                case "^":
                    stack.push(val2 ** val1);
                    break;
                case "%":
                    if (val1 === 0) {
                        alert("Error: Modulus by zero");
                        // return "Error";
                    }
                    stack.push(val2 % val1);
                    break;
            }
        }
    }
    let rawValue = stack.pop(); // Might be undefined
    let result: number;

    if (rawValue === undefined || isNaN(Number(rawValue))) {
        result = 0; // Default value
    } else {
        result = parseFloat(Number(rawValue).toFixed(4)); // Ensures it's a number
    }
    return result;

}

function evaluate(expression: string) {
    let postfix: string = infixToPostfix(expression);
    return evaluatePostfix(postfix);
}
export { evaluate };