const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");

const upperDisplay = document.querySelector(".upperdisplay");
const bottomDisplay = document.querySelector(".lowerdisplay");

const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const del = document.querySelector(".backspace");

let result = null;
let dot = false;
let upperDisplayNumber = "";
let lowerDisplayNumber = "";
let operatorType = "";

for (number of numberButtons) {
    number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !dot) {
      dot = true;
    } 
    else if (e.target.innerText === "." && dot) {
      return;
    }
    lowerDisplayNumber += e.target.innerText;
    bottomDisplay.innerText = lowerDisplayNumber;
  });
};

for (operator of operationButtons) {
    operator.addEventListener("click", (e) => {
    if (!lowerDisplayNumber) return;
    dot = false;
    const operationName = e.target.innerText;
    
    if (upperDisplayNumber && lowerDisplayNumber && operatorType) {
      operate();
    }
    else {
      result = parseFloat(lowerDisplayNumber);
    }

    clearDisplay(operationName);
    operatorType = operationName;
    console.log(result);
  
   });
};

function clearDisplay(name = "") {
  upperDisplayNumber += lowerDisplayNumber + " " + name + " ";
  upperDisplay.innerText = upperDisplayNumber;
  bottomDisplay.innerText = "";
  lowerDisplayNumber = "";
}

function operate() {
  if (operatorType === "*") {
    result = parseFloat(result) * parseFloat(lowerDisplayNumber);
  } 
  else if (operatorType === "+") {
    result = parseFloat(result) + parseFloat(lowerDisplayNumber);
  } 
  else if (operatorType === "-") {
    result = parseFloat(result) - parseFloat(lowerDisplayNumber);
  } 
  else if (operatorType === "/") {
    
    result = parseFloat(result) / parseFloat(lowerDisplayNumber);
    if (result=='Infinity') {
        alert("Wrong Expression: Please enter a valid number");
        bottomDisplay.innerText="";
        result = "";  
    }
  } 
  else if (operatorType === "%") {
    result = parseFloat(result) % parseFloat(lowerDisplayNumber);
  }
}

equal.addEventListener("click", () => {
  if (!lowerDisplayNumber || !upperDisplayNumber) return;
  dot = false;
  operate();
  clearDisplay();
  bottomDisplay.innerText = result;
  lowerDisplayNumber = result;
  upperDisplayNumber = "";
});

clear.addEventListener("click", () => {
  upperDisplayNumber = "";
  lowerDisplayNumber = "";
  upperDisplay.innerText = "";
  bottomDisplay.innerText = "";
  result = "";
});

del.addEventListener("click", () => {
    lowerDisplayNumber =  bottomDisplay.innerText
    bottomDisplay.innerText = lowerDisplayNumber.substr(
      0,
      lowerDisplayNumber.length - 1
    );
    lowerDisplayNumber = bottomDisplay.innerText;

});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) 
  {
    clickButtonEl(e.key);
  } 
  else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } 
  else if (e.key === "*") {
    clickOperation("x");
  } 
  else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
});

function clickButtonEl(key) {
  numberButtons.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operationButtons.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}

function clickEqual() {
  equal.click();
}
