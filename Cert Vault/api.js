import express from 'express'
import cors from 'cors'
import { getAllCertificates, addCertificate, updateCertificate, deleteCertificate } from './db.js';
const app = express()
const port = 3000
app.use(cors());
app.use(express.json());
app.get("/api/:employeeId/certs", async function(req, res) 
{
    const sortBy = req.query['sort_by']
    const sortOrder = req.query['sort_order']
    const [responseCode, responseData] = await getAllCertificates(req.params['employeeId'],sortBy, sortOrder);
    res.status(responseCode).send(responseData)
})

app.post("/api/:employeeId/certs", async function(req, res) 
{
    const certificateData = req.body
    const [responseCode, responseData] = await addCertificate(certificateData, req.params['employeeId']); 
    res.status(responseCode).send(responseData)
})

app.put("/api/:employeeId/certs/:credentialId", async function(req, res)
{
  const certificateData = req.body;
  const [responseCode, responseData] = await updateCertificate(certificateData, req.params['employeeId'], req.params['credentialId'])
  res.status(responseCode).send(responseData)
})

app.delete("/api/:employeeId/certs/:credentialId", async function(req, res)
{
   const employeeId = req.params['employeeId']
   const credentialId = req.params['credentialId']
   const [responseCode, responseData] = await deleteCertificate(employeeId, credentialId);
   res.status(responseCode).send(responseData)
})

app.listen(port, () => 
{
  console.log('Server is running on port' +port);
});
