const admin = require("../firebaseAdmin");

async function checkAuth(req, res, next) {
  const idToken = req.headers.authorization?.split(" ")[1]; // Bearer token
  if (!idToken) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
}

module.exports = checkAuth;
