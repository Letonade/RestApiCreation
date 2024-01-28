const RestRepository = require('../../core/ports/RestRepository');

//Choose your database type (I chose Mongo)
class PostgreSQLRestRepository extends RestRepository {
  getDataSample(userId) {
    // PostgreSQL specific logic
  }
}

module.exports = PostgreSQLRestRepository;