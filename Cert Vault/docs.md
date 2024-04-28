## List Certs

```code
    Method : GET 
    Endpoint : /api/:employeeId/certs 
    Query params : ?sort_by=(CertificateName/IssueDate/ExpiryDate)&sort_order=(DESC/ASC)
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
            }
        }
    
    Response Code : 200(Ok), 404(Employee not found), 500(Internal server error)
```
## Add Cert
 
 ```code
    Method : POST 
    Endpoint : /api/:employeeId/certs 
    Query params : None
    Payload : 
       Request Payload:
          { 
            "certificate_name" : "CertificateName"
            "issuing_organisation" : "OraganisationName"
            "issue_date" : "DD-MM-YYYY"
            "expiry_date" : "DD-MM-YYYY"
            "credential_id" : "CredentialId"
            "credential_url" : "CredentialUrl"
          }    
    Response Json :
        Success:
        {
            "AddedCert":
            {
                "certificateName" : "CertificateName"
                "issuingOrganisation" : "OraganisationName"
                "issueDate" : "DD-MM-YYYY"
                "expiryDate" : "DD-MM-YYYY"
                "credentialId" : "CredentialId"
                "credentialUrl" : "CredentialUrl"
            }
            "Message": "Message"
        }
       Failure:
        {
            "error":
            {
                "code": "errorCode",
                "message": "errorMessage",
            }
        }
    Response Code : 200(Ok), 404(Employee not found), 500(Internal server error)
```    

## Update Cert

```code 
    Method : PUT
    Endpoint : /api/:employeeId/certs/:credentialId
    Query params : None
    Payload : 
        Request Payload:
            {
                "certificate_name" : "CertificateName"
                "issuing_organisation" : "OraganisationName"
                "issue_date" : "DD-MM-YYYY"
                "expiry_date" : "DD-MM-YYYY"
                "credential_id" : "CredentialId"
                "credential_url" : "CredentialUrl"
            }
    Response Json : 
        Success:
        {
            "UpdatedCert":
            {
                "certificateName" : "CertificateName"
                "issuingOrganisation" : "OraganisationName"
                "issueDate" : "DD-MM-YYYY"
                "expiryDate" : "DD-MM-YYYY"
                "credentialId" : "CredentialId"
                "credentialUrl" : "CredentialUrl"
            }
            "Message": "Message"    
        } 
        Failure:
        {
            "error":
            {
                "code": "errorCode",
                "message": "errorMessage",
            }
        }  
    Response Code : 200(Ok), 404(Employee not found), 500(Internal server error)
```
## Delete Cert

```code
    Method : DELETE
    Endpoint : /api/:employeeId/certs/:credentialId 
    Query params : None
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
            }
        }    
    Response Code : 200(Ok), 404(Employee not found), 500(Internal server error)
```
## Search Cert

```code
    Method : GET
    Endpoint : /api/:employeeId/searchCert/:credentialId
    Query params : None
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
    Response Code : 200(Ok), 404(Employee not found), 500(Internal server error)
```       