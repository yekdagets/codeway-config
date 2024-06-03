import admin from "firebase-admin";
import serviceAccount from "./config/serviceAccountKey.json" assert { type: "json" };

export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://config-management-frontend.firebaseio.com",
});
