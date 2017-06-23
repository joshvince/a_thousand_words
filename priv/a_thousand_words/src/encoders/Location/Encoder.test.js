import Encoder from './Encoder.js';

test('converts coordinates from menu to GeoJSON Point', () => {
  expect(Encoder.stringToGeoPoint("-1.12345,2.98765")).toEqual(
    {"type": "Point", "coordinates": [-1.12345, 2.98765]}
  )
});

test('converts arrays from a click event on the map to a GeoJSON point', () => {
  expect(Encoder.arrayToGeoPoint([1.23456,9.87654])).toEqual(
    {"type": "Point", "coordinates": [1.23456,9.87654]}
  )
});

test('converts both kinds of inputs to GeoJSON point', () => {
  expect(Encoder.inputToGeoPoint("-1.12345,2.98765")).toEqual(
    {"type": "Point", "coordinates": [-1.12345, 2.98765]}
  )
  expect(Encoder.inputToGeoPoint([1.23456,9.87654])).toEqual(
    {"type": "Point", "coordinates": [1.23456,9.87654]}
  )
});