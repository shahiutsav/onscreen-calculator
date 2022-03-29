class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() // initialize variables everytime a new session is started
    }

    clear() {
        this.currentOperand = "" // Initialize currentOperand as empty string
        this.previousOperand = "" // Initialize previousOperand as empty string
        this.operation = undefined // Initialize operation as undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        switch (this.operation) {
            case "+":
                computation = add(prev, current)
                break
            case "-":
                computation = subtract(prev, current)
                break
            case "×":
                computation = multiply(prev, current)
                break
            case "÷":
                computation = divide(prev, current)
                break
            default:
                return
        }
        this.currentOperand = computation
        this.previousOperand = ""
        this.operation = undefined
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}

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

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
)

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

allClearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})
