const displayEl = document.querySelector('.display')
const containerBtn = document.querySelector('.container-btn')

const FUNCTIONAL_BTN = ['AC', 'C', '=']
const OPERATOR_BTN = ['+', '-', '*', '/']

let displayValue = ''
let firstNum = 0
let secondNum = 0
let operator = ''


function separatePart (value) {
   for (const element of value) {
        if (OPERATOR_BTN.includes(element)){
            operator = element
            break
        }
   }

   const [a, b] = value.split(operator)

    firstNum = a
    secondNum = b
}

containerBtn.addEventListener('click', (e) => {
    const btnInnerText = e.target.innerText
    if (e.target.tagName === 'BUTTON' 
        && !FUNCTIONAL_BTN.includes(btnInnerText)
    ) {
        displayValue += btnInnerText

        showDisplay(displayValue)

        separatePart(displayValue)
    }

    if (btnInnerText === '=') {
        if (!displayValue || !firstNum || !secondNum || !operator) {
            return
        }

        displayValue = operate(operator, Number(firstNum), Number(secondNum))
        showDisplay(displayValue)
    }

    if (btnInnerText === 'AC') {
        clear()
    }

    if (btnInnerText === 'C') {
        backspace(displayValue)
    }
})

function operate(operator, firstNum, secondNum) {
    
    switch (operator) {
        case '+':
            return firstNum + secondNum
        case '-':
            return firstNum - secondNum
        case '*':
            return firstNum * secondNum
        case '/':
            if (secondNum === 0) return 'Error'
            return firstNum / secondNum
        default:
            break;
    }
}

function showDisplay(content ) {
    displayEl.innerHTML = content
}


function clear () {
    displayValue = ''
    firstNum = 0
    secondNum = 0
    operator = ''

    displayEl.innerHTML = ''
}

function backspace(value) {
    const removed = value.slice(0, -1)
    displayValue = removed
    showDisplay(removed)
}