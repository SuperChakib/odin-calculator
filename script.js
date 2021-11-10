const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => (num2 === 0 ? 0 : num1 / num2);
const operate = (operator, num1, num2) => {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operator) {
    case "+":
      return Math.round(add(num1, num2) * 1000) / 1000;
    case "-":
      return Math.round(subtract(num1, num2) * 1000) / 1000;
    case "*":
      return Math.round(multiply(num1, num2) * 1000) / 1000;
    case "/":
      return Math.round(divide(num1, num2) * 1000) / 1000;
  }
};
let display = document.querySelector("#display>p");
let inputNb = "";
let cacheNb = "";
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");
let operator = "";
let enterBtn = document.querySelector("#enter");
let clearBtn = document.querySelector("#clear");
let floatBtn = document.querySelector("#float");
let backBtn = document.querySelector("#backspace");
function inputValue(e) {
  if (e.target.textContent === "." && inputNb.includes(".")) return;
  inputNb = inputNb.concat(e.target.textContent);
  display.textContent = inputNb;
}
function chooseOperator(e) {
  if (cacheNb && operator && inputNb)
    cacheNb = operate(operator, cacheNb, inputNb);
  if (!cacheNb) cacheNb = inputNb;
  inputNb = "";
  if (cacheNb) operator = e.target.textContent;
}
function enterOperation() {
  if (cacheNb && operator && inputNb) {
    if (operator === "/" && inputNb === 0) {
      inputNb = "";
      display.textContent = "Hey! You can't divide by 0!";
    } else {
      inputNb = String(operate(operator, cacheNb, inputNb));
      display.textContent = inputNb;
    }
    cacheNb = "";
    operator = "";
  }
}
function clearOperation() {
  cacheNb = "";
  operator = "";
  inputNb = "";
  display.textContent = 0;
}
function correctoperation() {
  inputNb = inputNb.slice(0, inputNb.length - 1);
  display.textContent = inputNb;
}
digits.forEach((digit) => digit.addEventListener("click", inputValue));
operators.forEach((operator) =>
  operator.addEventListener("click", chooseOperator)
);
enterBtn.addEventListener("click", enterOperation);
clearBtn.addEventListener("click", clearOperation);
backBtn.addEventListener("click", correctoperation);
