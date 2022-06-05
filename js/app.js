const $body = document.querySelector(`body`);
const $display = document.querySelector(`#display`);
const OPERATIONS = "+-*÷";
let operand1 = null, operand2 = null, operation = null, clearDisplay = true;

document.addEventListener("keydown", e => {
    if (e.key === '1') addDigit(1);
    if (e.key === '2') addDigit(2);
    if (e.key === '3') addDigit(3);
    if (e.key === '4') addDigit(4);
    if (e.key === '5') addDigit(5);
    if (e.key === '6') addDigit(6);
    if (e.key === '7') addDigit(7);
    if (e.key === '8') addDigit(8);
    if (e.key === '9') addDigit(9);
    if (e.key === '0') addDigit(0);
    if (e.key === '+') performOperation('+');
    if (e.key === '-') performOperation('-');
    if (e.key === '*') performOperation('*');
    if (e.key === '÷') performOperation('÷');
    if (e.key === '=' || e.key === 'Enter') performOperation('=');
    if (e.key === 'Backspace') clearCalc("single");
});

function addDigit(digit) {
    let current = $display.innerText;
    if (digit === '.' && !current.includes('.')) {
        if (clearDisplay || current == '0') {
            $display.innerText = '0';
            clearDisplay = false;
        }
        $display.innerText += '.';
        return null;
    }
    if (clearDisplay || current == '0') {
        $display.innerText = null;
        clearDisplay = false;
    }
    current = $display.innerText;
    if (current.length > 22) return null;
    if (current) $display.innerText += digit;
    else $display.innerText = digit;
}

function clearCalc(type) {
    switch(type) {
        case "single":  $display.innerText = $display.innerText.slice(0, -1);
                        return null;
        case "AC":      operand1 = null;
                        operand2 = null;
                        operation = null;
        case "C":       $display.innerText = 0;
                        clearDisplay = true;
        default:        return null;
    }
}

function performOperation(func) {
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
        if (result || result == 0) {
            operand1 = func === '=' ? null : result;
            $display.innerText = result;
        }
    } else if (OPERATIONS.includes(func)) {
        operation = func;
        clearDisplay = true;
    }
}

const add = (num1, num2) => { return parseFloat(num1) + (num2);}
const subtract = (num1, num2) => { return parseFloat(num1) - (num2);}
const multiply = (num1, num2) => { return parseFloat(num1) * (num2);}
const divide = (num1, num2) => { return parseFloat(num1) / (num2);}