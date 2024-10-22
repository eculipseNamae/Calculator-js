const factorial = function (n) {
    if (n === 0) return 1;
    let product = 1;
    for (let i = n; i > 0; i--) {
        product *= i;
    }
    return product;
};

const display = document.querySelector("#display");
display.textContent = "";

const container = document.querySelector("#container");
const equals = document.querySelector(".equality");
const back = document.querySelector(".back");
const operations = '/*-+';
const operationsNoSub = '/*+';

let result = 0;

container.addEventListener('click', e=>{
    if (!(e.target.classList.contains("clear") || e.target === equals || e.target === display)){
        display.textContent += e.target.textContent;
    }
    if (e.target === equals) {
        let content = display.textContent.trim(); // Clean input
    
        // Regex to identify the main operator, while respecting negative signs.
        const operatorRegex = /(?<!^)([+\-*/])/;
        const operatorMatch = content.match(operatorRegex);

        if (!operatorMatch) {
            display.textContent = "Syntax Error";
            console.log('No valid operator found');
            return;
        }
    
        const operator = operatorMatch[1]; // The main operator (+, -, *, /)
        console.log('Operator:', operator);
    
        // Split the content by the main operator, keeping negative numbers intact.
        let [left, right] = content.split(new RegExp(`(?<=\\d)\\${operator}(?=-?\\d)`)).map(Number);
    
        // Check if both sides of the split are valid numbers
        if (isNaN(left) || isNaN(right)) {
            display.textContent = "Syntax Error";
            console.log('Invalid number format');
            return;
        }
    
        console.log('Operands:', left, right);
    
        // Perform the calculation based on the operator
        let result;
        switch (operator) {
            case '+':
                result = left + right;
                break;
            case '-':
                result = left - right;
                break;
            case '*':
                result = left * right;
                break;
            case '/':
                if (right === 0) {
                    display.textContent = "Cannot divide by 0";
                    console.log('Division by zero');
                    return;
                }
                result = left / right;
                break;
            default:
                display.textContent = "Syntax Error";
                console.log('Unknown operator');
                return;
        }
    
        // Display the result
        display.textContent = result;
    }
    
    if (e.target === back){
        display.textContent = display.textContent.slice(0,-1);
    }
    
});