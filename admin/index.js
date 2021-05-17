const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();
const serviceAccount = require("./service-account.json");
const authDomain = process.env.AUTH_DOMAIN;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${authDomain}`
});

const auth = admin.auth();
const database = admin.database();

// admin commands begin here
// auth.createUser({
//   displayName: "Phillmont",
//   email: "phillmont@simplist.sg",
//   emailVerified: true,
//   password: "adminadmin"
// }).then(console.log).catch(console.error);