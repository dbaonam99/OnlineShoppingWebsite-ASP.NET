var _global = global,
    describe = _global.describe,
    it = _global.it;
import expect from 'expect';
import replaceTextWithMeta from '../replaceTextWithMeta';
import { Seq } from 'immutable';
describe('replaceTextWithMeta', function () {
  var none = 'NONE';
  var bold = 'BOLD';
  it('should handle empty source', function () {
    var result = replaceTextWithMeta({
      text: '',
      characterMeta: Seq.of()
    }, 'a', 'b');
    expect(result.text).toBe('');
    expect(result.characterMeta.toArray()).toEqual([]);
  });
  it('should handle not found', function () {
    var result = replaceTextWithMeta({
      text: 'abc',
      characterMeta: Seq.of(bold, bold, bold)
    }, 'd', 'e');
    expect(result.text).toBe('abc');
    expect(result.characterMeta.toArray()).toEqual([bold, bold, bold]);
  });
  it('should handle one occurance', function () {
    var result = replaceTextWithMeta({
      text: 'abc',
      characterMeta: Seq.of(none, bold, none)
    }, 'b', 'xx');
    expect(result.text).toBe('axxc');
    expect(result.characterMeta.toArray()).toEqual([none, bold, bold, none]);
  });
  it('should handle multiple occurances', function () {
    var result = replaceTextWithMeta({
      text: 'abcba',
      characterMeta: Seq.of(none, bold, none, none, none)
    }, 'b', 'xx');
    expect(result.text).toBe('axxcxxa');
    expect(result.characterMeta.toArray()).toEqual([none, bold, bold, none, none, none, none]);
  });
});