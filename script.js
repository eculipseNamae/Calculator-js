const display = document.querySelector("#display");


const container = document.querySelector("#container");
const equals = document.querySelector(".equality");
const back = document.querySelector(".back");
const clear = document.querySelector(".clearAll");
const operators = document.querySelectorAll(".operators");
const nums = document.querySelectorAll(".nums");
const zero = document.querySelector(".zero");
let typed = false;

container.addEventListener('click', e=>{
    if(!typed){
        display.textContent = "";
        typed = true;
    }
    if (e.target.classList.contains("nums") || e.target.classList.contains("operators")){
        display.textContent += e.target.textContent;
    }
    if (e.target.classList.contains("operators")){
        let content = display.textContent.trim();
        let lastOperation = content[content.length-1];
        
        if(content.length > 3){
            
            let result = solve(false);
            if (isNaN(result)){
                console.log("Solvable? " , result)
            } else {
                display.textContent = result+lastOperation;
            }
        }
    }
    if (e.target === equals) {
        console.log("equals clicked");
        display.textContent = solve(true);
    }
    
    if (e.target === back){
        display.textContent = display.textContent.slice(0,-1);
    }
    if (e.target === clear){
        display.textContent = "";
    }
    
});

function solve(flg){
    
    let content = display.textContent.trim(); // Clean input
    if (flg){

    } else {
        content = content.slice(0,-1);
        console.log("contentis:", content);
    }
        // Regex to identify the main operator, while respecting negative signs.
        const operatorRegex = /(?<!^)([+\-*/])/;
        const operatorMatch = content.match(operatorRegex);

        if (!operatorMatch) {
            console.log('No valid operator found');
            return "Syntax Error";
        }
    
        const operator = operatorMatch[1]; // The main operator (+, -, *, /)
        console.log('Operator:', operator);
    
        // Split the content by the main operator, keeping negative numbers intact.
        let [left, right] = content.split(new RegExp(`(?<=\\d)\\${operator}(?=-?\\d)`)).map(Number);
    
        // Check if both sides of the split are valid numbers
        if (isNaN(left) || isNaN(right)) {
            console.log('Invalid number format');
            return "Syntax Error";
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
                    console.log('Division by zero');
                    return "Cannot divide by 0";
                }
                result = left / right;
                break;
            default:
                console.log('Unknown operator');
                return "Syntax Error";
    }
    // Return the result
    return result;
}