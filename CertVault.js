let url = ""
let headers = {}
async function getCertifications()
{
   headers = {"EmployeeId" : "Emp123"}
   url = "http:/localhost:3000/app/employee/ListCerts"
   const response = await fetch(url, {headers: headers});
   console.log(response);
}
getCertifications()
