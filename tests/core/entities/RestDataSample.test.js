const RestDataSample = require('../../../src/core/entities/RestDataSample');

test('creating a Rest data sample with valid data', () => {
  const restDataSample = new RestDataSample('testQuery', 'GET', { id: 1, name: 'Ada', job: 'Programmer' });

  expect(restDataSample.query).toBe('testQuery');
  expect(restDataSample.method).toBe('GET');
  expect(restDataSample.payload).toEqual({ id: 1, name: 'Ada', job: 'Programmer' });
});