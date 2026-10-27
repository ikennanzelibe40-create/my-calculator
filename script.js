let expression = "";
let finished = false;

function updateDisplay(value) {
  document.getElementById("display").textContent = value;
}

function press(value) {
  if (finished && /[0-9.]/.test(value)) {
    expression = "";
  }

  finished = false;

  if (/[0-9]/.test(value) && expression === "0") {
    expression = "";
  }

  if (/[+\-*/]/.test(value)) {
    if (expression === "" && value !== "-") return;
    if (/[+\-*/]$/.test(expression)) {
      expression = expression.slice(0, -1);
    }
  }

  expression += value;
  updateDisplay(expression);
}

function calculate() {
  if (!expression || !/^[0-9+\-*/. ]+$/.test(expression)) {
    updateDisplay("Invalid calculation");
    return;
  }

  try {
    const result = Function(
      '"use strict"; return (' + expression + ')'
    )();

    if (!Number.isFinite(result)) {
      updateDisplay("Cannot divide by zero");
      expression = "";
      return;
    }

    expression = String(
      Number(result.toPrecision(10))
    );
    updateDisplay(expression);
    finished = true;
  } catch {
    updateDisplay("Invalid calculation");
    expression = "";
  }
}

function clearCalculator() {
  expression = "";
  finished = false;
  updateDisplay("0");
}