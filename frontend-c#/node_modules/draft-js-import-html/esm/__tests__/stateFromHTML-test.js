function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _global = global,
    describe = _global.describe,
    it = _global.it;
import expect from 'expect';
import stateFromHTML from '../stateFromHTML';
import parseHTML from '../parseHTML';
import { convertToRaw } from 'draft-js';
describe('stateFromHTML', function () {
  var html = '<p>Hello World</p>';
  it('should create content state', function () {
    var contentState = stateFromHTML(html);
    var rawContentState = convertToRaw(contentState);
    var blocks = removeKeys(rawContentState.blocks);
    expect(blocks).toEqual([{
      text: 'Hello World',
      type: 'unstyled',
      data: {},
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: []
    }]);
  });
  it('should accept a custom parser', function () {
    var calledWith = [];

    var customParser = function customParser() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      calledWith.push(args);
      return parseHTML.apply(void 0, args);
    };

    var options = {
      parser: customParser
    };
    var contentState = stateFromHTML(html, options);
    expect(calledWith.length).toBe(1);
    expect(calledWith[0].length).toBe(1);
    expect(calledWith[0][0]).toBe(html);
    var rawContentState = convertToRaw(contentState);
    var blocks = removeKeys(rawContentState.blocks);
    expect(blocks).toEqual([{
      text: 'Hello World',
      type: 'unstyled',
      data: {},
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: []
    }]);
  });
});

function removeKeys(blocks) {
  return blocks.map(function (block) {
    var key = block.key,
        other = _objectWithoutProperties(block, ["key"]); // eslint-disable-line no-unused-vars


    return other;
  });
}