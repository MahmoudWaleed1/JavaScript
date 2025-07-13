let login = document.getElementById("login")
let signUpInBtn = document.getElementById("signUp")
let nameInput = document.getElementById("name")
let emailInput = document.getElementById("email")
let passwordInput = document.getElementById("pass")
let signingText = document.querySelector(".mainBox .question")
let logginBtn = document.getElementById("Btn")
let users = []
let emailRegEx = /^[a-zA-Z0-9_.]{3,50}@[a-zA-Z0-9]{1,20}\.[a-zA-Z]{2,5}$/
let nameRegEx = /^[\w]{1,50}$/
let passRegEx = /^[a-zA-Z0-9_.]{1,50}$/
if(localStorage.getItem("users") !=  null){
    users = JSON.parse(localStorage.getItem("users"))
}
signUpInBtn.addEventListener("click",function(){
    signUp()
    
})
function signUp(){
    nameInput.classList.toggle("d-none")
    if(signUpInBtn.innerText =="Logout"){
        cleanLogin()
        backFromHome()
    }
    if(signUpInBtn.innerText =="Sign Up" || signUpInBtn.innerText =="Logout")
    {
        signUpInBtn.innerText = "Sign In"
        signingText.innerText = "You have an account?"
        logginBtn.innerText = "Sign Up"
        cleanLogin()
    }
    else{
        signUpInBtn.innerText = "Sign Up"
        signingText.innerText = "Don't have an account?"
        logginBtn.innerText = "Login"
        cleanLogin()
    }
}
logginBtn.addEventListener("click", function(){
    loggingIn()
})

function loggingIn(){
    let user = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }
    cleanLogin()
    if(logginBtn.innerText == "Sign Up"){
    let nameResult = isNameValid(user.name)
    let emailResult = isEmailValid(user.email)
    let passwordResult = isPasswordValid(user.password)
    if(nameResult && emailResult && passwordResult){
        if(!emailExists(user.email)){
            users.push(user) 
            goToHome(user.name)
            localStorage.setItem("users", JSON.stringify(users))   
        }
    }
}
    else{
        if(logginBtn.innerText =="Login"){
            if(haveAnAccount(user.email, user.password)){
                goToHome(getUserbyEmail(user.email))
            }
        }
    }
    nameInput.value = ""
    emailInput.value = ""
    passwordInput.value = ""
}
function cleanLogin(){
        document.getElementById("nameAlert").classList.add("d-none")
        document.getElementById("name").classList.replace("mb-1","mb-3")
        document.getElementById("emailAlert").classList.add("d-none")
        document.getElementById("email").classList.replace("mb-1","mb-3")
        document.getElementById("passwordAlert").classList.add("d-none")
        document.getElementById("pass").classList.replace("mb-1","mb-4")
        document.getElementById("loginAlert").classList.add("d-none")
        nameInput.value = ""
        emailInput.value = ""
        passwordInput.value = ""
}

function isNameValid(name){
    if(!nameRegEx.test(name)){
        document.getElementById("nameAlert").classList.remove("d-none")
        document.getElementById("name").classList.replace("mb-3","mb-1")
        return false
    }
    else{
        document.getElementById("nameAlert").classList.add("d-none")
        return true
    }
}
function isEmailValid(email){
    if(!emailRegEx.test(email)){
        document.getElementById("emailAlert").classList.remove("d-none")
        document.getElementById("email").classList.replace("mb-3","mb-1")
        document.getElementById("emailAlert").innerText = "Email form is invalid"
        return false
    }
    else{
        return true
    }
}
function isPasswordValid(pass){
    if(!passRegEx.test(pass)){
        document.getElementById("passwordAlert").classList.remove("d-none")
        document.getElementById("pass").classList.replace("mb-4","mb-1")
        return false
    }
    else{
        return true
    }
}
function emailExists(email){
    for(let i=0;i<users.length;i++){
        if(email == users[i].email){
            document.getElementById("emailAlert").classList.remove("d-none")
            document.getElementById("emailAlert").innerText = "Email Already Exits, Try another one"
            document.getElementById("email").classList.replace("mb-3","mb-1")
            return true
        }
    }
    return false
    
}
function haveAnAccount(email, password){
    for(let i=0; i<users.length; i++){
        if(users[i].email == email && users[i].password == password){
            return true;
        }
    }
    document.getElementById("loginAlert").classList.remove("d-none")
    return false
}
function goToHome(name){
    document.querySelector("h1").innerText = "Welcome " + name
    nameInput.classList.add("d-none")
    emailInput.classList.add("d-none")
    passwordInput.classList.add("d-none")
    signingText.innerText = "Want to Leave?"
    signUpInBtn.innerHTML = "Logout"
    document.getElementById("loginAlert").classList.add("d-none")
    logginBtn.classList.add("d-none")
}
function backFromHome(){
    document.querySelector("h1").innerText = "Smart Login System"
    nameInput.classList.remove("d-none")
    emailInput.classList.remove("d-none")
    passwordInput.classList.remove("d-none")
    logginBtn.classList.add("d-none")
}
function getUserbyEmail(email){
        for(let i=0; i<users.length; i++){
            if(users[i].email == email){
                return users[i].name
            }
        }
}
