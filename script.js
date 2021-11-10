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
let display = document.querySelector("#result");
let displayCache = document.querySelector("#subDisplayA");
let displayOperator = document.querySelector("#subDisplayB");
let inputNb = "";
let cacheNb = "";
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");
let operator = "";
let enterBtn = document.querySelector("#enter");
let clearBtn = document.querySelector("#clear");
let floatBtn = document.querySelector("#float");
let backBtn = document.querySelector("#backspace");
let signBtn = document.querySelector("#sign");
function inputValue(e) {
  if (e.target.textContent === "." && inputNb.includes(".")) return;
  inputNb = inputNb.concat(e.target.getAttribute("data-key"));
  display.textContent = inputNb;
}
function chooseOperator(e) {
  if (cacheNb && operator && inputNb)
    cacheNb = operate(operator, cacheNb, inputNb);
  if (!cacheNb) cacheNb = inputNb;
  inputNb = "";
  if (cacheNb) operator = e.target.textContent;
  displayCache.textContent = cacheNb;
  displayOperator.textContent = operator;
  display.textContent = "";
}
function enterOperation() {
  if (cacheNb && operator && inputNb) {
    if (operator === "/" && inputNb === "0") {
      inputNb = "";
      display.textContent = "Hey! You can't divide by 0!";
    } else {
      inputNb = String(operate(operator, cacheNb, inputNb));
      display.textContent = inputNb;
    }
    displayCache.textContent = "";
    displayOperator.textContent = "";
    cacheNb = "";
    operator = "";
  }
}
function clearOperation() {
  cacheNb = "";
  operator = "";
  inputNb = "";
  display.textContent = 0;
  displayCache.textContent = "";
  displayOperator.textContent = "";
}
function correctoperation() {
  inputNb = inputNb.slice(0, inputNb.length - 1);
  display.textContent = inputNb;
}
function keyboardInput(e) {
  let goodKeys = [
    ".",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    "=",
    "Backspace",
  ];
  if (goodKeys.includes(e.key)) {
    let targetBtn = document.querySelector(`button[data-key='${e.key}']`);
    targetBtn.click();
  }
}
function changeSign() {
  if (inputNb[0] === "-") inputNb = inputNb.slice(1);
  else if (inputNb) inputNb = "-" + inputNb;
  display.textContent = inputNb;
}
digits.forEach((digit) => digit.addEventListener("click", inputValue));
operators.forEach((operator) =>
  operator.addEventListener("click", chooseOperator)
);
enterBtn.addEventListener("click", enterOperation);
clearBtn.addEventListener("click", clearOperation);
backBtn.addEventListener("click", correctoperation);
window.addEventListener("keyup", keyboardInput);
signBtn.addEventListener("click", changeSign);
