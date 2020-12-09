"use strict";

var _expect = _interopRequireDefault(require("expect"));

var _SyntheticDOM = require("../SyntheticDOM");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _global = global,
    describe = _global.describe,
    it = _global.it;
describe('Text Nodes', function () {
  var textNode = new _SyntheticDOM.TextNode('Hello World');
  it('should get created properly', function () {
    (0, _expect["default"])(textNode.nodeType).toBe(_SyntheticDOM.NODE_TYPE_TEXT);
    (0, _expect["default"])(textNode.nodeName).toBe('#text');
    (0, _expect["default"])(textNode.nodeValue).toBe('Hello World');
  });
});
describe('Elements', function () {
  it('should accept empty attributes and empty children', function () {
    var element = new _SyntheticDOM.ElementNode('div', [], []);
    (0, _expect["default"])(element.nodeType).toBe(_SyntheticDOM.NODE_TYPE_ELEMENT);
    (0, _expect["default"])(element.nodeName).toBe('DIV');
    (0, _expect["default"])(element.tagName).toBe('DIV');
    (0, _expect["default"])(element.attributes).toBeAn(Array);
    (0, _expect["default"])(element.attributes.length).toBe(0);
    (0, _expect["default"])(element.childNodes).toEqual([]);
  });
  it('should accept null attributes and some children', function () {
    var textNode = new _SyntheticDOM.TextNode('Hello World');
    var element = new _SyntheticDOM.ElementNode('div', null, [textNode]);
    (0, _expect["default"])(element.attributes).toBeAn(Array);
    (0, _expect["default"])(element.attributes.length).toBe(0);
    (0, _expect["default"])(element.toString()).toBe('<div>Hello World</div>');
  });
  it('should accept null attributes and null children', function () {
    var element = new _SyntheticDOM.ElementNode('div');
    (0, _expect["default"])(element.attributes).toBeAn(Array);
    (0, _expect["default"])(element.attributes.length).toBe(0);
    (0, _expect["default"])(element.toString()).toBe('<div></div>');
  });
  it('should ignore children for self-closing (void) tags', function () {
    var p = new _SyntheticDOM.ElementNode('p');
    var element = new _SyntheticDOM.ElementNode('hr', null, [p]);
    (0, _expect["default"])(element.childNodes && element.childNodes.length).toBe(0);
    (0, _expect["default"])(element.toString()).toBe('<hr>');
  });
  it('should support className getter', function () {
    var p = new _SyntheticDOM.ElementNode('p');
    (0, _expect["default"])(p.className).toBe('');
    p = new _SyntheticDOM.ElementNode('p', [{
      name: 'class',
      value: 'abc'
    }]);
    (0, _expect["default"])(p.className).toBe('abc');
  });
  it('should stringify correctly', function () {
    var br = new _SyntheticDOM.ElementNode('br');
    var p = new _SyntheticDOM.ElementNode('p', null, [br, br]);
    var attrs = [{
      name: 'class',
      value: 'abc'
    }, {
      name: 'className',
      value: 'def'
    }];
    var element = new _SyntheticDOM.ElementNode('div', attrs, [p]);
    (0, _expect["default"])(element.childNodes && element.childNodes.length).toBe(1);
    var firstChild = element.childNodes ? element.childNodes[0] : null; // Weird branching to make Flow happy.

    if (firstChild instanceof _SyntheticDOM.ElementNode) {
      (0, _expect["default"])(firstChild.childNodes && firstChild.childNodes.length).toBe(2);
    } else {
      (0, _expect["default"])(firstChild).toBeAn(_SyntheticDOM.ElementNode);
    }

    (0, _expect["default"])(element.toString()).toBe('<div class="abc" className="def"><p><br><br></p></div>');
    (0, _expect["default"])(element.toString(true)).toBe('<div class="abc" className="def"><p><br/><br/></p></div>');
  });
});