let display = document.getElementById("display");
buttons = document.querySelectorAll("button");
let displayResult = "";

for (item of buttons) {
  item.addEventListener("click", (e) => {
    buttonValue = e.target.innerText;
    //added oprator class for . button and accessing that
    let operators = [...document.querySelectorAll(".operator")].map(
      (el) => el.textContent
    );
    console.log("operators are", operators, buttonValue);

    if (buttonValue == "C") {
      const clearText = clear();
    } else if (buttonValue == "=") {
      if (displayResult == "") {
        console.log("Display Result", displayResult);
        return;
      }
      const opration = operate();
    }
    // if display value is empty then dont allow .
    else if (!document.getElementById("display").value && buttonValue == ".") {
      return;
    }
    //dont allow . back to back
    else if (
      operators.includes(buttonValue) &&
      operators.includes(document.getElementById("display").value.slice(-1))
    ) {
      return;
    } else if (buttonValue == "←") {
      displayResult = document.getElementById("display").value;
      document.getElementById("display").value = displayResult.substr(
        0,
        displayResult.length - 1
      );
      displayResult = display.value;
    } else {
      displayResult += buttonValue;
      display.value = displayResult;
      displayResult = display.value;
    }
  });
}

function operate() {
  if (eval(displayResult) == "Infinity") {
    //console.log(eval(displayResult))
    alert("Bad Expression");
    displayResult = "";
    display.value = displayResult;
    return;
  } else {
    display.value = eval(displayResult);
  }
}

function clear() {
  displayResult = "";
  display.value = displayResult;
}
