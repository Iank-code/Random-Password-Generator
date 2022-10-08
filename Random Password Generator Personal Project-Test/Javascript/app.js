const resultEl = document.getElementById("result");
const clipboardBtn = document.getElementById("clipboard");
const lengthEl = document.getElementById("length");
const upperCaseEl = document.getElementById("uppercase");
const lowerCaseEl = document.getElementById("lowercase");
const symbolsEl = document.getElementById("symbol");
const numberEl = document.getElementById("number");
const generateEl = document.getElementById("generateButton")

clipboardBtn.addEventListener("click", ()=>{
    let copiedResult = resultEl.innerText;
    let textArea = document.createElement("textarea");
    if(!copiedResult){
        return
    }
    else{
        textArea.value = copiedResult;
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        textArea.remove()
        alert("Password has been copied to clipboard")
    }
})

generateEl.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasUpper = upperCaseEl.checked
    const haslower = lowerCaseEl.checked
    const hasnumber = numberEl.checked
    const hassymbol = symbolsEl.checked

    let resultsGotten = generateRandomPassword(hasUpper, haslower, hasnumber, hassymbol, length)
    resultEl.innerText = resultsGotten
})

function generateRandomPassword(upper, lower, symbol, number, length) {
    let generatedPassword = ''
    const typescount = upper + lower + symbol + number
    const typeArr = [{upper}, {lower}, {symbol}, {number}].filter(item => Object.values(item)[0])

    if(typescount === 0) {
        return ''
    }

    for(i = 0; i < length; i += typescount) {
        typeArr.forEach(type =>{
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword
}

const randomFunc = {
    lower: generateLowerCase,
    number: generateNumber,
    upper: generateUpperCase,
    symbol: generateSymbol
}
function generateLowerCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
function generateUpperCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function generateNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
function generateSymbol(){
    const symbols = '!@#$%^&*()_+-=]}[{;:/?.>,<\|'
    return symbols[Math.floor(Math.random()*symbols.length)]
}
