const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const passwordField = document.getElementById('password');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

const uppercaseChk = document.getElementById('uppercase');
const lowercaseChk = document.getElementById('lowercase');
const numbersChk = document.getElementById('numbers');
const symbolsChk = document.getElementById('symbols');

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
});

function getSecureRandomInt(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function generatePassword() {
  let charPool = '';
  if (uppercaseChk.checked) charPool += CHARSETS.uppercase;
  if (lowercaseChk.checked) charPool += CHARSETS.lowercase;
  if (numbersChk.checked) charPool += CHARSETS.numbers;
  if (symbolsChk.checked) charPool += CHARSETS.symbols;

  if (charPool.length === 0) {
    passwordField.value = 'Select at least one option';
    return;
  }

  const length = parseInt(lengthSlider.value, 10);
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charPool[getSecureRandomInt(charPool.length)];
  }
  passwordField.value = password;
}

copyBtn.addEventListener('click', () => {
  if (!passwordField.value || passwordField.value.includes(' ')) return;
  navigator.clipboard.writeText(passwordField.value);
  copyBtn.textContent = '✅';
  setTimeout(() => (copyBtn.textContent = '📋'), 1000);
});

generateBtn.addEventListener('click', generatePassword);
generatePassword();
