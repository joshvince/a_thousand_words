import Decoder from './ParamsDecoder.js';

test('converts the location object to a string', () => {
  let input = {
    "name": "A picture",
    "description": "lorem ipsum",
    "year": "1999",
    "location": {
      "coordinates": [-1.12345,2.12345],
      "srid": null
    }
  }
  let result = Decoder.decode(input)
  expect(result.location).toBe("-1.12345,2.12345")
});
