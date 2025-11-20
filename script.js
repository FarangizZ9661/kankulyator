// script.js
class Calculator {
    constructor() {
        this.display = document.querySelector('.display');
        this.clear();
        this.setupEventListeners();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    toggleSign() {
        if (this.currentOperand === '') return;
        this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
        this.updateDisplay();
    }

    percentage() {
        if (this.currentOperand === '') return;
        this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.value = this.currentOperand;
    }

    setupEventListeners() {
        // Number buttons
        document.querySelectorAll('.number-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.getAttribute('data-number'));
            });
        });

        // Operation buttons
        document.querySelectorAll('.operation-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.chooseOperation(button.getAttribute('data-operation'));
            });
        });

        // Function buttons
        document.querySelectorAll('.function-btn').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('data-action');
                if (action === 'clear') {
                    this.clear();
                } else if (action === 'toggle-sign') {
                    this.toggleSign();
                } else if (action === 'percent') {
                    this.percentage();
                }
            });
        });

        // Equals button
        document.querySelector('.equals-btn').addEventListener('click', () => {
            this.compute();
        });

        // Keyboard support
        document.addEventListener('keydown', (event) => {
            if (/[0-9]/.test(event.key)) {
                this.appendNumber(event.key);
            } else if (event.key === '.') {
                this.appendNumber('.');
            } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
                this.chooseOperation(event.key);
            } else if (event.key === 'Enter' || event.key === '=') {
                this.compute();
            } else if (event.key === 'Escape') {
                this.clear();
            } else if (event.key === 'Backspace') {
                this.delete();
            }
        });
    }
}

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});