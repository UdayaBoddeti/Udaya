const formContainer = document.getElementById("formContainer");
const form = document.createElement("form");
form.id = "signInForm";
formContainer.appendChild(form);
const fields = ["username", "email", "password", "confirmPassword", "employeeId"];
const labels = ["Username", "Email", "Password", "Confirm Password", "Employee ID"];
const types = ["text", "email", "password", "password", "text"];
fields.forEach((field, index) => {
    const label = document.createElement("label");
    label.textContent = labels[index];
    form.appendChild(label);
    const input = document.createElement("input");
    input.type = types[index];
    input.id = field;
    input.required = true;
    if (types[index] === "password") {
        input.setAttribute("autocomplete", "new-password"); // Disable password autofill
    }
    form.appendChild(input);

    form.appendChild(document.createElement("br"));
});

const submitButton = document.createElement("input");
submitButton.type = "submit";
submitButton.value = "Sign In";
form.appendChild(submitButton);
form.addEventListener("submit", function(event) {
    event.preventDefault();
    signin()
});

async function signin() {        

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const employeeId = document.getElementById("employeeId").value;
    if (password !== confirmPassword) {
        alert("Passwords do not match");
    }
    else {

        const data = {UserName: username, EmailId : email, Password : password, EmployeeId : employeeId}
        const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)};
        try 
        {
            const response = await fetch("http://localhost:3000/api/signin", options);
            let result = await response.json();
            console.log(result)
            if (result.changes == 1)
            {
                alert("Account Created Successfully!")
                window.location.assign("./login.html");
            }
            else 
            {
                alert("There is a problem in creating an account")
            }
        } 
        catch (error) 
        {
            console.error('Unable to fetch:', error);
        }
    }
}        
            
           