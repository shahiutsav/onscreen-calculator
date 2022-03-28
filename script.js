const numberButtons = document.querySelectorAll("[data-number]") // fetch all number buttons
const operationButtons = document.querySelectorAll("[data-operation") // fetch all operation buttons
const allClearButton = document.querySelector("[data-all-clear]") // fetch all-clear button
const deleteButton = document.querySelector("[data-delete]") // fetch delete button
const equalsButton = document.querySelector("[data-equals]") // fetch equals button
const currentOperandTextElement = document.querySelector(
    "[data-current-operand]"
) // fetch current operand text  element
const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
) // fetch previous operand text element

const add = function () {
    return arguments[0] + arguments[1]
}

const subtract = function () {
    return arguments[0] - arguments[1]
}

const multiply = function () {
    return arguments[0] * arguments[1]
}

const divide = function () {
    return arguments[0] / arguments[1]
}

function operate(num1, num2, operator) {
    if (operator === "*") {
        result = multiply(num1, num2)
    } else if (operator === "+") {
        result = add(num1, num2)
    } else if (operator === "-") {
        result = subtract(num1, num2)
    } else if (operator === "/") {
        result = divide(num1, num2)
    } else {
        return "Enter a valid operator!"
    }
    return result
}

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentOperandTextElement.innerText =
            currentOperandTextElement.innerText.toString() +
            button.innerText.toString()
    })
})

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        previousOperandTextElement.innerText =
            currentOperandTextElement.innerText
        currentOperandTextElement.textContent = ""
    })
})
