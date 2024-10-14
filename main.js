/* Dark/Light Mode */
const body = document.querySelector("body");
const modeToggle = document.getElementById("icon");
const modeIcon = document.querySelector(".icon ion-icon");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
  modeChecker();
}

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  modeChecker();
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

function modeChecker() {
  if (body.classList.contains("dark")) {
    modeIcon.setAttribute("name", "sunny-outline");
  } else {
    modeIcon.setAttribute("name", "moon-outline");
  }
}

/* Main functionality */
const progress = document.getElementById("progress");
const userInput = document.getElementById("user-input");
const resetBtn = document.querySelector(".reset");
const eraserBtn = document.querySelector(".eraser");
const allInputs = document.querySelectorAll("#numpad-container .input");
const popup = document.getElementById("popup");

// Store expresion and result after calculate() ran
let completeExpresion = "";
let previousResult = "";

// Iterate though all all inputs in the pad
allInputs.forEach((el) => {
  //checking which button is pressed
  el.addEventListener("click", (e) => {
    let result = "";

    if (e.target.classList.contains("reset")) {
      userInput.innerText = 0;
      progress.innerText = "";
      completeExpresion = "";
      previousResult = "";
    } else if (e.target.classList.contains("eraser")) {
      userInput.innerText = 0;
      progress.innerText = progress.innerText.slice(
        0,
        progress.innerText.length - 1
      );
    } else if (e.target.classList.contains("inverter")) {
      progress.innerText = integerizer(userInput.innerText);
      userInput.innerText = integerizer(userInput.innerText);
    } else if (e.target.classList.contains("number")) {
      if (userInput.innerText == "0") {
        userInput.innerText = e.target.innerText;
        progress.innerText += e.target.innerText;
      } else if (userInput.innerText == "-0") {
        userInput.innerText = "-" + e.target.innerText;
        progress.innerText = userInput.innerText;
      } else {
        userInput.innerText += e.target.innerText;
        progress.innerText += e.target.innerText;
      }
    } else if (e.target.classList.contains("period")) {
      userInput.innerText += e.target.innerText;
      progress.innerText += e.target.innerText;
    } else if (e.target.classList.contains("operator")) {
      if (calculated(completeExpresion)) {
        progress.innerText = previousResult;
      }
      if (progress.innerText !== "") {
        if (
          e.target.classList.contains("multiply") ||
          e.target.classList.contains("divide")
        ) {
          if (!operatorChecker(progress.innerText)) {
            progress.innerText += e.target.innerText;
          }
        } else {
          progress.innerText += e.target.innerText;
        }
      }
      userInput.innerText = 0;
      completeExpresion = "";
      previousResult = "";
    } else if (e.target.classList.contains("percent")) {
      if (userInput.innerText != 0) {
        progress.innerText = digitCounter(percentage(userInput.innerText));
        userInput.innerText = digitCounter(percentage(userInput.innerText));
      }
    } else if (e.target.classList.contains("equals")) {
      if (progress.innerText !== "") {
        progress.innerText += e.target.innerText;
        let readyToCalc = progress.innerText.slice(
          0,
          progress.innerText.length - 1
        );

        //get the result
        result += calculate(readyToCalc);

        //populate labels with expresion and result
        progress.innerText += digitCounter(result);
        userInput.innerText = digitCounter(result);

        //saving expresion and result
        completeExpresion += progress.innerText;
        previousResult += digitCounter(result);
      }
    }
  });
});

// Function to calculate the user expresion
function calculate(expression) {
  //build an array containing the individual parts
  let parts = expression.match(/(?:\-?[\d\.]+)|[-\+\*\/]|\s+/g);

  //build a separate array containing parsed numbers
  let nums = parts.map(parseFloat);

  //build another array with all operations reduced to additions
  let processed = [];

  for (let i = 0; i < parts.length; i++) {
    if (nums[i] === nums[i]) {
      //nums[i] isn't NaN

      processed.push(nums[i]);
    } else {
      switch (parts[i]) {
        case "+":
          continue; //ignore

        case "-":
          processed.push(nums[++i] * -1);

          break;

        case "*":
          processed.push(processed.pop() * nums[++i]);

          break;

        case "/":
          processed.push(processed.pop() / nums[++i]);

          break;

        default:
          throw new Error("unknown operation: " + parts[i]);
      }
    }
  }

  //add all numbers and return the result
  return processed.reduce(function (result, elem) {
    return result + elem;
  });
}

// Func to check if the operation has been made
function calculated(str) {
  let previousCalc = str.split("");
  let foundSome = "";

  previousCalc.forEach((el) => {
    if (el == "=") {
      foundSome += el;
    }
  });

  if (foundSome) {
    return true;
  }
  return false;
}

// Func to control how many digits are shown
function digitCounter(str) {
  // =< 10 digits
  let reducedStr = str.slice(0, 10);
  return reducedStr;
}

// Func to get percentage from a given input
function percentage(str) {
  //conver string  to number and divide by 100
  let number = parseFloat(str);
  let newPercentage = number / 100;

  //convert it back to str
  return newPercentage.toString();
}

// Func to change signs (+||-)
function integerizer(str) {
  let number = str.split("");
  let boolean;

  //check if "-" is in the operation
  number.find((el) => {
    if (el == "-") {
      boolean = true;
    }
  });

  if (!boolean) {
    //number is posible, add "-"
    number.unshift("-");
  } else {
    //number is negative, remove "-"
    number.shift();
  }

  return number.join("");
}

// Func to check operators (*||/)
function operatorChecker(str) {
  let input = str.split("");
  let lastValue = input[input.length - 1];
  let boolean;

  if (lastValue === "*" || lastValue === "/") {
    boolean = true;
  } else {
    boolean = false;
  }

  return boolean;
}

// Copy result to the clipboard
userInput.addEventListener("click", () => {
  navigator.clipboard.writeText(userInput.innerText);

  //feedback animation
  popup.style.display = "block";
  popup.classList.add("fadein");
  setTimeout(() => {
    popup.style.display = "none";
    popup.classList.remove("fadein");
  }, 1000);
});