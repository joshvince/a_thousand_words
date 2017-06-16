import Encoder from './Encoder.js';

test('converts coordinates from menu to GeoJSON Point', () => {
  expect(Encoder.stringToGeoPoint("-1.12345,2.98765")).toEqual(
    {"type": "Point", "coordinates": [-1.12345, 2.98765]}
  )
});