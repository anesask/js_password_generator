// DOM Elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

// Random function
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
  length,
};

// Copy to Clipboard
clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard!");
});

// Generate event listen
generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
  // 1. Init password var
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;

  // 2. Filter out unchecked types
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }
  // 3. Loop over length, call generator function for each type
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  // 4. Add final password to password var and return
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Functions
function getRandomLower() {
  const randomLowerCase = Math.floor(Math.random() * 26) + 97;
  return String.fromCharCode(randomLowerCase);
}

function getRandomUpper() {
  const randomUpperCase = Math.floor(Math.random() * 26) + 65;
  return String.fromCharCode(randomUpperCase);
}

function getRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 10) + 48;
  return String.fromCharCode(randomNumber);
}

function getRandomSymbol() {
  const symbols = "!@#$%^(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
