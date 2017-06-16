import Encoder from './ParamsEncoder.js';

test('converts strings to integers', () => {
  expect(Encoder.convertToInt("2000")).toBe(2000);
  expect(Encoder.convertToInt(2000)).toBe(2000);
});

test('converts an object into something the server can work with', () => {
  let input = {
    "name": "A picture",
    "description": "lorem ipsum",
    "year": "1999",
    "location": "-1.12345,2.12345"
  }
  let result = Encoder.encode(input)
  expect(result.year).toBe(1999)
  expect(result.location).toEqual(
    {"type": "Point", "coordinates": [-1.12345, 2.12345]}
  )
});