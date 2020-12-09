"use strict";

var _expect = _interopRequireDefault(require("expect"));

var _replaceTextWithMeta = _interopRequireDefault(require("../replaceTextWithMeta"));

var _immutable = require("immutable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _global = global,
    describe = _global.describe,
    it = _global.it;
describe('replaceTextWithMeta', function () {
  var none = 'NONE';
  var bold = 'BOLD';
  it('should handle empty source', function () {
    var result = (0, _replaceTextWithMeta["default"])({
      text: '',
      characterMeta: _immutable.Seq.of()
    }, 'a', 'b');
    (0, _expect["default"])(result.text).toBe('');
    (0, _expect["default"])(result.characterMeta.toArray()).toEqual([]);
  });
  it('should handle not found', function () {
    var result = (0, _replaceTextWithMeta["default"])({
      text: 'abc',
      characterMeta: _immutable.Seq.of(bold, bold, bold)
    }, 'd', 'e');
    (0, _expect["default"])(result.text).toBe('abc');
    (0, _expect["default"])(result.characterMeta.toArray()).toEqual([bold, bold, bold]);
  });
  it('should handle one occurance', function () {
    var result = (0, _replaceTextWithMeta["default"])({
      text: 'abc',
      characterMeta: _immutable.Seq.of(none, bold, none)
    }, 'b', 'xx');
    (0, _expect["default"])(result.text).toBe('axxc');
    (0, _expect["default"])(result.characterMeta.toArray()).toEqual([none, bold, bold, none]);
  });
  it('should handle multiple occurances', function () {
    var result = (0, _replaceTextWithMeta["default"])({
      text: 'abcba',
      characterMeta: _immutable.Seq.of(none, bold, none, none, none)
    }, 'b', 'xx');
    (0, _expect["default"])(result.text).toBe('axxcxxa');
    (0, _expect["default"])(result.characterMeta.toArray()).toEqual([none, bold, bold, none, none, none, none]);
  });
});