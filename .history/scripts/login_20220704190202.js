window.onload = function() {
    SessionCheck();
    GetElements();
    HideLabels();
    submit.onclick = (e) => {
        e.preventDefault();
        if (FieldValidations()) {
            errorLogin.classList.toggle("hidden", true);
            Request();
        }
    }
}

function SessionCheck() {
    if (localStorage.logged == "true") {
        location = "./dashboard.html";
    }
}

function GetElements() {
    email = document.getElementById("txtEmail");
    password = document.getElementById("txtPassword");
    submit = document.getElementById("loginBtn")
    errorLogin = document.getElementById("label-error-login")
}

function Login(data) {
    if (data.error == false) {
        localStorage.logged = "true";
    }
}

function FieldValidations() {
    validate = true;
    if (password.value.length < 7) {
        pass.labels[1].classList.toggle("hidden", false);
        validate = false;
    }
    if (!email.value.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
        email.labels[1].classList.toggle("hidden", false);
        validate = false;
    }
    return validate;
}

function HideLabels() {
    email.onfocus = () => {
        email.labels[1].classList.toggle("hidden", true);
        errorLogin.classList.toggle("hidden", true);
    }
    password.onfocus = () => {
        password.labels[1].classList.toggle("hidden", true);
        errorLogin.classList.toggle("hidden", true);
    }
}

function Request() {
    fetch("https://basic-server-one.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
        email: email.value,
        password: password.value
        })
    })
        .then(response => response.json())
        .then(data => ingresar(data))
        .catch(error => console.log(error))
}