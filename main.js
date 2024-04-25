const express = require("express")
const app = express()
const port = 5000

app.get("/api/employee/listCerts", (req, res) =>
{
    res.send('Hi');
})

app.post("/api/employee/addCert", (req, res) =>
{
    res.send('');
})

app.put("/api/employee/updateCert", (req, res) =>
{
    res.send('');
})

app.delete("/api/employee/deleteCert", (req, res) =>
{
    res.send('');
})

app.get("/api/employee/searchCert", (req, res) =>
{
    res.send('');
})

app.listen(PORT, () => 
{
    console.log(Server is running on port ${PORT});
});