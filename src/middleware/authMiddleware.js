import admin from "firebase-admin";

export async function checkIdToken(req, res, next) {
  const idToken = req.headers.authorization?.split(" ")[1];
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

export async function checkApiKey(req, res, next) {
  const baseApiKey = process.env.API_KEY;
  const apiKey = req.headers.authorization?.split(" ")[1];
  if (!apiKey) {
    return res.status(401).send("Unauthorized");
  }
  if (!baseApiKey) {
    console.error("Base api key not found");
    return res.status(500).send("");
  }

  if (apiKey !== baseApiKey) {
    return res.status(403).send("Invalid api key");
  }

  next();
}
