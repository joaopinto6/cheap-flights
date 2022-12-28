import admin from 'firebase-admin'

const serviceAccount = {
    "type": "service_account",
    "project_id": "cheap-flights-info",
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.CLIENT_X509
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cheap-flights-info-default-rtdb.europe-west1.firebasedatabase.app"
})

const db = admin.database()

export const handler = async () => {
    
    const result = await db.ref('flights').once('value')
        .then(res=>res.val())

    return {
      statusCode: 200,
      body: JSON.stringify({
        result
      }),
    }
  }