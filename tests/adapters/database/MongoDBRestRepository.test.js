const MongoDBRestRepository = require('../../../src/adapters/database/MongoDBRestRepository')

test('should retrieve user from MongoDB by ID', () => {
  const mongoDBRepository = new MongoDBRestRepository()
  // Implement test logic for retrieving from MongoDB by ID and assertions
  expect(() => mongoDBRepository.getDataSample()).toThrowError('Is a kata method');
});