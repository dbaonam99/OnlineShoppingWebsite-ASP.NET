var _global = global,
    describe = _global.describe,
    it = _global.it;
import expect from 'expect';
import parseHTML from '../parseHTML';
describe('parseHTML', function () {
  describe('should parse basic elements', function () {
    var html = '<p>Hello World</p>';
    var element = parseHTML(html);
    it('should return a element of some kind', function () {
      expect(element.nodeType).toBe(1);
    });
    it('should have the correct child nodes', function () {
      expect(element.childNodes.length).toBe(1); // These null checks are to make Flow happy.

      expect(element.firstChild && element.firstChild.nodeName).toBe('P');
      expect(element.firstChild && element.firstChild.firstChild && element.firstChild.firstChild.nodeValue).toBe('Hello World');
    });
  });
  describe('should parse incomplete html', function () {
    var html = '<p><strong>Hello<div>World';
    var element = parseHTML(html);
    it('should return a element of some kind', function () {
      expect(element.nodeType).toBe(1);
    });
    it('should have the correct child nodes', function () {
      // These null checks are to make Flow happy.
      expect(element.childNodes && element.childNodes.length).toBe(2);
      expect(element.firstChild && element.firstChild.nodeName).toBe('P');
      expect(element.lastChild && element.lastChild.nodeName).toBe('DIV');
      expect(element.firstChild && element.firstChild.firstChild && element.firstChild.firstChild.nodeName).toBe('STRONG');
    });
  });
});