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

console.log(operate(3, 2, "*"))
console.log(operate(3, 2, "+"))
console.log(operate(3, 2, "-"))
console.log(operate(3, 2, "/"))
console.log(operate(3, 2, "$"))
