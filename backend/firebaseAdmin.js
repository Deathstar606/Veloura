// firebaseAdmin.js
const admin = require("firebase-admin");
const path = require("path");

// Replace this with the path to your downloaded service account key JSON
const serviceAccount = require(path.join(__dirname, "veloura-firebase-adminsdk.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "veloura-ab34a.firebasestorage.app"
});

const bucket = admin.storage().bucket();

module.exports = bucket;