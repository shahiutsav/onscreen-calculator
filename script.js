class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() // initialize variables everytime a new session is started
    }

    clear() {
        this.currentOperand = "0" // Initialize currentOperand as empty string
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
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "×":
                computation = prev * current
                break
            case "÷":
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.previousOperand = ""
        this.operation = undefined
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(
            this.currentOperand
        )
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
                this.previousOperand
            )} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ""
        }
    }
}

const buttons = document.querySelectorAll("button") // fetch all buttons
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

function playAudio() {
    const audio = document.querySelector("[data-audio]")
    audio.currentTime = 0
    audio.play()
}

buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
        let x = e.clientX - e.target.offsetLeft
        let y = e.clientY - e.target.offsetTop

        let ripples = document.createElement("span")
        ripples.style.left = x + "px"
        ripples.style.top = y + "px"
        this.appendChild(ripples)

        setTimeout(() => {
            ripples.remove()
        }, 500)
    })
})

allClearButton.addEventListener("click", () => {
    playAudio()
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", () => {
    playAudio()
    calculator.delete()
    calculator.updateDisplay()
})

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        playAudio()
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        playAudio()
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", () => {
    playAudio()
    calculator.compute()
    calculator.updateDisplay()
})

window.addEventListener("keydown", (e) => {
    let keyName = e.key
    if (keyName === "Backspace") {
        playAudio()
        calculator.delete()
        calculator.updateDisplay()
    } else if (
        keyName === "*" ||
        keyName === "/" ||
        keyName === "+" ||
        keyName === "-"
    ) {
        if (keyName === "*") {
            keyName = "×"
        }
        if (keyName === "/") {
            keyName = "÷"
        }
        playAudio()
        calculator.chooseOperation(keyName)
        calculator.updateDisplay()
    } else if (keyName === "Enter") {
        playAudio()
        calculator.compute()
        calculator.updateDisplay()
    } else {
        if (isNaN(keyName) && keyName != ".") return
        playAudio()
        calculator.appendNumber(keyName)
        calculator.updateDisplay()
    }
})
