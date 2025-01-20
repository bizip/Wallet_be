"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authControllers = _interopRequireDefault(require("../controllers/authControllers"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authRouter = _express["default"].Router();
authRouter.post("/signup", _authControllers["default"].signUp);
var _default = exports["default"] = authRouter;