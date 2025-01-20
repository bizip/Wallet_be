"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _transactionsController = _interopRequireDefault(require("../controllers/transactionsController"));
var _protect = require("../../helper/Response/protect");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var transactionRouter = _express["default"].Router();
transactionRouter.post("/", _protect.protect, _transactionsController["default"].newTransactions);
transactionRouter.get("/", _protect.protect, _transactionsController["default"].getAllTransaction);
var _default = exports["default"] = transactionRouter;