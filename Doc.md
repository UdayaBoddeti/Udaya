## List Certs

```code
    Method : GET 
    Endpoint : /api/employee/ListCerts 
    Query params : ?sort=desc
    Payload :
       Request Payload:
            EmployeeId : "EmployeeId"
    Response Json : {"CertificateName": "CertificateName", "IssuingOrganisation": "OraganisationName", "IssueDate": "DD-MM-YYYY", "ExpiryDate": "DD-MM-YYYY", "CredentialId": "CredentialId", "CredentialUrl": "CredentialUrl"}
    Response Code : 200(Ok), 404(Employee not found)
```
## Add Cert
 
 ```code
    Method : POST 
    Endpoint : /api/employee/AddCert 
    Query params : None
    Payload : 
       Request Payload:
            EmployeeId : "EmployeeId"
            CertificateName : "CertificateName"
            IssuingOrganisation : "OraganisationName"
            IssueDate : "DD-MM-YYYY"
            ExpiryDate : "DD-MM-YYYY"
            CredentialId : "CredentialId"
            CredentialUrl : "CredentialUrl"
    Response Json : {Message : "Message"}
    Response Code : 200(Ok), 404(Employee not found)
```    

## Update Cert

```code 
    Method : PUT
    Endpoint : /api/employee/UpdateCert 
    Query params : /updateField = FieldName
    Payload : 
       Request Payload:
            EmployeeId : "EmployeeId"
            CredentialId : "CredentialId"
            FieldName : "FieldValue"
    Response Json : {Message : "Message"}
    Response Code : 200(Ok), 404(Employee not found)
```
## Delete Cert

```code
    Method : DELETE
    Endpoint : /api/employee/DeleteCert 
    Payload : None
       Request Payload:
            EmployeeId : "EmployeeId"
            CredentialId : "CredentialId"
    Response Json : {Message : "Message"}
    Response Code : 200(Ok), 404(Employee not found)
```
## Search Cert

```code
    Method : GET
    Endpoint : /api/employee/SearchCert 
    Payload : None
       Request Payload:
            EmployeeId : "EmployeeId"
            CredentialId : "CredentialId"
    Response Json : {"CertificateName": "CertificateName", "IssuingOrganisation": "OraganisationName", "IssueDate": "DD-MM-YYYY", "ExpiryDate": "DD-MM-YYYY", "CredentialId": "CredentialId", "CredentialUrl": "CredentialUrl"}
    Response Code : 200(Ok), 404(Employee not found)
```       