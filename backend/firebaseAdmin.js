// firebaseAdmin.js
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

let bucket = null;

try {
  let serviceAccount = null;

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    const keyPath = path.join(__dirname, "veloura-firebase-adminsdk.json");
    if (fs.existsSync(keyPath)) {
      serviceAccount = require(keyPath);
    }
  }

  if (serviceAccount) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "veloura-ab34a.firebasestorage.app",
      });
    }
    bucket = admin.storage().bucket();
  } else {
    console.warn("Firebase service account not configured; storage deletion disabled.");
  }
} catch (err) {
  console.error("Firebase Admin initialization error (continuing without bucket):", err.message);
}

module.exports = bucket;
