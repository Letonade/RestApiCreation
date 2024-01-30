const RestPayload = require('../../../src/core/entities/RestPayload');

test('creating a Rest data sample with valid data', () => {
  const restPayload = new RestPayload('testQuery', 'GET', 'testJob');

  expect(restPayload.id).toBe('testQuery');
  expect(restPayload.name).toBe('GET');
  expect(restPayload.job).toEqual('testJob');
});