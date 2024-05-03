const token = localStorage.getItem('Token')
const block = document.getElementById('employeeCerts');
const fields = ['CertificateName', 'IssuingOraganisation', 'IssueDate', 'ExpiryDate', 'CredentialId', 'CredentialUrl'];
let flag = false
let CredentialId = " "
async function getCertificates() {
    const options = { method: 'GET', headers: { 'token': token }};
    const url = `http://127.0.0.1:3000/api/certs?sort_by=CertificateName&sort_order=DESC`;
    const response = await fetch(url, options);
    const result = response.json();
    return result
}

async function addCertificate() {
    
    const certData = getCertData()
    const options = {method: "POST", headers: {"Content-Type": "application/json", "Token": token}, body: JSON.stringify(certData)};
    const url = `http://127.0.0.1:3000/api/certs`;
    printApiResponse(await fetchApi(url, options));
}

async function updateCertificate() {
    
    const certData = getCertData()
    const options = {method: "PUT", headers: {"Content-Type": "application/json", "Token": token}, body: JSON.stringify(certData)};
    const url = `http://127.0.0.1:3000/api/certs/` + CredentialId;
    printApiResponse(await fetchApi(url, options));
}

async function deleteCertificate(data) {

    CredentialId = data['CredentialId']
    const options = {method: "DELETE", headers: {"Content-Type": "application/json", "Token": token}};
    const url = `http://127.0.0.1:3000/api/certs/` + CredentialId;
    if (confirm("Are you sure want to delete Item Id: " + CredentialId)) {
        printApiResponse(await fetchApi(url, options));
        location.reload()
    } 
    else {
        console.log(canceled);
    }
}

function getCertData() {

    let cert = {};
    for (let counter = 0; counter < fields.length; counter++)
    {
        cert[fields[counter]] = document.getElementById(fields[counter]).value;
    }
    return cert;
}

async function fetchApi(url, options) {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return [response, result]
    }
    catch(error) {
       console.log(error)
    }
}

function printApiResponse([response, result]) {

    if (response.status == 200) {
        
        console.log(result.Success)
    }
    else {

        console.log(result.Error)
    }
}

function tools() {
     
    const heading = document.createElement('h2')
    heading.innerText = 'Licenses & certification'
    block.appendChild(heading)
    const addButton = document.createElement('button')
    addButton.id = 'add'
    addButton.innerText = 'Add'
    flag = false
    addButton.onclick = createForm
    block.appendChild(addButton)
    showCertificates()
    const LogOut = document.createElement('button')
    LogOut.innerText = 'Log Out'
    LogOut.addEventListener('click', function() {
        localStorage.clear();
        window.location.assign('login.html')
    })
    document.body.appendChild(LogOut)
}

async function showCertificates() {
    const result = await getCertificates()
    const block = document.getElementById('employeeCerts');
    for (let certCounter = 0; certCounter < result.length - 1; certCounter++) {
        const cert = document.createElement('div');
        cert.id = 'cert';
        const data = result[certCounter];
        for (let fieldCounter = 0; fieldCounter < fields.length - 1; fieldCounter++) {
            const labelSpan = document.createElement('span');
            labelSpan.style.fontWeight = 'bold'; 
            labelSpan.textContent = fields[fieldCounter] + ': ';
            const valueSpan = document.createElement('span');
            valueSpan.textContent = result[certCounter][fields[fieldCounter]];
            cert.appendChild(labelSpan);
            cert.appendChild(valueSpan);
            const br = document.createElement('br');
            cert.appendChild(br);
        }
        block.appendChild(cert);
        createButtons(cert, data)
    }
}

function createButtons(cert, data) {
    const buttonsDiv = document.createElement('div');
    const editButton = document.createElement('button');
    editButton.setAttribute('id', 'edit')
    editButton.innerText = "Edit";
    editButton.addEventListener('click', function(event) {
        populateTextBoxes(data); 
    });
    buttonsDiv.appendChild(editButton);
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', async function() {
        await deleteCertificate(data); 
    });
    buttonsDiv.appendChild(deleteButton);
    cert.appendChild(buttonsDiv);
}

async function createForm() {

    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    const form = document.createElement('form');
    form.id = "addForm";
    formContainer.classList.add('form-container');
    const labels = ['Name*', 'Issuing Organisation*', 'Issue Date', 'Expiry Date', 'Credential Id', 'Credential Url'];
    const types = ['text', 'text', 'date', 'date', 'text', 'url'];
    labels.forEach((labelText, index) => {
        const label = document.createElement('label');
        label.textContent = labelText;
        const input = document.createElement('input');
        input.setAttribute('type', types[index]);
        input.setAttribute('id', fields[index]);
        if (types[index] != 'url') {
            input.setAttribute('required', true);
        }
        form.appendChild(label);
        form.appendChild(document.createElement('br'));
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    });
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    const saveButton = document.createElement('button');
    saveButton.id = 'save';
    saveButton.innerText = 'Save';
    saveButton.addEventListener('click', async function() {
        if (flag == true) {
            await updateCertificate();
         }
         else {
            await addCertificate();
         }    
    });
    const closeButton = document.createElement('button');
    closeButton.id = 'close';
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', function() {
        closeForm(formContainer);  
    } )
    buttonContainer.appendChild(closeButton);
    buttonContainer.appendChild(saveButton);
    form.appendChild(buttonContainer);
    formContainer.appendChild(form);
    block.appendChild(formContainer);

}
function populateTextBoxes(data) {
    createForm()
    for (let field in data) {
        if (data.hasOwnProperty(field)) {
            const inputField = document.getElementById(field);
            if (inputField) {
                inputField.value = data[field];
            }
        }
    }
    CredentialId = data['CredentialId']
    flag = true
}

function closeForm(formContainer) {
    formContainer.remove(); 
}
tools()

