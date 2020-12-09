"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SyntheticDOM = require("./SyntheticDOM");

Object.keys(_SyntheticDOM).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SyntheticDOM[key];
    }
  });
});