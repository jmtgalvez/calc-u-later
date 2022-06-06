const $display = document.querySelector(`#display`);
let operand1 = null;  // save first operand to memory
let operation = null; // save operation to memory
let clearDisplay = true; // true if next digit input should clear display; operation input should not clear display
let activeInput = true; // flag for sleep delay because Calc U LATER...

document.addEventListener("keydown", e => {
    if (!activeInput) return null;
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
    if (!activeInput) return null;
    let current = $display.innerText;
    // filter decimal input
    if (digit === '.' && !current.includes('.')) {
        // display "0."" instead of just adding decimal
        if (clearDisplay || current == '0') {
            $display.innerText = '0';
            clearDisplay = false;
        }
        $display.innerText += '.';
        return null;
    }
    // ignore 00 if display is just 0
    if (digit == '00' && current == '0') return null;
    // prevent leading zeroes
    if (clearDisplay || current == 0) {
        current = "";
        clearDisplay = false;
    }
    // set max length of 22 characters
    if (current.length > 22) return null;
    if (current) $display.innerText += digit;
    else $display.innerText = digit;
}

function clearCalc(type) {
    if (!activeInput) return null;
    switch(type) {
        // for backspace; remove last digit
        case "single":  $display.innerText = ($display.innerText.length == 1 || ($display.innerText.length == 2 && $display.innerText[0] == '-')) ? '0' : $display.innerText.slice(0, -1);
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
    if (!activeInput) return null;
    let result;
    let operand2 = parseFloat($display.innerText);
    // no initial input or input after AC / C
    if (!(isNaN(operand1) || operand1 === null) && !clearDisplay) {
        if (operation === "+") result = add(operand1, operand2);
        if (operation === "-") result = subtract(operand1, operand2);
        if (operation === "*") result = multiply(operand1, operand2);
        if (operation === "÷" && operand2 != 0) result = divide(operand1, operand2);
    }
    else if (isNaN(operand1) || operand1 == null) {
        operand1 = operand2;
    }
    operation = func;
    clearDisplay = true;
    if (result || result == 0) {
        operand1 = func === '=' ? null : result;
        // DELAY because Calc U LATER...
        if (func === '=') {
            activeInput = false;
            setTimeout( () => {
                $display.innerText = result;
                activeInput = true;
            }, Math.floor((Math.random() * 15))*100  + 500);
        }
        else 
            $display.innerText = result;
    }
}

const add = (num1, num2) => { return parseFloat(num1+num2);}
const subtract = (num1, num2) => { return parseFloat(num1-num2);}
const multiply = (num1, num2) => { return parseFloat(num1*num2);}
const divide = (num1, num2) => { return parseFloat(num1/num2);}