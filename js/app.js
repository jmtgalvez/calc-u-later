const $display = document.querySelector(`#display`);
const OPERATIONS = "+-*÷";
let operand1 = null, operand2 = null, operation = null, clearDisplay = true;

function addDigit(digit) {
    if (clearDisplay) {
        $display.innerText = null;
        clearDisplay = false;
    }
    let current = $display.innerText;
    if (current.length > 20) return null;
    if (current) $display.innerText += (digit === '.' && current.includes('.')) ? '' : digit;
    else $display.innerText = digit;
}

function clearCalc(type) {
    switch(type) {
        case "AC":  operand1 = null;
                    operation = null;
        case "C":   operand2 = null;
                    $display.innerText = null;
        default:    return null;
    }
}

function calculatorFn(func) {
    operand2 = parseFloat($display.innerText);
    if (isNaN(operand2)) return null;
    if (isNaN(operand1) || operand1 == null) {
        operand1 = operand2;
        operand2 = null;
    }
    if (clearDisplay && OPERATIONS.includes(operation)) {
        operation = func;
    } else if (OPERATIONS.includes(operation)) {
        let result;
        if (operation === "+") result = add(operand1, operand2);
        if (operation === "-") result = subtract(operand1, operand2);
        if (operation === "*") result = multiply(operand1, operand2);
        if (operation === "÷" && operand2 != 0) result = divide(operand1, operand2);
        operation = func === '=' ? null : func;
        clearDisplay = true;
        if (result) {
            operand1 = func === '=' ? null : result;
            $display.innerText = result;
        }
    } else if (OPERATIONS.includes(func)) {
        operation = func;
        clearDisplay = true;
    }
}

const add = (num1, num2) => { return num1 + num2;}
const subtract = (num1, num2) => { return num1 - num2;}
const multiply = (num1, num2) => { return num1 * num2;}
const divide = (num1, num2) => { return num1 / num2;}