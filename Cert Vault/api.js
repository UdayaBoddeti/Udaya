import express from 'express'
import cors from 'cors'
import { getAllCertificates, addCertificate, updateCertificate, deleteCertificate, validateUser, validateToken, getAffectedRow, addUserData} from './db.js';
const app = express()
const port = 3000
let responseCode, responseData
app.use(cors());
app.use(express.json());
app.post("/api/login", async function(req, res)
{
    let result = await validateUser(req.body.UserName, req.body.Password);
    res.send(result);
})
app.post("/api/signin", async function(req, res)
{
    const userData = req.body
    const result = await addUserData(userData)
    res.send(result)
    
})
app.use(async function(request, response, next)
{
    let token = request.headers.token;
    let result = await validateToken(token);
    if (result[0] == true)
    {
        request.employeeId = result[1];
        next();
    }
    else
    {   
        const unauthorizedError = new Error('UnauthorizedUser');
        unauthorizedError.status = 401; 
        next(unauthorizedError); 
    }
});
app.get("/api/certs", async function(req, res) 
{
    const result = await getAllCertificates(req.employeeId, req.query['sort_by'], req.query['sort_order']);
    if (result != '') {
        responseCode = 200
        responseData = result
    }
    else if (result.err) {
        responseCode = 500
        responseData = ({Error: {Code: responseCode, Message: error.message}})
    }
    else {
        responseCode = 404
        responseData = ({Error: {Code: responseCode, Message: "Given Certificate not found."}})
    } 
    res.status(responseCode).send(responseData)  
})

app.post("/api/certs", async function(req, res) 
{
    const certificateData = req.body
    const result = await addCertificate(certificateData, req.employeeId); 
    if (result.changes == 1) {
        responseCode = 200
        responseData = ({Success: {AddedCert: await getAffectedRow(certificateData.credential_id, certificateData.employee_id), Message: "Certificate added successfully"}})
    }
    else {
        responseCode = 500
        responseData = ({Error: {Code: responseCode, Message: result.error}})
    }
    res.status(responseCode).send(responseData)
})

app.put("/api/certs/:credentialId", async function(req, res)
{
    const EmployeeId = req.employeeId
    const CredentialId = req.params['credentialId']
    const result = await updateCertificate(req.body, EmployeeId, CredentialId)
    if (result.changes == 1) {
        responseCode = 200
        responseData = ({Success: {updatedCertificate: await getAffectedRow(CredentialId, EmployeeId), Message: "Certificate updated successfully"}})
    }
    else if (result.err) {
        responseCode = 500
        responseData = ({Error: {Code: responseCode, Message: error.message}})
    }
    else {
        responseCode = 404
        responseData = ({Error: {Code: responseCode, Message: "Given Certificate not found."}})
    } 
    res.status(responseCode).send(responseData)
})

app.delete("/api/certs/:credentialId", async function(req, res)
{
   const EmployeeId = req.employeeId
   const CredentialId = req.params['credentialId'] 
   const result = await deleteCertificate(EmployeeId, CredentialId);
   if (result.changes == 1) {
        responseCode = 200
        responseData = ({Success: {CredentialId: CredentialId, Status: "Certificate deleted successfully."}})
    }
    else if (result.err) {
        responseCode = 500
        responseData = ({Error: {Code: responseCode, Message: error.message}})
    }
    else {
        responseCode = 404
        responseData = ({Error: {Code: responseCode, Message: "Given Certificate not found."}})
    }
   res.status(responseCode).send(responseData)
})


app.listen(port, () => 
{
  console.log('Server is running on port' +port);
});
