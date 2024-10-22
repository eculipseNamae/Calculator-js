const display = document.querySelector("#display");


const container = document.querySelector("#container");
const equals = document.querySelector(".equality");
const back = document.querySelector(".back");
const clear = document.querySelector(".clearAll");
const operators = document.querySelectorAll(".operators");
const nums = document.querySelectorAll(".nums");
const zero = document.querySelector(".zero");
const dot = document.querySelector(".dot");
let typed = false;


document.addEventListener('keydown', (e) => {
    const operables = "1234567890.+-*/"
    const operations = "+-*/"
    if(operables.includes(e.key)){
        display.textContent += e.key;
    }
    if(operations.includes(e.key)){
        checkOperable();
    }
    if(e.key === "Enter"){
        display.textContent = solve(true);
    }
    if(e.key === "Backspace"){
        display.textContent = display.textContent.slice(0,-1);
    }
    
});

container.addEventListener('click', e=>{
    if(!typed){
        display.textContent = "";
        typed = true;
    }
    if (e.target.classList.contains("nums") || e.target.classList.contains("operators") || e.target === dot){
        display.textContent += e.target.textContent;
    }
    if (e.target.classList.contains("operators")){
        checkOperable();
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

    // Regex to find the main operator, excluding negative signs at the start
    const operatorRegex = /(?<!^)([+\-*/])/;
    const operatorMatch = content.match(operatorRegex);

    if (!operatorMatch) {
        console.log("No valid operator found");
        return "Syntax Error";;
    }

    const operator = operatorMatch[1]; // Extract the main operator
    const operatorIndex = operatorMatch.index; // Get the position of the operator

    console.log("Operator:", operator);

    // Manually split the content based on the operator's position
    const leftPart = content.slice(0, operatorIndex).trim();
    const rightPart = content.slice(operatorIndex + 1).trim();

    console.log("Left Part:", leftPart, "Right Part:", rightPart);

    // Handle cases where only decimal points are entered
    const left = leftPart === '' ? 0 : parseFloat(leftPart);
    const right = rightPart === '' ? 0 : parseFloat(rightPart);

    if (isNaN(left) || isNaN(right)) {
        console.log("Invalid operands");
        return "Syntax Error";;
    }

    console.log("Operands:", left, right);

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
                console.log("Division by zero");
                return "Cannot divide by 0";
            }
            result = left / right;
            break;
        default:
            console.log("Unknown operator");
            return "Syntax Error";;
    }

    // Return the result
    return result;
    
}
function checkOperable(){
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