const functions = require("firebase-functions");
const admin = require('firebase-admin')
const {getAuth} = require('firebase-admin/auth')

var serviceAccount = require("/Users/kompakt/Downloads/inklink-de66a-firebase-adminsdk-gp26i-aa495786e4.json");

admin.initializeApp({credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://inklink-de66a-default-rtdb.europe-west1.firebasedatabase.app"})

getAuth().revokeRefreshTokens('VVxuQtUQ7vfHOIgAtVqC5Tls6op2').then(r => {
    console.log("token revoked")
})