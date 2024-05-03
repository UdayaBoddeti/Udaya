import { connectDatabase } from './connection.js'
import crypto from "crypto"
import md5 from "md5"

const db = await connectDatabase()

export async function addCertificate(certificateData, EmployeeId) {
    const query = 'Insert into Certificates(CertificateName, IssuingOraganisation, IssueDate, ExpiryDate, CredentialId, CredentialUrl, EmployeeId) values (?,?,?,?,?,?,?)'
    try {
          const result = await db.run(query, [certificateData.CertificateName, certificateData.IssuingOraganisation, certificateData.IssueDate, certificateData.ExpiryDate, certificateData.CredentialId, certificateData.CredentialUrl, EmployeeId]) 
          return result
    }
    catch (error) {
        return error
    }
}

export async function getAllCertificates(employeeId, sort_by, sort_order) {
  try {
        const query = "SELECT CertificateName, IssuingOraganisation, IssueDate, ExpiryDate, CredentialId, CredentialUrl FROM Certificates where EmployeeId = ? order by " + sort_by + " " +sort_order
        const result = await db.all(query, employeeId)
        return result
  }
  catch (error) {
    return error
  }
}

export async function deleteCertificate(employeeId, credentialId) {
   
   const query = "Delete from certificates where EmployeeId = ? and CredentialId = ?"
   try {
       const result = await db.run(query, employeeId, credentialId)
       return result
   }   
   catch (error) {
     return error
   }
}

export async function updateCertificate(certificateData, EmployeeId, CredentialId) {
  const query = "update Certificates set CertificateName = ?, IssuingOraganisation = ?, IssueDate = ?, ExpiryDate = ?, CredentialId= ?, CredentialUrl = ? where EmployeeId = ? and CredentialId = ?"
  try {
    const result = await db.run(query, certificateData.CertificateName, certificateData.IssuingOraganisation, certificateData.IssueDate, certificateData.ExpiryDate, certificateData.CredentialId, certificateData.CredentialUrl, EmployeeId, CredentialId)
    return result
  }
  catch (error) {
        return result
  }
}

export async function validateUser(userName, password) {
    let passwordHash = md5("9u5" + password);
    let query = "select * from user where UserName=? and Password=?";
    try
    {
        let result = await db.get(query, [userName, passwordHash]);
        if (result)
        {
            let token = await generateToken();
            await updateUser(result.EmployeeId, token);
            return ({Token: token});
        }
        else
        {
            return ({Status: "User Invalid"});
        }
    }
    catch(error)
    {
        return error;
    }
}

export async function addUserData(userData) {
   
    const passwordHash = md5("9u5" + userData.password);
    const query = "insert into user (UserName, Password, EmailId, EmployeeId) values (?,?,?,?)"
    try {
        const result = await db.run(query, [userData.UserName, passwordHash, userData.EmailId, userData.EmployeeId])
        return result
    }
    catch (error) {
        return error
    }    
}

async function generateToken() {
    const token = crypto.randomBytes(14).toString('hex')
    return token;
}

async function updateUser(employeeId, token) {
    let query = "update user set Token=? where EmployeeId=?";
    try
    {
        let result = await db.run(query, [token, employeeId]);
        return result.changes;
    }
    catch(error)
    {
        return error;
    }
}

export async function getAffectedRow(credentialId, employeeId) {
   const query = "select CertificateName, IssuingOraganisation, IssueDate, ExpiryDate, CredentialId, CredentialUrl from  Certificates where EmployeeId = ? and CredentialId = ?"
   const result = await db.get(query, employeeId, credentialId)
   return result
}

export async function validateToken(token) {
   
    const query = "select Token, EmployeeId from user where Token=?"
    const result = await db.get(query, token)
    if (result) {
        return [true, result.EmployeeId]
    }
    else {
        return [false, null]
    }
}