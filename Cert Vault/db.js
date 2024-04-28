import { connectDatabase } from './connection.js'

const db = await connectDatabase()

export async function addCertificate(certificateData, EmployeeId)
{
    let responseCode, responseData;
    const query = 'Insert into Certificates(CertificateName, IssuingOraganisation, IssueDate, ExpiryDate, CredentialId, CredentialUrl, EmployeeId) values (?,?,?,?,?,?,?)'
    try {
          const result = await db.run(query, [certificateData.certificate_name, certificateData.issuing_oraganisation, certificateData.issue_date, certificateData.expiry_date, certificateData.credential_id, certificateData.credential_url, EmployeeId]) 
          if (result.changes == 1) {
            responseCode = 200
            responseData = ({Success: {AddedCert: await getAffectedRow(certificateData.credential_id, certificateData.employee_id), Message: "Certificate added successfully"}})
          }  
    }
    catch (error) {
        responseCode = 500
        responseData = ({Error: {Code: responseCode, Message: error.message}})
    }
    return [responseCode, responseData]
}

export async function getAllCertificates(employeeId, sort_by, sort_order)
{
  let responseCode, responseData  
  try {
        const query = "SELECT CertificateName, IssuingOraganisation, IssueDate, ExpiryDate, CredentialId, CredentialUrl FROM Certificates where EmployeeId = ? order by " + sort_by + " " +sort_order
        const result = await db.all(query, employeeId)
        if (result != '') {
            responseCode = 200
            responseData = result
        }
        else {
            responseCode = 204
            responseData = ({Error: {Code: responseCode, Message: "Given Certificate not found."}})
        } 
  }
  catch (error) {
    responseCode = 500
    responseData = ({Error: {Code: responseCode, Message: error.message}})
  }
  return [responseCode, responseData]
}

export async function deleteCertificate(employeeId, credentialId) {
   
   let responseCode, responseData 
   const query = "Delete from certificates where EmployeeId = ? and CredentialId = ?"
   try {
       const result = await db.run(query, employeeId, credentialId)
       if (result.changes == 1) {
        responseCode = 200
        responseData = ({Success: {CredentialId: credentialId, Status: "Certificate deleted successfully."}})
      }
      else {
        responseCode = 404
        responseData = ({Error: {Code: responseCode, Message: "Given Certificate not found."}})
      }
   }   
   catch (error) {
    responseCode = 500
    responseData = ({Error: {Code: responseCode, Message: error.message}})
   }
   return [responseCode, responseData]   
}

export async function updateCertificate(certificateData, EmployeeId, CredentialId)
{
  let responseCode, responseData
  const query = "update Certificates set CertificateName = ?, IssuingOraganisation = ?, IssueDate = ?, ExpiryDate = ?, CredentialId= ?, CredentialUrl = ? where EmployeeId = ? and CredentialId = ?"
  try {
    const result = await db.run(query, certificateData.certificate_name, certificateData.issuing_oraganisation, certificateData.issue_date, certificateData.expiry_date, certificateData.credential_id, certificateData.credential_url, EmployeeId, CredentialId)
    if (result.changes == 1) {
        responseCode = 200
        responseData = ({Success: {updatedCertificate: await getAffectedRow(CredentialId, EmployeeId), Message: "Certificate updated successfully"}})
    }
    else {
        responseCode = 404
        responseData = ({Error: {Code: responseCode, Message: "Given Certificate not found."}})
    } 
    }
    catch (error) {
        responseCode = 500
        responseData = ({Error: {Code: responseCode, Message: error.message}})
    }
    return [responseCode, responseData]
}

async function getAffectedRow(credentialId, employeeId)
{
   const query = "select CertificateName, IssuingOraganisation, IssueDate, ExpiryDate, CredentialId, CredentialUrl from  Certificates where EmployeeId = ? and CredentialId = ?"
   const result = await db.get(query, employeeId, credentialId)
   return result
}