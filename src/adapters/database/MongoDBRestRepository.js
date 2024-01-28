const RestRepository = require('../../core/ports/RestRepository');

class MongoDBRestRepository extends RestRepository {
  getDataSample() {
    // MongoDB specific logic, for this kata it will return an error
    throw new Error('Is a kata method');
  }
}

module.exports = MongoDBRestRepository;