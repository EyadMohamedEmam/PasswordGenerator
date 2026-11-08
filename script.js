
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => document.body.classList.toggle("light"));


const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const passwordList = document.getElementById("password-list");
const historyList = document.getElementById("history-list");
const strengthList = document.getElementById("strength-list");

const lengthInput = document.getElementById("password-length");
const uppercaseInput = document.getElementById("uppercase");
const lowercaseInput = document.getElementById("lowercase");
const numberInput = document.getElementById("number");
const specialInput = document.getElementById("special-characters");

function generatePassword(length, options){
    let charset = "";
    if(options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if(options.number) charset += "0123456789";
    if(options.special) charset += "!@#$%^&*()_+-={}[]|:;<>,.?/";
    if(!charset) return "";
    let password = "";
    for(let i=0;i<length;i++){
        password += charset[Math.floor(Math.random()*charset.length)];
    }
    return password;
}


function getStrength(password){
    let strength = 0;
    if(password.length >= 8) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[a-z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;
    if(strength <= 2) return "Weak";
    if(strength <= 4) return "Medium";
    return "Strong";
}


generateBtn.addEventListener("click", () => {
    const length = parseInt(lengthInput.value) || 12;
    const options = {
        uppercase: uppercaseInput.checked,
        lowercase: lowercaseInput.checked,
        number: numberInput.checked,
        special: specialInput.checked
    };
    if(!options.uppercase && !options.lowercase && !options.number && !options.special){
        alert("Select at least one option!");
        return;
    }

    passwordList.innerHTML = "";
    strengthList.innerHTML = "";

    for(let i=0; i<5; i++){
        const pwd = generatePassword(length, options);

        const liPwd = document.createElement("li");
        liPwd.textContent = pwd;
        liPwd.classList.add("generated");
        passwordList.appendChild(liPwd);

        const liStrength = document.createElement("li");
        liStrength.textContent = getStrength(pwd);
        strengthList.appendChild(liStrength);

        const liHistory = document.createElement("li");
        liHistory.textContent = pwd;
        historyList.prepend(liHistory);
    }
});


copyBtn.addEventListener("click", () => {
    const passwords = Array.from(passwordList.children).map(li => li.textContent).join("\n");
    if(!passwords) return;
    navigator.clipboard.writeText(passwords).then(() => {
        passwordList.querySelectorAll("li").forEach(li => {
            li.classList.add("copied");
            setTimeout(() => li.classList.remove("copied"), 500);
        });
    });
});
