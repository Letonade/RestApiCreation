const RestRequest = require('../../../src/core/entities/RestRequest');

test('creating a Rest data sample with valid data', () => {
  const restPayload = new RestRequest('testQuery', 'GET', [{id: 1, name: 'Ada', job: 'Programmer'}]);

  expect(restPayload.query).toBe('testQuery');
  expect(restPayload.method).toBe('GET');
  expect(restPayload.payload).toEqual([{id: 1, name: 'Ada', job: 'Programmer'}]);
});