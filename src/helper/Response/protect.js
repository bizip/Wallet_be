const admin = require("firebase-admin");
const { default: Response } = require("./Response");

const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    const data = { message: "Token not found" };
    Response.success(res, 401, data);
  }

  let token;

  try {
    token = req.headers.authorization.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
      const data = { message: "Not Authenticated!" };
      return Response.success(res, 401, data);
    }
    const user = await admin.auth().getUser(decodedToken.uid);
    req.user = decodedToken;
    next();
  } catch (error) {
    const data = { message: "Not Authorized!" };
    return Response.success(res, 401, data);
    
  }
};
exports.protect = protect;
