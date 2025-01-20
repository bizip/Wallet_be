"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
var _routes = _interopRequireDefault(require("./restful/routes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _require = require("firebase-admin/app"),
  initializeApp = _require.initializeApp,
  cert = _require.cert;
_dotenv["default"].config();
var serviceAccount = {
  type: "service_account",
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com"
};
var PORT = process.env.PORT || 4000;
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "".concat(process.env.PROJECT_ID, ".appspot.com")
});
app.use(_routes["default"]);
var start = function start() {
  try {
    app.listen({
      port: PORT
    }, function () {
      return process.stdout.write("http://localhost:".concat(PORT, " \n"));
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
start();