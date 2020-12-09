var _global = global,
    describe = _global.describe,
    it = _global.it;
import expect from 'expect';
import { TextNode, NODE_TYPE_TEXT, ElementNode, NODE_TYPE_ELEMENT } from '../SyntheticDOM';
describe('Text Nodes', function () {
  var textNode = new TextNode('Hello World');
  it('should get created properly', function () {
    expect(textNode.nodeType).toBe(NODE_TYPE_TEXT);
    expect(textNode.nodeName).toBe('#text');
    expect(textNode.nodeValue).toBe('Hello World');
  });
});
describe('Elements', function () {
  it('should accept empty attributes and empty children', function () {
    var element = new ElementNode('div', [], []);
    expect(element.nodeType).toBe(NODE_TYPE_ELEMENT);
    expect(element.nodeName).toBe('DIV');
    expect(element.tagName).toBe('DIV');
    expect(element.attributes).toBeAn(Array);
    expect(element.attributes.length).toBe(0);
    expect(element.childNodes).toEqual([]);
  });
  it('should accept null attributes and some children', function () {
    var textNode = new TextNode('Hello World');
    var element = new ElementNode('div', null, [textNode]);
    expect(element.attributes).toBeAn(Array);
    expect(element.attributes.length).toBe(0);
    expect(element.toString()).toBe('<div>Hello World</div>');
  });
  it('should accept null attributes and null children', function () {
    var element = new ElementNode('div');
    expect(element.attributes).toBeAn(Array);
    expect(element.attributes.length).toBe(0);
    expect(element.toString()).toBe('<div></div>');
  });
  it('should ignore children for self-closing (void) tags', function () {
    var p = new ElementNode('p');
    var element = new ElementNode('hr', null, [p]);
    expect(element.childNodes && element.childNodes.length).toBe(0);
    expect(element.toString()).toBe('<hr>');
  });
  it('should support className getter', function () {
    var p = new ElementNode('p');
    expect(p.className).toBe('');
    p = new ElementNode('p', [{
      name: 'class',
      value: 'abc'
    }]);
    expect(p.className).toBe('abc');
  });
  it('should stringify correctly', function () {
    var br = new ElementNode('br');
    var p = new ElementNode('p', null, [br, br]);
    var attrs = [{
      name: 'class',
      value: 'abc'
    }, {
      name: 'className',
      value: 'def'
    }];
    var element = new ElementNode('div', attrs, [p]);
    expect(element.childNodes && element.childNodes.length).toBe(1);
    var firstChild = element.childNodes ? element.childNodes[0] : null; // Weird branching to make Flow happy.

    if (firstChild instanceof ElementNode) {
      expect(firstChild.childNodes && firstChild.childNodes.length).toBe(2);
    } else {
      expect(firstChild).toBeAn(ElementNode);
    }

    expect(element.toString()).toBe('<div class="abc" className="def"><p><br><br></p></div>');
    expect(element.toString(true)).toBe('<div class="abc" className="def"><p><br/><br/></p></div>');
  });
});