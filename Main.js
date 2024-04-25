const express = require("express")
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express()
const port = 3000
const db = new sqlite3.Database('DbUdaya.db');
app.use(cors());
app.use(express.json());
app.get("/app/employee/ListCerts", async (req, res) =>
{
    const EmployeeId = req.headers['EmployeeId'];
    const data = await getAllCertificates();
    console.log(data);
})

app.post("/app/employee/AddCert", (req, res) =>
{
    res.send('');
})

app.put("/app/employee/UpdateCert", (req, res) =>
{
    res.send('');
})

app.delete("/app/employee/DeleteCert", (req, res) =>
{
    res.send('');
})

app.search("/app/employee/SearchCert", (req, res) =>
{
    res.send('');
})


app.listen(port, () => 
{
    console.log('Server is running on port ' +port);
});

async function getAllCertificates()
{
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM certificates", (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
}