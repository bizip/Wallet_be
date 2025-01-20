"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _budjectController = _interopRequireDefault(require("../controllers/budjectController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var budjetRouter = _express["default"].Router();
budjetRouter.post("/", _budjectController["default"].newBadet);
var _default = exports["default"] = budjetRouter;