

window.onload = () => {
    GetElements();
    if (localStorage.logged == "false") {
        Logout();
    }
    logout.onclick = logout;
    Request();
}

function GetElements(){
    logout = document.getElementById("logout");
    texto = document.getElementsByClassName("text")[0];
}

function Logout(){
    localStorage.logged = "false";
    location = "./login.html";
}

function Request() {
    texto.classList.toggle("hidden", false);
    let url = "https://basic-server-one.vercel.app/users";
    fetch(url)
        .then(response => response.json())
        .then(usuarios => {
            setTimeout(CargarTabla, 500, usuarios.data)
        })
        .catch(error => console.log(error))
}

function CargarTabla(usuarios){
    loading.classList.toggle("hidden", true);
    texto.classList.toggle("hidden", true);
    let head = `
    <tr><th>Nombre</th>
    <th>Ciudad</th>
    <th>Teléfono</th>
    <th>Nombre de usuario</th>
    <th>Email</th></tr>`;
    let body = "";
    for (let i = 0; i < usuarios.length; i++) {
        body += `
        <tr><td>${usuarios[i].name}</td>
        <td>${usuarios[i].address.city}</td>
        <td>${usuarios[i].phone}</td>
        <td>${usuarios[i].username}</td>
        <td>${usuarios[i].email}</td></tr>`;
    }
    document.getElementById("encabezado").innerHTML = head;
    document.getElementById("contenido").innerHTML = body;
}

