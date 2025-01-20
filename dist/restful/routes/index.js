"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _auth = _interopRequireDefault(require("./auth"));
var _transactionRoutes = _interopRequireDefault(require("./transactionRoutes"));
var _budgetRouter = _interopRequireDefault(require("./budgetRouter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// import dotenv from "dotenv";

// dotenv.config();
var API_VERSION = process.env.API_VERSION || "v1";
var url = "/api/".concat(API_VERSION);
var router = (0, _express.Router)();
router.use("".concat(url, "/auth"), _auth["default"]);
router.use("".concat(url, "/transactions"), _transactionRoutes["default"]);
router.use("".concat(url, "/budjet"), _budgetRouter["default"]);
router.all("".concat(url, "/"), function (req, res) {
  return res.status(200).json({
    message: "Welcome to my wallet"
  });
});
router.use("*", function (req, res) {
  res.status(404).json({
    status: 404,
    message: "This endpoint does not exist"
  });
});
var _default = exports["default"] = router;