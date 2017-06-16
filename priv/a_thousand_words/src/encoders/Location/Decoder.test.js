import Decoder from './Decoder.js';

test('converts objects to a string', () => {
  let testInput = {
    "coordinates": [1.2345, -9.8765],
    "srid": null
  }
  expect(Decoder.decode(testInput)).toBe("1.2345,-9.8765")
});