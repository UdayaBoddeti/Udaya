## List Certs

```code
    Method : GET 
    Endpoint : /api/:employeeId/certs 
    Query params : ?sort=(asc/desc)&sortBy=(CertificateName/IssueDate/ExpiryDate)
    Payload : None
    Response Json : 
        Success:
        {
          [{
             "certificateName": "CertificateName"
             "issuingOrganisation": "OraganisationName"
             "issueDate": "DD-MM-YYYY"
             "expiryDate": "DD-MM-YYYY"
             "credentialId": "CredentialId"
             "credentialUrl": "CredentialUrl"}
          {...}, ]
        }  
        Failure:
        {
            "error":
            {
                "code": "errorCode",
                "message": "errorMessage",
                "description": "errorDescription"
            }
        }
    
    Response Code : 200(Ok), 404(Employee not found)
```
## Add Cert
 
 ```code
    Method : POST 
    Endpoint : /api/:employeeId/certs 
    Query params : None
    Payload : 
       Request Payload:
          { 
            "certificateName" : "CertificateName"
            "issuingOrganisation" : "OraganisationName"
            "issueDate" : "DD-MM-YYYY"
            "expiryDate" : "DD-MM-YYYY"
            "credentialId" : "CredentialId"
            "credentialUrl" : "CredentialUrl"
          }    
    Response Json :
        Success:
        {
            "certificateName" : "CertificateName"
            "issuingOrganisation" : "OraganisationName"
            "issueDate" : "DD-MM-YYYY"
            "expiryDate" : "DD-MM-YYYY"
            "credentialId" : "CredentialId"
            "credentialUrl" : "CredentialUrl"
        }
       Failure:
        {
            "error":
            {
                "code": "errorCode",
                "message": "errorMessage",
                "description": "errorDescription"
            }
        }
    Response Code : 200(Ok), 404(Employee not found)
```    

## Update Cert

```code 
    Method : PUT
    Endpoint : /api/:employeeId/certs/:credentialId
    Query params : ?updateField = FieldName
    Payload : 
       Request Payload:
            {
               FieldName : "FieldValue"
            }   
    Response Json : {Message : "Message"}
    Response Code : 200(Ok), 404(Employee not found)
```
## Delete Cert

```code
    Method : DELETE
    Endpoint : /api/:employeeId/certs/:credentialId 
    Payload : None
    Response Json :
        Success:
        {
            "credentialId": "credentialId",
            "message": "message"
        }
        Failure:
        {
            "error":
            {
                "code": "errorCode",
                "message": "errorMessage",
                "description": "description"
            }
        }    
    Response Code : 200(Ok), 404(Employee not found)
```
## Search Cert

```code
    Method : GET
    Endpoint : /api/:employeeId/searchCert/:credentialId
    Payload : None
    Response Json : 
        Success:
        {
            "certificateName" : "CertificateName"
            "issuingOrganisation" : "OraganisationName"
            "issueDate" : "DD-MM-YYYY"
            "expiryDate" : "DD-MM-YYYY"
            "credentialId" : "CredentialId"
            "credentialUrl" : "CredentialUrl"
        }
        Failure:
        {
            "error":
            {
                "code": "errorCode",
                "message": "errorMessage",
                "description": "errorDescription"
            }
        }
    Response Code : 200(Ok), 404(Employee not found)
```       