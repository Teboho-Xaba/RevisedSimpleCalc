document.addEventListener('DOMContentLoaded', function () {
    const outputPrevious = document.querySelector('.previous-operand');
    const outputCurrent = document.querySelector('.current-operand');
    const buttons = document.querySelectorAll('.calculator > button');

    let currentOperand = '';
    let previousOperand = '';
    let operation = undefined;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.innerText === 'AC') {
                clear();
            } else if (button.innerText === 'DEL') {
                deleteLast();
            } else if (button.innerText === '=') {
                compute();
            } else if (button.innerText === '+' || button.innerText === '-' || button.innerText === '*' || button.innerText === '÷') {
                chooseOperation(button.innerText);
            } else {
                appendNumber(button.innerText);
            }
            updateDisplay();
        });
    });
    

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand += number;
    }

    function clear() {
        currentOperand = '';
        previousOperand = '';
        operation = undefined;
    }

    function deleteLast() {
        currentOperand = currentOperand.toString().slice(0, -1);
    }

    function chooseOperation(op) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation;
        operation = undefined;
        previousOperand = '';
    }
    

    function updateDisplay() {
        outputCurrent.innerText = currentOperand;
        outputPrevious.innerText = previousOperand;
    }
});
