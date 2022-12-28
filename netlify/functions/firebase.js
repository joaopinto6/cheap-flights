import admin from 'firebase-admin'

var flag = 1

const serviceAccount = {
    "type": "service_account",
    "project_id": "cheap-flights-info",
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/gm, ""),
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.CLIENT_X509
}

var db = undefined
var result = {}

export const handler = async () => {
    
    console.log("Flag: " + flag)

    if (flag) {
      
      console.log("App iniciando")

      admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://cheap-flights-info-default-rtdb.europe-west1.firebasedatabase.app"
      })

      console.log("App iniciada")
      
      db = admin.database()

      console.log("database iniciada")
    }

    flag = 0

    console.log("Buscando dados")
    const ref_res = await db.ref('flights')
    
    console.log("REF > ONCE")

    await ref_res.on('value', (snap)=>{
      result = snap.val()
    })

    console.log("Dados buscados")
    console.log("RESULTS: " + JSON.stringify(result[0]))

    return {
      statusCode: 200,
      body: JSON.stringify({
        result
      }),
    }
    }

