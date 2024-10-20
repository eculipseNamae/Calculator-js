// Operations functions
const add = function (a, b) {
    return a + b;
};

const subtract = function (a, b) {
    return a - b;
};

const sum = function (array) {
    return array.reduce((total, current) => total + current, 0);
};

/* const multiply = function (array) {
    return array.reduce((product, current) => product * current)
}; */

const multiply = function (a, b) {
    return a * b;
}
const divide = function (a, b){
    return a / b;
}
const power = function (a, b) {
    return Math.pow(a, b);
};

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

let result = 0;

container.addEventListener('click', e=>{
    if (!(e.target.classList.contains("clear") || e.target === equals)){
        display.textContent += e.target.textContent;
    }
    if (e.target === equals){
        let content = display.textContent;
        let opsContent = content.split('').filter((char)=>operations.includes(char));

        if(opsContent.length > 3){
            //write error
        }
        if(opsContent.length >= 2){
            if(opsContent)
            opsContent = opsContent.filter(item => item !== '-');
            opsContent = opsContent.join('');
        }
        
        
        // opsContent = Array.from(new Set(opsContent));
        content = content.split(opsContent).map(Number);
        
        console.log(opsContent);
        console.log(content);
        switch(opsContent){
            case '/':
                result = divide(...content);
                break;
            case '*':
                result = multiply(...content);
                break;
            case '-':
                result = subtract(...content);
                break;
            case '+':
                result = add(...content);
                break;
        }
        display.textContent = result;

        
    }
    if (e.target === back){
        display.textContent = display.textContent.slice(0,-1);
    }
    
});
/* function trueFilter(content){
    content.split('').map(Number).
} */