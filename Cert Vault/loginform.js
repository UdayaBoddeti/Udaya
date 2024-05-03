const fields = ["userName", "password", "submit"];
const inputTypes = ["text", "password", "submit"];
const labels = ["User name", "Password"];
let form;

createForm();
bindEvent();

function validateUser()
{
    if (localStorage.getItem("Token"))
    {
        window.location.assign("./homePage.html");
    }
}
function createForm()
{
    form = document.createElement("form");
    form.id = "loginForm";
    document.getElementById("loginPage").appendChild(form);
    for (let counter = 0; counter < fields.length; counter++)
    {
        if (counter < fields.length - 1)
        {
            const label = document.createElement("label");
            label.innerText = labels[counter];
            form.appendChild(label);
        }
        let formElement = document.createElement("input");
        formElement.type = inputTypes[counter];
        formElement.id = fields[counter];
        formElement.required = true;
        form.appendChild(formElement);
        form.appendChild(document.createElement("br"));
    }
}

function bindEvent()
{
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        login()});
}

async function login() 
{
    let userName = document.getElementById(fields[0]).value;
    let password = document.getElementById(fields[1]).value;
    let data = { UserName: userName, Password: password };
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)};
    try 
    {
        const response = await fetch("http://localhost:3000/api/login", options);
        let result = await response.json();
        if (result.Token)
        {
            alert("Login successfully!")
            localStorage.setItem("Token", result.Token);
            window.location.assign("./homePage.html");
        }
        else
        {
            alert("Invalid User Details ")
        }
    } 
    catch (error) 
    {
        console.error('Unable to fetch:', error);
    }
}