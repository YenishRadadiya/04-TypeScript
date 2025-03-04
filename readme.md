# Calculator

An calculator built using HTML, CSS, and TypeScript. This calculator supports basic arithmetic, advanced mathematical functions, and expression evaluation.

## Features

- Basic Arithmetic Operations: Addition (+), Subtraction (-), Multiplication (\*), Division (/), Modulus (%).

- Advanced Functions: Supports trigonometric functions (sin, cos, tan), logarithm (log), square root (sqrt), exponentiation (^), and constants (π, e).

- Expression Evaluation: Converts infix expressions to postfix and evaluates them efficiently.

- Strict Input Validation: Ensures correct syntax, operator usage, and function calls before processing.

- Decimal Precision: Rounds trigonometric and logarithmic results to 4 decimal places.

- History Feature: Stores and displays previously evaluated expressions and results.

## How it works

- Input Validation: The expression is checked for errors such as invalid operator sequences, mismatched parentheses, and incorrect function usage.

- Function Evaluation: Advanced mathematical functions are evaluated first, converting sin(30), log(10), etc., into numerical values.

- Expression Conversion: The validated infix expression is converted into postfix notation for efficient computation.

- Postfix Evaluation: The postfix expression is processed using a stack to compute the final result.

- Result Display: The computed result is shown on the UI and stored in the history for reference.

## Calculator Demo

https://yenishradadiya.github.io/04-TypeScript/
