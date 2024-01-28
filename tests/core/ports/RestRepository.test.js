const RestRepository = require('../../../src/core/ports/RestRepository');

test('should throw error for getById method', () => {
  const restRepository = new RestRepository();
  expect(() => restRepository.getDataSample()).toThrowError('Method not implemented');
});