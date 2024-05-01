import express from 'express'
import cors from 'cors'
import { getAllCertificates, addCertificate, updateCertificate, deleteCertificate, validateUser, validateToken} from './db.js';
const app = express()
const port = 3000
app.use(cors());
app.use(express.json());
app.use(async function(req, res, next)
{
    let token = req.headers.token;
    let result = await validateToken(token);
    if (result[0] == true)
    {
        req.employeeId = result[1];
    }
    next();
});
app.get("/api/certs", async function(req, res) 
{
    const sortBy = req.query['sort_by']
    const sortOrder = req.query['sort_order']
    const [responseCode, responseData] = await getAllCertificates(req.employeeId, sortBy, sortOrder);
    res.status(responseCode).send(responseData)
})

app.post("/api/certs", async function(req, res) 
{
    const certificateData = req.body
    const [responseCode, responseData] = await addCertificate(certificateData, req.employeeId); 
    res.status(responseCode).send(responseData)
})

app.put("/api/certs/:credentialId", async function(req, res)
{
  const certificateData = req.body;
  const [responseCode, responseData] = await updateCertificate(certificateData, req.employeeId, req.params['credentialId'])
  res.status(responseCode).send(responseData)
})

app.delete("/api/certs/:credentialId", async function(req, res)
{
   const credentialId = req.params['credentialId']
   const [responseCode, responseData] = await deleteCertificate(req.employeeId, credentialId);
   res.status(responseCode).send(responseData)
})

app.post("/api/login", async function(req, res)
{
    let result = await validateUser(req.body.UserName, req.body.Password);
    res.send(result);
})

app.listen(port, () => 
{
  console.log('Server is running on port' +port);
});
